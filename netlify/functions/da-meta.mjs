import { getFair, json, slugOk } from "../lib/da.mjs";

export default async (req) => {
  const slug = new URL(req.url).searchParams.get("fair") || "";
  if (!slugOk(slug)) return json({ error: "unknown_fair" }, 404);
  let fair;
  try { fair = await getFair(slug); } catch { return json({ error: "upstream" }, 502); }
  if (!fair) return json({ error: "unknown_fair" }, 404);
  const exh = fair.exhibitors || [], sectors = {};
  for (const e of exh) { const s = String(e.sector || "").split("/")[0].trim(); if (s) (sectors[s] ??= []).push(e.name); }
  const featured = exh.filter((e) => e.sponsored).map((e) => ({ name: e.name, stand: e.stand || "", sector: e.sector || "", website: e.website || "", description: String(e.description || "").slice(0, 160) }));
  return json({
    name: fair.name || "", dates: fair.dates || "", venue: fair.venue || "", accent: fair.accent || "#0b5fa5",
    welcome: fair.welcome || "", questions: fair.questions || [], ads: fair.ads || [], featured, layout: fair.layout || null,
    sector_examples: Object.fromEntries(Object.entries(sectors).map(([k, v]) => [k, v.slice(0, 3)])), count: exh.length,
  });
};
