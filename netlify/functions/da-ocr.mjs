// Server OCR for business cards in the visitor notebook (admin → AI settings → "Business-card scanner").
//   llamaparse: LlamaParse API v2 (job based: action "start" uploads, action "poll" returns the text when ready)
//   mistral:    Mistral OCR (EU), one call
// The text is then sorted into contact fields by the chat model (JSON). Photos and text are passed through, not stored.
import { bump, clientIp, extractCard, getFair, getSetting, ipHash, json, llmConf, settings, slugOk } from "../lib/da.mjs";

const LP_BASE = "https://api.cloud.llamaindex.ai";
const TIERS = ["fast", "cost_effective", "agentic", "agentic_plus"];

// longest string found under a text/markdown key (the exact v2 response shape is not documented in detail)
function findText(o) {
  let best = "";
  const walk = (v, k) => {
    if (typeof v === "string") { if (/text|markdown|md/i.test(k) && !/url|error|status|_id$|^id$/i.test(k) && v.length > best.length) best = v; return; }
    if (Array.isArray(v)) {
      const parts = v.map((x) => (typeof x === "string" ? x : (x && (x.text || x.markdown || x.md)) || "")).filter((x) => typeof x === "string" && x);
      if (/text|markdown|pages|md/i.test(k) && parts.join("\n").length > best.length) best = parts.join("\n");
      v.forEach((x) => walk(x, k)); return;
    }
    if (v && typeof v === "object") for (const [kk, vv] of Object.entries(v)) walk(vv, kk);
  };
  walk(o, "");
  return best;
}
const cleanText = (t) => String(t || "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/[#*_`>|]/g, " ").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, 4000);

async function finish(fair, text) {
  let fields = null;
  try { fields = await extractCard(await llmConf(fair), text); } catch (e) { console.error("da-ocr extract", String(e?.message || e)); }
  return json({ text, fields });
}

export default async (req, ctx) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let b; try { b = await req.json(); } catch { return json({ error: "bad_request" }, 400); }
  const slug = String(b?.fair || "");
  if (!slugOk(slug)) return json({ error: "unknown_fair" }, 404);
  try {
    const s = await settings();
    const mode = s.ocr;
    if (mode !== "mistral" && mode !== "llamaparse") return json({ error: "off" }, 404);
    const fair = await getFair(slug);
    if (!fair) return json({ error: "unknown_fair" }, 404);
    const ip = ipHash(clientIp(req, ctx)), hour = new Date().toISOString().slice(0, 13);
    const keys = (await getSetting("secrets")).keys || {};
    const action = b.action === "poll" ? "poll" : "start";

    if (action === "start") {
      const img = String(b?.image || "");
      const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(img);
      if (!m || img.length > 3000000) return json({ error: "bad_image" }, 400);
      if ((await bump(`ocr:${ip}:${hour}`, 3600)) > 30) return json({ error: "rate" }, 429);

      if (mode === "mistral") {
        const key = keys.mistral; if (!key) return json({ error: "no_key" }, 503);
        const base = String(s.providers?.mistral?.base || "https://api.mistral.ai/v1").replace(/\/$/, "");
        const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
        let r; try {
          r = await fetch(base + "/ocr", { method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
            body: JSON.stringify({ model: s.ocr_model || "mistral-ocr-latest", document: { type: "image_url", image_url: img } }) });
        } finally { clearTimeout(t); }
        const j = await r.json().catch(() => ({}));
        const text = cleanText((Array.isArray(j.pages) ? j.pages : []).map((p) => p.markdown || "").join("\n"));
        if (!r.ok || !text) { console.error("da-ocr mistral", r.status, String(j?.message || j?.error?.message || "").slice(0, 160)); return json({ error: "upstream" }, 502); }
        return finish(fair, text);
      }

      // llamaparse: upload and return the job id
      const key = keys.llamaparse; if (!key) return json({ error: "no_key" }, 503);
      const lp = s.ocr_llama || {}, base = String(lp.base || LP_BASE).replace(/\/$/, ""), tier = TIERS.includes(lp.tier) ? lp.tier : "cost_effective";
      const ext = m[1] === "jpeg" ? "jpg" : m[1];
      const form = new FormData();
      form.append("file", new Blob([Buffer.from(m[2], "base64")], { type: "image/" + m[1] }), "business-card." + ext);
      form.append("configuration", JSON.stringify({ tier, version: "latest" }));
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
      let r; try { r = await fetch(base + "/api/v2/parse/upload", { method: "POST", signal: ctl.signal, headers: { Authorization: "Bearer " + key }, body: form }); } finally { clearTimeout(t); }
      const j = await r.json().catch(() => ({}));
      const id = j.id || j.job?.id;
      if (!r.ok || !id) { console.error("da-ocr llamaparse upload", r.status, JSON.stringify(j).slice(0, 200)); return json({ error: "upstream" }, 502); }
      return json({ job: String(id) });
    }

    // poll (llamaparse only)
    if (mode !== "llamaparse") return json({ error: "bad_request" }, 400);
    const id = String(b.job || "");
    if (!/^[A-Za-z0-9_-]{6,80}$/.test(id)) return json({ error: "bad_job" }, 400);
    if ((await bump(`ocrp:${ip}:${hour}`, 3600)) > 600) return json({ error: "rate" }, 429);
    const key = keys.llamaparse; if (!key) return json({ error: "no_key" }, 503);
    const base = String((s.ocr_llama || {}).base || LP_BASE).replace(/\/$/, "");
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
    let r; try { r = await fetch(base + "/api/v2/parse/" + encodeURIComponent(id) + "?expand=text_full,markdown_full", { signal: ctl.signal, headers: { Authorization: "Bearer " + key } }); } finally { clearTimeout(t); }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { console.error("da-ocr llamaparse poll", r.status, JSON.stringify(j).slice(0, 200)); return json({ error: "upstream" }, 502); }
    const st = String(j.job?.status || j.status || "").toUpperCase();
    if (st === "FAILED" || st === "CANCELLED" || st === "ERROR") { console.error("da-ocr llamaparse job", st, String(j.job?.error_message || "").slice(0, 200)); return json({ error: "failed" }, 502); }
    if (st && st !== "COMPLETED" && st !== "SUCCESS") return json({ pending: true });
    const text = cleanText(findText({ ...j, job: undefined }));
    if (!text) { console.error("da-ocr llamaparse empty", Object.keys(j).join(",")); return json({ error: "empty" }, 502); }
    return finish(fair, text);
  } catch (e) {
    console.error("da-ocr", String(e?.message || e));
    return json({ error: "upstream" }, 502);
  }
};
