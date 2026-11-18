import { getFair, slugOk } from "../lib/da.mjs";

// Web-app manifest per fair, so the installed app opens straight into the right fair.
export default async (req) => {
  const slug = new URL(req.url).searchParams.get("fair") || "";
  let fair = null;
  if (slugOk(slug)) { try { fair = await getFair(slug); } catch { /* fall back to generic manifest */ } }
  const name = String(fair?.name || "Besucher-Assistent").slice(0, 60);
  const short = (name.split(/\s+/)[0] || name).slice(0, 12);
  const accent = /^#[0-9a-fA-F]{6}$/.test(fair?.accent || "") ? fair.accent : "#0b5fa5";
  const q = slugOk(slug) ? `?fair=${slug}` : "";
  const m = {
    id: `/demo-ai-agent/${q}`,
    name: `${name} – Besucher-Assistent (Demo)`,
    short_name: short,
    description: "Demo des Besucher-Assistenten von K4-Engineering: Fragen zur Messe, Hallenplan, eigenes Messe-Notizbuch.",
    start_url: `/demo-ai-agent/${q}${q ? "&" : "?"}source=pwa`,
    scope: "/demo-ai-agent/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f6f9",
    theme_color: accent,
    lang: "de",
    categories: ["business", "productivity"],
    icons: [
      { src: "/demo-ai-agent/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/demo-ai-agent/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/demo-ai-agent/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
  return new Response(JSON.stringify(m), { headers: { "content-type": "application/manifest+json; charset=utf-8", "cache-control": "public, max-age=300", "x-robots-tag": "noindex, nofollow" } });
};
