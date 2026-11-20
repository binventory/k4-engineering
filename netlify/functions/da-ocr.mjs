// Optional server OCR for business cards (admin: "Card scanner" = Mistral OCR, EU). The photo is passed through, not stored.
import { bump, clientIp, getFair, getSetting, ipHash, json, settings, slugOk } from "../lib/da.mjs";

export default async (req, ctx) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let b; try { b = await req.json(); } catch { return json({ error: "bad_request" }, 400); }
  const slug = String(b?.fair || "");
  if (!slugOk(slug)) return json({ error: "unknown_fair" }, 404);
  const img = String(b?.image || "");
  if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(img) || img.length > 3000000) return json({ error: "bad_image" }, 400);
  try {
    const s = await settings();
    if (s.ocr !== "mistral") return json({ error: "off" }, 404);
    if (!(await getFair(slug))) return json({ error: "unknown_fair" }, 404);
    const hour = new Date().toISOString().slice(0, 13);
    if ((await bump(`ocr:${ipHash(clientIp(req, ctx))}:${hour}`, 3600)) > 30) return json({ error: "rate" }, 429);
    const key = (await getSetting("secrets")).keys?.mistral;
    if (!key) return json({ error: "no_key" }, 503);
    const base = String(s.providers?.mistral?.base || "https://api.mistral.ai/v1").replace(/\/$/, "");
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 9000);
    let r;
    try {
      r = await fetch(base + "/ocr", {
        method: "POST", signal: ctl.signal,
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
        body: JSON.stringify({ model: s.ocr_model || "mistral-ocr-latest", document: { type: "image_url", image_url: img } }),
      });
    } finally { clearTimeout(t); }
    const j = await r.json().catch(() => ({}));
    const text = (Array.isArray(j.pages) ? j.pages : []).map((p) => p.markdown || "").join("\n")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/[#*_`>|]/g, " ").replace(/[ \t]{2,}/g, " ").trim();
    if (!r.ok || !text) { console.error("da-ocr", r.status, String(j?.message || j?.error?.message || "").slice(0, 160)); return json({ error: "upstream" }, 502); }
    return json({ text: text.slice(0, 4000) });
  } catch (e) {
    console.error("da-ocr", String(e?.message || e));
    return json({ error: "upstream" }, 502);
  }
};
