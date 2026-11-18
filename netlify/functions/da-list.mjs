import { getFair, json, slugOk } from "../lib/da.mjs";

// Compact exhibitor directory for the visitor app (company picker in the notebook, offline use).
// Only public exhibitor data; no profile text, no contact persons.
export default async (req) => {
  const slug = new URL(req.url).searchParams.get("fair") || "";
  if (!slugOk(slug)) return json({ error: "unknown_fair" }, 404);
  let fair;
  try { fair = await getFair(slug); } catch { return json({ error: "upstream" }, 502); }
  if (!fair) return json({ error: "unknown_fair" }, 404);
  const cut = (v, n) => String(v || "").trim().slice(0, n);
  const list = (fair.exhibitors || []).map((e) => {
    const o = { n: cut(e.name, 120), s: cut(e.stand, 20) };
    if (e.country) o.c = cut(e.country, 40);
    const x = cut(String(e.sector || "").split("/")[0], 70); if (x) o.x = x;
    if (/^https?:\/\//i.test(e.website || "")) o.w = cut(e.website, 200);
    if (e.sponsored) o.p = 1;
    return o;
  }).filter((o) => o.n);
  const res = json({ fair: slug, count: list.length, list });
  res.headers.set("cache-control", "public, max-age=60");
  return res;
};
