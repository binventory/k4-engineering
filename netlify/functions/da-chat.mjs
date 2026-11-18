import { bump, clientIp, getFair, ipHash, json, llmChat, llmConf, retrieve, searchTerms, settings, slugOk, systemPrompt } from "../lib/da.mjs";

export default async (req, ctx) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let inp; try { inp = await req.json(); } catch { return json({ error: "bad_request" }, 400); }
  const slug = String(inp?.fair || "");
  if (!slugOk(slug)) return json({ error: "unknown_fair" }, 404);
  try {
    const fair = await getFair(slug);
    if (!fair) return json({ error: "unknown_fair" }, 404);
    const s = await settings();
    const clean = [];
    for (const m of (Array.isArray(inp.messages) ? inp.messages : []).slice(-8)) {
      const role = m?.role === "assistant" ? "assistant" : "user";
      const content = String(m?.content ?? "").slice(0, s.max_chars).trim();
      if (content) clean.push({ role, content });
    }
    if (!clean.length || clean.at(-1).role !== "user") return json({ error: "empty" }, 400);

    const now = new Date(), hour = now.toISOString().slice(0, 13), day = now.toISOString().slice(0, 10);
    if ((await bump(`ip:${ipHash(clientIp(req, ctx))}:${hour}`, 3600)) > s.rate_per_hour) return json({ error: "rate" }, 429);
    if ((await bump(`day:${day}`, 86400)) > s.daily_cap) return json({ error: "rate" }, 429);

    const conf = await llmConf(fair);
    const exh = fair.exhibitors || [];
    const last = clean.at(-1).content;
    const context = exh.length > 40 ? retrieve(exh, await searchTerms(conf, last)) : exh;
    const reply = await llmChat(conf, [{ role: "system", content: systemPrompt(fair, context) }, ...clean], { temp: 0.1, max: 600 });
    return json({ reply });
  } catch (e) {
    const m = String(e?.message || "");
    if (m === "no_key") return json({ error: "not_configured" }, 503);
    if (m === "busy") return json({ error: "busy" }, 503);
    return json({ error: "upstream" }, 502);
  }
};
