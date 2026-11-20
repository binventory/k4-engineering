import { getFair, json, settings, slugOk } from "../lib/da.mjs";

export default async (req) => {
  const slug = new URL(req.url).searchParams.get("fair") || "";
  if (!slugOk(slug)) return json({ error: "unknown_fair" }, 404);
  let fair;
  try { fair = await getFair(slug); } catch { return json({ error: "upstream" }, 502); }
  if (!fair) return json({ error: "unknown_fair" }, 404);
  const exh = fair.exhibitors || [], sectors = {}, full = {};
  for (const e of exh) { const s = String(e.sector || "").split("/")[0].trim(); if (s) (sectors[s] ??= []).push(e.name); const fs = String(e.sector || "").trim(); if (fs) full[fs] = (full[fs] || 0) + 1; }
  const featured = exh.filter((e) => e.sponsored).map((e) => ({ name: e.name, stand: e.stand || "", sector: e.sector || "", website: e.website || "", description: String(e.description || "").slice(0, 160), tier: Math.max(1, Math.min(10, Number(e.tier) || 1)) }));
  return json({
    name: fair.name || "", dates: fair.dates || "", venue: fair.venue || "", accent: fair.accent || "#0b5fa5",
    welcome: fair.welcome || "", questions: fair.questions || [], ads: fair.ads || [], featured, layout: fair.layout ? { ...fair.layout, image: undefined, has_image: !!fair.layout.image } : null, ad_interval: Math.max(8, Math.min(600, Number(fair.ad_interval) || 30)),
    sector_examples: Object.fromEntries(Object.entries(sectors).map(([k, v]) => [k, v.slice(0, 3)])), count: exh.length,
    ocr: (await settings().catch(() => ({}))).ocr === "mistral" ? "mistral" : "device",
    sectors: Object.entries(full).sort((a, b) => b[1] - a[1]).map(([name, n]) => ({ name, n })),
    program: Array.isArray(fair.program?.events) && fair.program.events.length ? { note: fair.program.note || "", events: fair.program.events } : null,
  });
};
