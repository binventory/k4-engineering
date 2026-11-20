/* Business-card scanner for the visitor notebook.
   Default: text recognition ON THE PHONE (tesseract.js, self-hosted in /demo-ai-agent/ocr/, loaded only when a card is scanned).
   Optional (admin setting "Card scanner"): server OCR via /.netlify/functions/da-ocr (Mistral OCR, EU), falls back to the phone.
   Exposes window.CARD = { ocr, parse, vcard, matchExhibitor }. */
(function () {
  'use strict';
  const BASE = '/demo-ai-agent/ocr/';
  let worker = null, onp = null;
  const load = (src) => new Promise((res, rej) => {
    if (window.Tesseract) return res();
    const s = document.createElement('script'); s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('load')); document.head.appendChild(s);
  });
  // grey, contrast-stretched copy of the photo (helps the recogniser with coloured cards)
  async function prep(file, max, grey) {
    const bmp = await createImageBitmap(file), s = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(bmp.width * s)); c.height = Math.max(1, Math.round(bmp.height * s));
    const x = c.getContext('2d', { willReadFrequently: true }); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(bmp, 0, 0, c.width, c.height);
    if (grey) {
      const d = x.getImageData(0, 0, c.width, c.height), p = d.data; let lo = 255, hi = 0; const g = new Uint8ClampedArray(p.length / 4);
      for (let i = 0, j = 0; i < p.length; i += 4, j++) { const v = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]; g[j] = v; if (v < lo) lo = v; if (v > hi) hi = v; }
      const k = hi - lo > 30 ? 255 / (hi - lo) : 1;
      for (let i = 0, j = 0; i < p.length; i += 4, j++) { const v = (g[j] - lo) * k; p[i] = p[i + 1] = p[i + 2] = v; }
      x.putImageData(d, 0, 0);
    }
    return c;
  }
  async function device(file, progress) {
    onp = progress || null;
    await load(BASE + 'tesseract.min.js');
    if (!worker) {
      worker = await window.Tesseract.createWorker(['deu', 'eng'], 1, {
        workerPath: BASE + 'worker.min.js', corePath: BASE, langPath: BASE + 'lang', gzip: true,
        logger: (m) => { if (!onp || typeof m.progress !== 'number') return; onp(m.status === 'recognizing text' ? 0.5 + m.progress * 0.5 : Math.min(0.5, m.progress * 0.5)); },
      });
    }
    const { data } = await worker.recognize(await prep(file, 2000, true));
    if (onp) onp(1);
    return String(data.text || '');
  }
  const post = async (body) => {
    const r = await fetch('/.netlify/functions/da-ocr', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || 'ocr'); return j;
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // server OCR (LlamaParse: start + poll; Mistral: one call). Returns {text, fields}
  async function cloud(file, fair, progress) {
    const c = await prep(file, 1800, false), image = c.toDataURL('image/jpeg', 0.88);
    if (progress) progress(0.15);
    let j = await post({ fair, action: 'start', image });
    if (j.job) {
      const job = j.job, t0 = Date.now(); let p = 0.2;
      for (;;) {
        if (Date.now() - t0 > 60000) throw new Error('timeout');
        await sleep(1500); p = Math.min(0.92, p + 0.05); if (progress) progress(p);
        j = await post({ fair, action: 'poll', job });
        if (!j.pending) break;
      }
    }
    if (!j || !j.text) throw new Error('ocr');
    if (progress) progress(1);
    return { text: String(j.text), fields: j.fields || null, via: 'cloud' };
  }
  async function ocr(file, o) {
    o = o || {};
    if (o.mode === 'mistral' || o.mode === 'llamaparse') { try { return await cloud(file, o.fair, o.progress); } catch (e) { if (o.onFallback) o.onFallback(); } }
    return { text: await device(file, o.progress), fields: null, via: 'device' };
  }

  // ---------- parsing ----------
  const LEGAL = /\b(GmbH|AG|KG|KGaA|SE|mbH|OHG|e\.\s?K\.|Ltd\.?|Limited|LLC|Inc\.?|Corp\.?|Corporation|S\.?\s?p\.?\s?A\.?|S\.?\s?r\.?\s?l\.?|SAS|S\.?A\.?S\.?|S\.?A\.?|B\.?\s?V\.?|N\.?\s?V\.?|Sp\.?\s?z\s?o\.?\s?o\.?|s\.?r\.?o\.?|a\.?s\.?|Oy|AB|A\/S|Group|Gruppe|Werke|Holding|Technologies|Technology|Systems|Systeme)\b/i;
  const ROLE = /\b(manager|management|engineer|engineering|director|head|leiter|leiterin|leitung|geschäftsführ\w*|gesch\.?\s?f\.?|ceo|cto|cfo|coo|cso|sales|vertrieb\w*|account|consultant|berater\w*|ingenieur\w*|techni\w*|marketing|einkauf|purchas\w*|owner|inhaber\w*|president|präsident|vp|vice|specialist|spezialist\w*|referent\w*|assistant|assistenz|projekt\w*|project|developer|entwickl\w*|product|produkt\w*|team\s?lead\w*|partner|founder|gründer\w*|prokurist\w*|application|anwendung\w*|service|support|key)\b/i;
  const FREEMAIL = /^(gmail|googlemail|outlook|hotmail|live|yahoo|gmx|web|t-online|icloud|me|aol|mail|freenet|posteo|proton|protonmail)\./i;
  const clean = (s) => String(s || '').replace(/[|_~«»•·]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  const dom = (u) => String(u || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0];
  const base = (d) => String(d || '').split('.').slice(0, -1).join('.').replace(/^www\./, '');
  const cap = (s) => s.replace(/(^|[\s-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());

  function parse(text) {
    const lines = String(text || '').split(/\r?\n/).map(clean).filter((l) => l.length > 1);
    const all = lines.join('\n'), o = { name: '', title: '', company: '', email: '', phone: '', mobile: '', web: '', addr: '' };
    const em = all.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i); if (em) o.email = em[0].toLowerCase().replace(/[.,;]+$/, '');
    const noMail = all.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, ' ');
    const wb = noMail.match(/\b(?:https?:\/\/)?(?:www\.)[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s]*)?/i) || noMail.match(/\b[a-z0-9-]{3,}\.(?:de|com|eu|net|org|it|fr|at|ch|nl|be|pl|cz|es|se|dk|fi|pt|cn|in|tr|io|co\.uk|com\.cn)\b/i);
    if (wb) o.web = wb[0].replace(/[.,;]+$/, '');
    else if (o.email && !FREEMAIL.test(o.email.split('@')[1])) o.web = 'www.' + o.email.split('@')[1];
    const used = new Set();
    for (const l of lines) {
      if (/fax/i.test(l) && !/mobil|mobile|tel/i.test(l)) continue;
      const nums = l.match(/(?:\+|00)?\d[\d\s()/.-]{6,}\d/g) || [];
      for (const n of nums) {
        const digits = n.replace(/\D/g, ''); if (digits.length < 7 || digits.length > 16) continue;
        if (/^\d{5}$/.test(n.trim())) continue;
        const v = n.replace(/\s{2,}/g, ' ').trim();
        if (/mobil|mobile|cell|handy|\bm\s?[.:]/i.test(l) || /^(\+|00)?\s?49\s?\(?0?\)?\s?1[5-7]/.test(v) || /^01[5-7]/.test(v)) { if (!o.mobile) o.mobile = v; }
        else if (!o.phone) o.phone = v;
        used.add(l);
      }
    }
    const addr = lines.filter((l) => /\b\d{4,5}\s+\p{L}{3,}/u.test(l) || /(straße|strasse|str\.|weg|allee|platz|ring|gasse|street|road|avenue|via|rue)\b/i.test(l));
    if (addr.length) { o.addr = addr.slice(0, 2).join(', '); addr.forEach((l) => used.add(l)); }
    const co = lines.find((l) => LEGAL.test(l) && !/@/.test(l) && l.length < 70); if (co) { o.company = co; used.add(co); }
    const ti = lines.find((l) => ROLE.test(l) && !used.has(l) && !/@|www\.|\d{4,}/.test(l) && l.length < 70); if (ti) { o.title = ti; used.add(ti); }
    const isName = (l) => !used.has(l) && !/[@\d]|www\.|https?:/i.test(l) && /^[\p{L}][\p{L}.'’-]*(?:\s+[\p{L}][\p{L}.'’-]*){1,3}$/u.test(l) && l.length >= 5 && l.length <= 40 && !LEGAL.test(l) && !ROLE.test(l);
    const ti_i = ti ? lines.indexOf(ti) : -1;
    let nm = ti_i > 0 && isName(lines[ti_i - 1]) ? lines[ti_i - 1] : (ti_i >= 0 && isName(lines[ti_i + 1] || '') ? lines[ti_i + 1] : lines.find(isName));
    if (nm) { o.name = /^[\p{Lu}\s.'’-]+$/u.test(nm) ? cap(nm.toLowerCase()) : nm; used.add(nm); }
    if (!o.name && o.email) { const lp = o.email.split('@')[0]; if (/^[a-z]+[._-][a-z]+$/i.test(lp)) o.name = cap(lp.replace(/[._-]/, ' ')); }
    if (!o.company && o.email && !FREEMAIL.test(o.email.split('@')[1])) o.company = '';
    return o;
  }
  // list = da-list entries {n,s,w,...}; returns the exhibitor the card belongs to, or null
  function matchExhibitor(o, raw, list) {
    if (!Array.isArray(list) || !list.length) return null;
    const d = dom(o.web) || (o.email ? o.email.split('@')[1] : '');
    if (d && !FREEMAIL.test(d)) {
      const b = base(d);
      const hit = list.find((e) => e.w && (dom(e.w) === d || base(dom(e.w)) === b));
      if (hit) return hit;
    }
    const txt = ' ' + String(raw || '').toLowerCase().replace(/\s+/g, ' ') + ' ' + String(o.company || '').toLowerCase() + ' ';
    let best = null;
    for (const e of list) {
      const n = String(e.n || '').toLowerCase().replace(/\s+(gmbh|ag|kg|se|s\.p\.a\.|srl|ltd|inc|co\.? kg|& co\.? kg|group|gmbh & co\. kg)\.?$/i, '').trim();
      if (n.length < 4) continue;
      const i = txt.indexOf(n); if (i < 0) continue;
      if (/[a-z0-9]/.test(txt[i - 1] || '') || /[a-z0-9]/.test(txt[i + n.length] || '')) continue;
      if (!best || n.length > best[0]) best = [n.length, e];
    }
    return best ? best[1] : null;
  }
  const ve = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1');
  function vcard(c, fair) {
    const parts = String(c.name || '').trim().split(/\s+/), last = parts.length > 1 ? parts.pop() : (parts[0] || ''), first = parts.join(' ');
    const note = [fair ? 'Met at ' + fair : '', c.stand ? 'Stand ' + c.stand : '', c.note || ''].filter(Boolean).join(' · ');
    return ['BEGIN:VCARD', 'VERSION:3.0', 'N:' + ve(last) + ';' + ve(first) + ';;;', 'FN:' + ve(c.name || c.company || c.email || 'Contact'),
      c.company ? 'ORG:' + ve(c.company) : '', c.title ? 'TITLE:' + ve(c.title) : '', c.email ? 'EMAIL;TYPE=INTERNET,WORK:' + ve(c.email) : '',
      c.phone ? 'TEL;TYPE=WORK,VOICE:' + ve(c.phone) : '', c.mobile ? 'TEL;TYPE=CELL:' + ve(c.mobile) : '',
      c.web ? 'URL:' + ve(/^https?:/i.test(c.web) ? c.web : 'https://' + c.web.replace(/^www\./i, 'www.')) : '', c.addr ? 'ADR;TYPE=WORK:;;' + ve(c.addr) + ';;;;' : '',
      note ? 'NOTE:' + ve(note) : '', 'END:VCARD'].filter(Boolean).join('\r\n') + '\r\n';
  }
  window.CARD = { ocr, parse, matchExhibitor, vcard };
})();
