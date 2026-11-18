import { PROVIDERS, bump, checkToken, clientIp, deleteFair, getFair, getSetting, ipHash, json, listFairs, makeToken, passwordOk, saveFair, setSetting, settings, slugOk } from "../lib/da.mjs";

const str = (v, n = 4000) => String(v ?? "").trim().slice(0, n);

export default async (req, ctx) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let b; try { b = await req.json(); } catch { return json({ error: "bad_request" }, 400); }
  try {
    if (b.action === "login") {
      if ((await bump(`login:${ipHash(clientIp(req, ctx))}`, 900)) > 8) return json({ error: "too_many" }, 429);
      return passwordOk(b.password) ? json({ token: makeToken() }) : json({ error: "wrong" }, 401);
    }
    if (!checkToken(req)) return json({ error: "auth" }, 401);

    if (b.action === "state") {
      const s = await settings(), sec = await getSetting("secrets");
      const fairs = (await listFairs()).map((r) => ({ slug: r.slug, name: r.data?.name || "", count: (r.data?.exhibitors || []).length }));
      return json({
        fairs, provider: s.provider, rate_per_hour: s.rate_per_hour, daily_cap: s.daily_cap,
        providers: Object.fromEntries(Object.entries(PROVIDERS).map(([id, p]) => [id, {
          name: p.name, base: s.providers?.[id]?.base || p.base, model: s.providers?.[id]?.model || p.model, has_key: !!sec.keys?.[id],
        }])),
      });
    }
    if (b.action === "getFair") { const f = await getFair(str(b.slug, 41)); return f ? json({ fair: { ...f, exhibitors: (f.exhibitors || []).map((e) => ({ name: e.name, stand: e.stand || "", sponsored: !!e.sponsored })) } }) : json({ error: "unknown_fair" }, 404); }

    if (b.action === "saveFair") {
      const slug = str(b.slug, 41).toLowerCase();
      if (!slugOk(slug)) return json({ error: "bad_slug" }, 400);
      const f = (await getFair(slug)) || { exhibitors: [] };
      for (const k of ["name", "dates", "venue", "organiser_contact", "welcome", "info"]) if (k in b) f[k] = str(b[k], k === "info" ? 40000 : 600);
      if ("accent" in b) f.accent = /^#[0-9a-fA-F]{6}$/.test(b.accent) ? b.accent : "#0b5fa5";
      if ("questions" in b) f.questions = (Array.isArray(b.questions) ? b.questions : []).map((q) => str(q, 200)).filter(Boolean).slice(0, 8);
      if ("ads" in b) f.ads = (Array.isArray(b.ads) ? b.ads : []).slice(0, 5).map((a) => ({ text: str(a.text, 300), url: /^https?:\/\//i.test(a.url || "") ? str(a.url, 500) : "", cta: str(a.cta, 40) || "→" }));
      if ("provider" in b) { if (PROVIDERS[b.provider]) f.provider = b.provider; else delete f.provider; }
      if (Array.isArray(b.exhibitors)) {
        const clean = b.exhibitors.slice(0, 5000).map((e) => {
          const o = { name: str(e.name, 200) };
          for (const k of ["stand", "country", "sector", "description", "products", "keywords", "website"]) if (e[k]) o[k] = str(e[k], 600);
          if (e.sponsored) o.sponsored = true;
          return o;
        }).filter((e) => e.name);
        f.exhibitors = b.mode === "append" ? [...(f.exhibitors || []), ...clean] : clean;
      }
      await saveFair(slug, f);
      return json({ ok: true, count: (f.exhibitors || []).length });
    }
    if (b.action === "deleteFair") { const slug = str(b.slug, 41); if (slugOk(slug)) await deleteFair(slug); return json({ ok: true }); }
    if (b.action === "sponsors") {
      const slug = str(b.slug, 41), f = await getFair(slug);
      if (!f) return json({ error: "unknown_fair" }, 404);
      const set = new Set((b.indices || []).map(Number));
      f.exhibitors = (f.exhibitors || []).map((e, i) => { const { sponsored, ...rest } = e; return set.has(i) ? { ...rest, sponsored: true } : rest; });
      await saveFair(slug, f);
      return json({ ok: true });
    }
    if (b.action === "saveLlm") {
      const s = await settings(), sec = await getSetting("secrets");
      if (!PROVIDERS[b.provider]) return json({ error: "bad_provider" }, 400);
      s.provider = b.provider;
      s.providers = s.providers || {};
      for (const [id, o] of Object.entries(b.providers || {})) if (PROVIDERS[id]) s.providers[id] = { base: str(o.base, 300), model: str(o.model, 120) };
      sec.keys = sec.keys || {};
      for (const [id, k] of Object.entries(b.keys || {})) if (PROVIDERS[id] && str(k, 300)) sec.keys[id] = str(k, 300);
      for (const id of b.delKeys || []) delete sec.keys[id];
      s.rate_per_hour = Math.max(5, Number(b.rate_per_hour) || 40);
      s.daily_cap = Math.max(50, Number(b.daily_cap) || 1500);
      await setSetting("llm", s); await setSetting("secrets", sec);
      return json({ ok: true });
    }
    return json({ error: "bad_action" }, 400);
  } catch (e) {
    return json({ error: String(e?.message || "error").startsWith("no_db") ? "no_db" : "upstream" }, 502);
  }
};
