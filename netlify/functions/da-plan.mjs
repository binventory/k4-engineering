import { getFair, slugOk } from "../lib/da.mjs";

// Serves the fair's uploaded floor-plan image (stored as a small data URL) as a cacheable image.
export default async (req) => {
  const slug = new URL(req.url).searchParams.get("fair") || "";
  if (!slugOk(slug)) return new Response("not found", { status: 404 });
  let fair; try { fair = await getFair(slug); } catch { return new Response("upstream", { status: 502 }); }
  const m = /^data:(image\/(?:jpeg|webp|png));base64,(.+)$/.exec(fair?.layout?.image || "");
  if (!m) return new Response("not found", { status: 404 });
  return new Response(Buffer.from(m[2], "base64"), { headers: { "Content-Type": m[1], "Cache-Control": "public, max-age=300", "X-Content-Type-Options": "nosniff" } });
};
