import { bump, mentioned, clientIp, getFair, ipHash, json, llmChat, llmConf, needsRetrieval, retrieve, settings, slugOk, systemPrompt, understand, LANGS } from "../lib/da.mjs";

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
      const content = String(m?.content ?? "").slice(0, role === "assistant" ? 900 : s.max_chars).trim();
      if (content) clean.push({ role, content });
    }
    if (!clean.length || clean.at(-1).role !== "user") return json({ error: "empty" }, 400);
    const ui = LANGS[String(inp.lang || "")] ? String(inp.lang) : "en";

    const now = new Date(), hour = now.toISOString().slice(0, 13), day = now.toISOString().slice(0, 10);
    if ((await bump(`ip:${ipHash(clientIp(req, ctx))}:${hour}`, 3600)) > s.rate_per_hour) return json({ error: "rate" }, 429);
    if ((await bump(`day:${day}`, 86400)) > s.daily_cap) return json({ error: "rate" }, 429);

    await bump(`stat:${slug}:${day}`, 31536000).catch(() => {});
    const conf = await llmConf(fair);
    const exh = fair.exhibitors || [];
    const q = await understand(conf, clean, ui, exh);
    const context = needsRetrieval(exh) ? retrieve(exh, q.terms, 18, q.sectors) : exh;
    const msgs = [{ role: "system", content: systemPrompt(fair, context, q) }, ...clean.slice(-6),
      { role: "system", content: `Answer the latest visitor message now, in ${LANGS[q.lang]}.` }];
    const reply = await llmChat(conf, msgs, { temp: 0.2, max: 900 });
    const pool = context.length < exh.length ? [...context, ...exh] : exh;
    let cards = []; try { cards = mentioned(reply, pool); } catch { /* cards are optional */ }
    return json({ reply, lang: q.lang, cards });
  } catch (e) {
    const m = String(e?.message || "");
    console.error("da-chat", slug, m);
    if (m === "no_key") return json({ error: "not_configured" }, 503);
    if (m === "busy") return json({ error: "busy", retry: 20 }, 503);
    return json({ error: "upstream" }, 502);
  }
};
