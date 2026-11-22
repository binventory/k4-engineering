/* Fair-Agent v5 – rich answers: safe Markdown -> HTML, exhibitor cards, welcome hero.
   The model never sends HTML: every text is escaped first, then a small fixed set of tags is added. */
(function () {
  'use strict';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const STAND = /(^|[^0-9A-Za-z])([0-9]\s?[-‐‑–]\s?[A-Z]\d{1,3})\b/g;

  function inline(s) {
    let h = esc(s);
    h = h.replace(/\[([^\]]{1,120})\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    h = h.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,;:!?])/g, (m, p, u) => p + '<a href="' + u + '" target="_blank" rel="noopener">' + u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') + '</a>');
    h = h.replace(/`([^`]{1,80})`/g, '<code>$1</code>');
    h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/__(.+?)__/g, '<strong>$1</strong>');
    h = h.replace(/(^|[\s(])\*([^*\s][^*]{0,80}?)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
    h = h.replace(STAND, (m, p, st) => p + '<span class="std">' + st.replace(/\s/g, '') + '</span>');
    return h;
  }

  function md(text) {
    const lines = String(text || '').replace(/\r/g, '').split('\n');
    let out = '', list = null, para = [];
    const flushP = () => { if (para.length) { out += '<p>' + para.map(inline).join('<br>') + '</p>'; para = []; } };
    const flushL = () => { if (list) { out += '</' + list + '>'; list = null; } };
    for (const raw of lines) {
      const l = raw.trim();
      if (!l) { flushP(); flushL(); continue; }
      let m;
      if ((m = l.match(/^#{1,4}\s+(.*)$/))) { flushP(); flushL(); out += '<h3>' + inline(m[1].replace(/[*_]{2}/g, '')) + '</h3>'; continue; }
      if ((m = l.match(/^[-*•–]\s+(.*)$/))) { flushP(); if (list !== 'ul') { flushL(); out += '<ul>'; list = 'ul'; } out += '<li>' + inline(m[1]) + '</li>'; continue; }
      if ((m = l.match(/^\d{1,2}[.)]\s+(.*)$/))) { flushP(); if (list !== 'ol') { flushL(); out += '<ol>'; list = 'ol'; } out += '<li>' + inline(m[1]) + '</li>'; continue; }
      if (/^(💡|ℹ️|👉)/.test(l)) { flushP(); flushL(); out += '<div class="tip">' + inline(l) + '</div>'; continue; }
      if (/^-{3,}$/.test(l)) { flushP(); flushL(); continue; }
      flushL(); para.push(l);
    }
    flushP(); flushL();
    return '<div class="rx">' + out + '</div>';
  }

  const initials = (n) => (String(n || '?').replace(/\b(GmbH|AG|KG|Co\.?|SE|Ltd|Inc|S\.?A\.?|S\.?r\.?l\.?|& )\b/gi, ' ').trim().split(/[\s\-–&]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();

  // cards: [{name, stand, sector, country, website, desc, sponsored}]
  function cards(d, list, C) {
    if (!Array.isArray(list) || !list.length) return;
    const meta = C.meta() || {}, halls = (meta.layout && meta.layout.halls) || [];
    const L = C.L, T = C.T;
    const sec = (s) => { const p = String(s || '').split('/').map((x) => x.trim()); return L === 'de' ? p[0] : (p[1] || p[0]); };
    const box = document.createElement('div'); box.className = 'cards';
    list.forEach((e, i) => {
      const hid = C.hallsIn(e.stand)[0], hall = halls.find((h) => h.id === hid), u = C.safeUrl(e.website);
      const c = document.createElement('div'); c.className = 'xc'; c.style.animationDelay = (i * 60) + 'ms';
      if (hall && /^#[0-9a-f]{3,8}$/i.test(hall.color || '')) c.style.setProperty('--hc', hall.color);
      c.innerHTML = '<div class="top"></div><div class="in"><div class="hd"><span class="mono">' + esc(initials(e.name)) + '</span><b>' + esc(e.name) + '</b></div>' +
        '<div class="meta">' + (e.stand ? '<span class="bd st">' + esc(T.stand + ' ' + e.stand) + '</span>' : '') + (e.sector ? '<span class="bd">' + esc(sec(e.sector)) + '</span>' : '') +
        (e.country ? '<span class="bd">' + esc(e.country) + '</span>' : '') + (e.sponsored ? '<span class="bd adv">' + esc(T.ad) + '</span>' : '') + '</div>' +
        (e.desc ? '<small>' + esc(e.desc) + '</small>' : '') +
        '<div class="ft">' + (hid ? '<button type="button" data-a="map">📍 ' + esc(hall && hall.name ? hall.name : T.map) + '</button>' : '') +
        (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">🌐 ' + esc(T.more) + '</a>' : '') +
        (window.NB ? '<button type="button" data-a="save" aria-label="☆">☆</button>' : '') + '</div></div>';
      const mb = c.querySelector('[data-a=map]'); if (mb) mb.onclick = () => C.showMap([hid]);
      const sb = c.querySelector('[data-a=save]'); if (sb) sb.onclick = () => { NB.addCompany({ name: e.name, stand: e.stand, website: e.website, sector: e.sector, country: e.country }); sb.textContent = '✓'; sb.disabled = true; };
      box.appendChild(c);
    });
    d.appendChild(box);
    // the cards already offer ☆ per company: keep only "save answer" in the notebook row
    const acts = d.querySelector('.acts'); if (acts) [...acts.querySelectorAll('.act')].slice(1).forEach((b) => { if (!/📅/.test(b.textContent)) b.remove(); });
  }

  const HERO = {
    de: ['Ihr KI-Messe-Assistent', 'Fragen Sie nach Ausstellern, Produkten, Ständen und Vorträgen – in Ihrer Sprache.', 'Aussteller', 'Bereiche', 'Vorträge', 'Sprachen'],
    en: ['Your AI fair assistant', 'Ask about exhibitors, products, stands and talks – in your own language.', 'Exhibitors', 'Sectors', 'Sessions', 'Languages'],
    ar: ['مساعدك الذكي في المعرض', 'اسأل عن العارضين والمنتجات والأجنحة والمحاضرات – بلغتك.', 'عارض', 'قطاع', 'محاضرة', 'لغة'],
    tr: ['Yapay zekâ fuar asistanınız', 'Katılımcılar, ürünler, standlar ve konuşmalar hakkında kendi dilinizde sorun.', 'Katılımcı', 'Sektör', 'Oturum', 'Dil'],
    fr: ['Votre assistant IA du salon', 'Exposants, produits, stands et conférences – dans votre langue.', 'Exposants', 'Secteurs', 'Sessions', 'Langues'],
    it: ['Il tuo assistente IA in fiera', 'Espositori, prodotti, stand e conferenze – nella tua lingua.', 'Espositori', 'Settori', 'Sessioni', 'Lingue'],
    es: ['Tu asistente IA de la feria', 'Expositores, productos, stands y charlas – en tu idioma.', 'Expositores', 'Sectores', 'Sesiones', 'Idiomas'],
    pl: ['Twój asystent AI na targach', 'Wystawcy, produkty, stoiska i wykłady – w Twoim języku.', 'Wystawców', 'Branż', 'Sesji', 'Języków'],
    ru: ['Ваш ИИ-ассистент выставки', 'Экспоненты, продукты, стенды и доклады – на вашем языке.', 'Экспонентов', 'Секторов', 'Докладов', 'Языков'],
    zh: ['您的AI展会助手', '用您的语言询问参展商、产品、展位和演讲。', '参展商', '行业', '活动', '语言'],
  };
  function hero(box, m, L, welcome) {
    const h = HERO[L] || HERO.en, n = (m.program && m.program.events || []).length, s = (m.sectors || []).length;
    const stat = (v, l) => '<div class="stat"><b>' + v + '</b><span>' + esc(l) + '</span></div>';
    box.className = 'hero';
    box.innerHTML = '<div class="hl"><img src="/demo-ai-agent/logo.svg" alt=""><div><h2>' + esc(h[0]) + '</h2><p>' + esc(welcome || h[1]) + '</p></div></div>' +
      '<div class="stats">' + (m.count ? stat(m.count, h[2]) : '') + (s ? stat(s, h[3]) : '') + (n ? stat(n, h[4]) : '') + stat('20+', h[5]) + '</div>';
    box.hidden = false;
  }

  window.RICH = { md, cards, hero, esc };
})();
