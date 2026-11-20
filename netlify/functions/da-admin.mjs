import { PROVIDERS, bump, checkToken, clientIp, deleteFair, getFair, getSetting, ipHash, json, listFairs, listStats, llmConf, fetchSiteText, summarizeSite, makeToken, passwordOk, saveFair, setSetting, settings, slugOk } from "../lib/da.mjs";

const str = (v, n = 4000) => String(v ?? "").trim().slice(0, n);
const ICONS = new Set(["wc", "food", "coffee", "bar", "info", "doctor", "cloak", "charge", "poster", "conf", "lost"]);
const num = (v) => Math.max(0, Math.min(100, Number(v) || 0));
const rect = (r) => ({ x: num(r?.x), y: num(r?.y), w: num(r?.w), h: num(r?.h) });
const arr = (v, n) => (Array.isArray(v) ? v.slice(0, n) : []);
const EV_TYPES = ["talk", "workshop", "panel", "social", "poster", "opening"];
const hhmm = (v) => { const m = /^\s*(\d{1,2}):(\d{2})\s*$/.exec(String(v || "")); return m && +m[1] < 24 && +m[2] < 60 ? `${m[1].padStart(2, "0")}:${m[2]}` : ""; };
// Programme: {note, events:[{id,date,start,end,title,room,type,speakers[{name,role,company}],desc}]}; null/empty removes it.
const cleanProgram = (p) => {
  const evs = (Array.isArray(p?.events) ? p.events : []).slice(0, 300).map((e) => {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(e?.date || "") ? e.date : "", start = hhmm(e?.start), title = str(e?.title, 160);
    if (!date || !start || !title) return null;
    const o = { date, start, title, type: EV_TYPES.includes(e.type) ? e.type : "talk" };
    const end = hhmm(e.end); if (end) o.end = end;
    if (e.room) o.room = str(e.room, 80);
    const sp = (Array.isArray(e.speakers) ? e.speakers : []).slice(0, 6).map((x) => ({ name: str(x?.name, 80), role: str(x?.role, 80), company: str(x?.company, 80) })).filter((x) => x.name);
    if (sp.length) o.speakers = sp.map((x) => Object.fromEntries(Object.entries(x).filter(([, v]) => v)));
    if (e.desc) o.desc = str(e.desc, 700);
    return o;
  }).filter(Boolean).sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`)).map((e, i) => ({ id: "e" + (i + 1), ...e }));
  return evs.length ? { note: str(p?.note, 200), events: evs } : null;
};
const cleanLayout = (l) => {
  if (!l || typeof l !== "object") return null;
  return {
    note: str(l.note, 200),
    image: /^data:image\/(jpeg|webp|png);base64,[A-Za-z0-9+\/=]+$/.test(l.image || "") && l.image.length <= 700000 ? l.image : undefined,
    halls: arr(l.halls, 20).map((h) => ({ id: str(h.id, 8), name: str(h.name, 30), color: /^#[0-9a-fA-F]{6}$/.test(h.color) ? h.color : "#888888", ...rect(h), icons: arr(h.icons, 10).filter((i) => ICONS.has(i)) })),
    links: arr(l.links, 30).map(rect),
    entrance: l.entrance ? { ...rect(l.entrance), label: str(l.entrance.label, 30), icons: arr(l.entrance.icons, 10).filter((i) => ICONS.has(i)) } : null,
  };
};

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
      const st = {}; for (const r of await listStats()) { const [, sl, d] = String(r.k).split(":"); (st[sl] ??= {})[d] = r.n; }
      const wk = Date.now() - 7 * 864e5, tally = (sl) => { const o = st[sl] || {}; let t = 0, w = 0; for (const [d, n] of Object.entries(o)) { t += n; if (Date.parse(d) >= wk) w += n; } return { total: t, week: w }; };
      const fairs = (await listFairs()).map((r) => ({ slug: r.slug, name: r.data?.name || "", count: (r.data?.exhibitors || []).length, questions: tally(r.slug) }));
      return json({
        fairs, provider: s.provider, rate_per_hour: s.rate_per_hour, daily_cap: s.daily_cap,
        providers: Object.fromEntries(Object.entries(PROVIDERS).map(([id, p]) => [id, {
          name: p.name, base: s.providers?.[id]?.base || p.base, model: s.providers?.[id]?.model || p.model, has_key: !!sec.keys?.[id],
        }])),
      });
    }
    if (b.action === "getFair") { const f = await getFair(str(b.slug, 41)); return f ? json({ fair: { ...f, exhibitors: (f.exhibitors || []).map((e) => ({ name: e.name, stand: e.stand || "", sponsored: !!e.sponsored, tier: e.tier || (e.sponsored ? 1 : 0), website: e.website || "", has_profile: !!e.profile })) } }) : json({ error: "unknown_fair" }, 404); }

    if (b.action === "saveFair") {
      const slug = str(b.slug, 41).toLowerCase();
      if (!slugOk(slug)) return json({ error: "bad_slug" }, 400);
      const f = (await getFair(slug)) || { exhibitors: [] };
      for (const k of ["name", "dates", "venue", "organiser_contact", "welcome", "info"]) if (k in b) f[k] = str(b[k], k === "info" ? 40000 : 600);
      if ("accent" in b) f.accent = /^#[0-9a-fA-F]{6}$/.test(b.accent) ? b.accent : "#0b5fa5";
      if ("questions" in b) f.questions = (Array.isArray(b.questions) ? b.questions : []).map((q) => str(q, 200)).filter(Boolean).slice(0, 8);
      if ("ads" in b) f.ads = (Array.isArray(b.ads) ? b.ads : []).slice(0, 12).map((a) => ({ text: str(a.text, 300), url: /^https?:\/\//i.test(a.url || "") ? str(a.url, 500) : "", cta: str(a.cta, 40) || "→", image: /^https:\/\//i.test(a.image || "") ? str(a.image, 500) : "", secs: Math.max(4, Math.min(120, Number(a.secs) || 0)) || undefined }));
      if ("layout" in b) { if (b.layout === null || b.layout === "") delete f.layout; else f.layout = cleanLayout(b.layout); }
      if ("program" in b) { const pr = cleanProgram(b.program); if (pr) f.program = pr; else delete f.program; }
      if ("ad_interval" in b) f.ad_interval = Math.max(8, Math.min(600, Number(b.ad_interval) || 30));
      if ("provider" in b) { if (PROVIDERS[b.provider]) f.provider = b.provider; else delete f.provider; }
      if (Array.isArray(b.exhibitors)) {
        const clean = b.exhibitors.slice(0, 5000).map((e) => {
          const o = { name: str(e.name, 200) };
          for (const k of ["stand", "country", "sector", "description", "products", "keywords", "website"]) if (e[k]) o[k] = str(e[k], 600);
          if (e.profile) o.profile = str(e.profile, 900);
          if (e.sponsored) o.sponsored = true;
          if (e.sponsored && Number(e.tier) > 1) o.tier = Math.min(10, Math.round(Number(e.tier)));
          return o;
        }).filter((e) => e.name);
        if (b.mode !== "append") { const old = new Map((f.exhibitors || []).filter((e) => e.profile).map((e) => [e.name.toLowerCase(), e])); for (const e of clean) { const o = old.get(e.name.toLowerCase()); if (o && !e.profile) { e.profile = o.profile; if (o.profile_src) e.profile_src = o.profile_src; if (o.profile_at) e.profile_at = o.profile_at; } } }
        f.exhibitors = b.mode === "append" ? [...(f.exhibitors || []), ...clean] : clean;
      }
      await saveFair(slug, f);
      return json({ ok: true, count: (f.exhibitors || []).length });
    }
    if (b.action === "crawlFetch") {
      const f = await getFair(str(b.slug, 41)), e = f?.exhibitors?.[Number(b.index)];
      if (!e?.website) return json({ error: "no_website" }, 400);
      try { return json(await fetchSiteText(e.website)); } catch (x) { return json({ error: String(x.message || "fetch") }, 422); }
    }
    if (b.action === "crawlSave") {
      const slug = str(b.slug, 41), f = await getFair(slug), i = Number(b.index), e = f?.exhibitors?.[i];
      if (!e) return json({ error: "unknown" }, 404);
      let out; try { out = await summarizeSite(await llmConf(f), e.name, str(b.text, 7500)); } catch (x) { return json({ error: String(x.message || "llm") === "busy" ? "busy" : "llm" }, 422); }
      out = String(out || "").replace(/\s+/g, " ").trim();
      if (!out || /^NONE\b/i.test(out)) return json({ error: "none" }, 422);
      e.profile = out.slice(0, 700); e.profile_src = str(b.url, 300); e.profile_at = new Date().toISOString().slice(0, 10);
      await saveFair(slug, f);
      return json({ ok: true, profile: e.profile });
    }
    if (b.action === "deleteFair") { const slug = str(b.slug, 41); if (slugOk(slug)) await deleteFair(slug); return json({ ok: true }); }
    if (b.action === "sponsors") {
      const slug = str(b.slug, 41), f = await getFair(slug);
      if (!f) return json({ error: "unknown_fair" }, 404);
      const tiers = new Map();
      if (b.tiers && typeof b.tiers === "object") for (const [k, v] of Object.entries(b.tiers)) { const n = Math.round(Number(v)); if (n >= 1) tiers.set(Number(k), Math.min(10, n)); }
      for (const i of (b.indices || []).map(Number)) if (!tiers.has(i)) tiers.set(i, 1);
      f.exhibitors = (f.exhibitors || []).map((e, i) => { const { sponsored, tier, ...rest } = e; const n = tiers.get(i); return n ? { ...rest, sponsored: true, ...(n > 1 ? { tier: n } : {}) } : rest; });
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
