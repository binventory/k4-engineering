/* Programme / calendar of the fair assistant demo.
   Shows the events of each fair day (swipe between days), event details with speakers and topic,
   .ics export, "save to notebook" and "ask the assistant". Data: META.program = {note, events:[...]}.
   index.html calls CAL.init({FAIR,L,T,esc,meta,showMap,ask}) once the fair data has loaded. */
(function () {
  'use strict';
  const CT = {
    de: { prog: 'Programm', none: 'Für diesen Tag sind keine Veranstaltungen eingetragen.', room: 'Ort', spk: 'Referenten', topic: 'Inhalt', askq: 'Erkläre mir kurz den Programmpunkt „{t}“ ({d}, {s} Uhr): worum geht es und für wen ist er interessant?', ask: 'Assistent fragen', ics: 'In Kalender speichern', save: 'Merken', saved: 'Gemerkt', now: 'Jetzt', next: 'Als Nächstes', back: 'Zurück', hint: 'Zum nächsten Tag wischen', map: 'Hallenplan', ty: { talk: 'Vortrag', workshop: 'Workshop', panel: 'Podium', social: 'Networking', poster: 'Poster', opening: 'Eröffnung' } },
    en: { prog: 'Programme', none: 'No events are listed for this day.', room: 'Location', spk: 'Speakers', topic: 'About', askq: 'Briefly explain the session “{t}” ({d}, {s}): what is it about and who is it for?', ask: 'Ask the assistant', ics: 'Add to calendar', save: 'Save', saved: 'Saved', now: 'Now', next: 'Up next', back: 'Back', hint: 'Swipe for the next day', map: 'Hall plan', ty: { talk: 'Talk', workshop: 'Workshop', panel: 'Panel', social: 'Networking', poster: 'Poster', opening: 'Opening' } },
    ar: { prog: 'البرنامج', none: 'لا توجد فعاليات مسجّلة لهذا اليوم.', room: 'المكان', spk: 'المتحدثون', topic: 'عن الجلسة', askq: 'اشرح لي باختصار فقرة البرنامج «{t}» ({d}، {s}): ما موضوعها ولمن تناسب؟', ask: 'اسأل المساعد', ics: 'إضافة إلى التقويم', save: 'حفظ', saved: 'تم الحفظ', now: 'الآن', next: 'التالي', back: 'رجوع', hint: 'اسحب لليوم التالي', map: 'خريطة القاعات', ty: { talk: 'محاضرة', workshop: 'ورشة عمل', panel: 'نقاش', social: 'لقاء', poster: 'ملصقات', opening: 'الافتتاح' } },
    tr: { prog: 'Program', none: 'Bu gün için etkinlik girilmemiş.', room: 'Yer', spk: 'Konuşmacılar', topic: 'İçerik', askq: '“{t}” oturumunu ({d}, {s}) kısaca açıkla: konusu ne ve kimler için uygun?', ask: 'Asistana sor', ics: 'Takvime ekle', save: 'Kaydet', saved: 'Kaydedildi', now: 'Şimdi', next: 'Sıradaki', back: 'Geri', hint: 'Sonraki gün için kaydırın', map: 'Salon planı', ty: { talk: 'Konuşma', workshop: 'Çalıştay', panel: 'Panel', social: 'Networking', poster: 'Poster', opening: 'Açılış' } },
    fr: { prog: 'Programme', none: "Aucun événement n'est prévu ce jour-là.", room: 'Lieu', spk: 'Intervenants', topic: 'Contenu', askq: 'Explique-moi brièvement la session « {t} » ({d}, {s}) : de quoi s’agit-il et pour qui ?', ask: "Demander à l'assistant", ics: 'Ajouter au calendrier', save: 'Garder', saved: 'Gardé', now: 'En cours', next: 'À suivre', back: 'Retour', hint: 'Balayez pour le jour suivant', map: 'Plan des halls', ty: { talk: 'Conférence', workshop: 'Atelier', panel: 'Table ronde', social: 'Networking', poster: 'Posters', opening: 'Ouverture' } },
    it: { prog: 'Programma', none: 'Nessun evento previsto per questo giorno.', room: 'Luogo', spk: 'Relatori', topic: 'Contenuto', askq: 'Spiegami brevemente la sessione «{t}» ({d}, {s}): di cosa tratta e per chi è utile?', ask: "Chiedi all'assistente", ics: 'Aggiungi al calendario', save: 'Salva', saved: 'Salvato', now: 'Ora', next: 'Prossimo', back: 'Indietro', hint: 'Scorri per il giorno successivo', map: 'Mappa dei padiglioni', ty: { talk: 'Intervento', workshop: 'Workshop', panel: 'Tavola rotonda', social: 'Networking', poster: 'Poster', opening: 'Apertura' } },
    es: { prog: 'Programa', none: 'No hay eventos para este día.', room: 'Lugar', spk: 'Ponentes', topic: 'Contenido', askq: 'Explícame brevemente la sesión «{t}» ({d}, {s}): ¿de qué trata y a quién le interesa?', ask: 'Preguntar al asistente', ics: 'Añadir al calendario', save: 'Guardar', saved: 'Guardado', now: 'Ahora', next: 'A continuación', back: 'Volver', hint: 'Desliza para el día siguiente', map: 'Plano de pabellones', ty: { talk: 'Charla', workshop: 'Taller', panel: 'Mesa redonda', social: 'Networking', poster: 'Pósteres', opening: 'Apertura' } },
    pl: { prog: 'Program', none: 'Brak wydarzeń na ten dzień.', room: 'Miejsce', spk: 'Prelegenci', topic: 'Treść', askq: 'Wyjaśnij krótko punkt programu „{t}” ({d}, {s}): o czym jest i dla kogo?', ask: 'Zapytaj asystenta', ics: 'Dodaj do kalendarza', save: 'Zapisz', saved: 'Zapisano', now: 'Teraz', next: 'Następne', back: 'Wstecz', hint: 'Przesuń, aby zobaczyć następny dzień', map: 'Plan hal', ty: { talk: 'Prelekcja', workshop: 'Warsztat', panel: 'Panel', social: 'Networking', poster: 'Plakaty', opening: 'Otwarcie' } },
    ru: { prog: 'Программа', none: 'На этот день мероприятий нет.', room: 'Место', spk: 'Докладчики', topic: 'О чём', askq: 'Кратко объясни пункт программы «{t}» ({d}, {s}): о чём он и для кого?', ask: 'Спросить ассистента', ics: 'Добавить в календарь', save: 'Сохранить', saved: 'Сохранено', now: 'Сейчас', next: 'Далее', back: 'Назад', hint: 'Проведите для следующего дня', map: 'План павильонов', ty: { talk: 'Доклад', workshop: 'Воркшоп', panel: 'Панель', social: 'Нетворкинг', poster: 'Постеры', opening: 'Открытие' } },
    zh: { prog: '日程', none: '当天没有安排活动。', room: '地点', spk: '演讲嘉宾', topic: '内容', askq: '请简要介绍日程项目“{t}”（{d}，{s}）：主要讲什么，适合哪些人？', ask: '询问助手', ics: '添加到日历', save: '收藏', saved: '已收藏', now: '进行中', next: '接下来', back: '返回', hint: '滑动查看下一天', map: '展厅平面图', ty: { talk: '演讲', workshop: '工作坊', panel: '论坛', social: '交流', poster: '海报', opening: '开幕' } }
  };
  let DA = null, EV = [], DAYS = [], CUR = 0, VIEW = 'list', DETAIL = null, TOP = {}, SAVED = new Set(), KEY = '';
  const $ = (id) => document.getElementById(id);
  const t = (k) => ((CT[DA.L] && CT[DA.L][k]) || CT.en[k] || '');
  const tyl = (k) => ((CT[DA.L] && CT[DA.L].ty && CT[DA.L].ty[k]) || CT.en.ty[k] || k);
  const esc = (s) => DA.esc(s);
  const rtl = () => DA.L === 'ar';
  const dt = (date, o) => { try { return new Intl.DateTimeFormat(DA.L, Object.assign({ timeZone: 'UTC' }, o)).format(new Date(date + 'T12:00:00Z')); } catch (e) { return date; } };
  const mins = (s) => { const p = String(s).split(':'); return (+p[0]) * 60 + (+p[1]); };
  const hm = (m) => String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  const endOf = (e) => e.end || hm(mins(e.start) + 45);
  const spk = (e) => (e.speakers || []).map((s) => s.name).join(', ');
  const hallOf = (room) => { const m = /\b(?:Halle|Hall)\s*(\d)\b/i.exec(room || ''); return m ? m[1] : ''; };
  const initials = (n) => String(n).replace(/\b(?:Dr|Prof|Dipl|Ing|M\.?Sc|B\.?Sc)\.?(?=\s)/gi, '').trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
  function nowInfo() { const n = new Date(), p = (x) => String(x).padStart(2, '0'); return { today: n.getFullYear() + '-' + p(n.getMonth() + 1) + '-' + p(n.getDate()), m: n.getHours() * 60 + n.getMinutes() }; }

  // ---------- views ----------
  function card(e, info, nextId) {
    const live = e.date === info.today && mins(e.start) <= info.m && info.m < mins(endOf(e));
    return '<button type="button" class="cev" data-id="' + esc(e.id) + '" data-ty="' + esc(e.type) + '"><span class="ct"><b>' + esc(e.start) + '</b><small>' + esc(endOf(e)) + '</small></span><span class="cb"><span><span class="cty">' + esc(tyl(e.type)) + '</span>' +
      (live ? '<span class="cnow">' + esc(t('now')) + '</span>' : (e.id === nextId ? '<span class="cnow nx">' + esc(t('next')) + '</span>' : '')) + '</span><strong>' + esc(e.title) + '</strong>' +
      (e.room ? '<small>📍 ' + esc(e.room) + '</small>' : '') + (e.speakers && e.speakers.length ? '<small>🎤 ' + esc(spk(e)) + '</small>' : '') + '</span><span class="cch">›</span></button>';
  }
  function listHtml() {
    const info = nowInfo(), nx = EV.filter((e) => e.date === info.today && mins(e.start) > info.m)[0], nextId = nx && nx.id, multi = DAYS.length > 1;
    const tabs = DAYS.map((d, i) => '<button type="button" role="tab" data-i="' + i + '" class="' + (i === CUR ? 'on' : '') + '" aria-selected="' + (i === CUR) + '"><b>' + esc(dt(d, { weekday: 'short' })) + '</b><span>' + esc(dt(d, { day: 'numeric', month: 'numeric' })) + '</span></button>').join('');
    const panes = DAYS.map((d, i) => '<section class="cpane" data-i="' + i + '"><h3>' + esc(dt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })) + '</h3>' +
      (EV.filter((e) => e.date === d).map((e) => card(e, info, nextId)).join('') || '<p class="cnone">' + esc(t('none')) + '</p>') + '</section>').join('');
    const note = DA.meta().program.note;
    return '<div class="ctabs">' + (multi ? '<button type="button" class="cnav" data-nav="-1" aria-label="‹">‹</button>' : '') + '<div class="cdays" role="tablist">' + tabs + '</div>' + (multi ? '<button type="button" class="cnav" data-nav="1" aria-label="›">›</button>' : '') + '</div>' +
      '<div class="cpanes">' + panes + '</div>' + (multi ? '<p class="chint">' + esc(t('hint')) + '</p>' : '') + (note ? '<p class="cnote">ℹ️ ' + esc(note) + '</p>' : '');
  }
  function detailHtml(e) {
    const hl = hallOf(e.room), lay = DA.meta().layout, hasMap = hl && lay && (lay.halls || []).some((h) => h.id === hl), saved = SAVED.has(e.id);
    return '<button type="button" class="cback" data-a="back">‹ ' + esc(t('back')) + '</button><article class="cdet" data-ty="' + esc(e.type) + '"><span class="cty">' + esc(tyl(e.type)) + '</span><h3>' + esc(e.title) + '</h3>' +
      '<p class="cm">📅 ' + esc(dt(e.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })) + '<br>🕒 ' + esc(e.start) + ' – ' + esc(endOf(e)) + '</p>' +
      (e.room ? '<p class="cm">📍 <b>' + esc(e.room) + '</b> ' + (hasMap ? '<button type="button" class="act" data-a="map" data-h="' + esc(hl) + '">' + esc(t('map')) + '</button>' : '') + '</p>' : '') +
      (e.speakers && e.speakers.length ? '<h4>' + esc(t('spk')) + '</h4><ul class="csp">' + e.speakers.map((s) => '<li><span class="av">' + esc(initials(s.name)) + '</span><span><b>' + esc(s.name) + '</b>' + ([s.role, s.company].filter(Boolean).length ? '<br><small>' + [s.role, s.company].filter(Boolean).map(esc).join(' · ') + '</small>' : '') + '</span></li>').join('') + '</ul>' : '') +
      (e.desc ? '<h4>' + esc(t('topic')) + '</h4><p>' + esc(e.desc) + '</p>' : '') +
      '<div class="cact"><button type="button" class="act pri" data-a="ask">💬 ' + esc(t('ask')) + '</button><button type="button" class="act" data-a="ics">📅 ' + esc(t('ics')) + '</button>' + (window.NB ? '<button type="button" class="act" data-a="save"' + (saved ? ' disabled' : '') + '>' + (saved ? '✓ ' + esc(t('saved')) : '☆ ' + esc(t('save'))) + '</button>' : '') + '</div></article>' +
      (DA.meta().program.note ? '<p class="cnote">ℹ️ ' + esc(DA.meta().program.note) + '</p>' : '');
  }
  function render() {
    const box = $('calbox'); box.innerHTML = VIEW === 'detail' && DETAIL ? detailHtml(DETAIL) : listHtml();
    if (VIEW === 'list') {
      const el = box.querySelector('.cpanes'); let tm;
      goDay(CUR, false);
      box.querySelectorAll('.cpane').forEach((p) => { if (TOP[p.dataset.i]) p.scrollTop = TOP[p.dataset.i]; });
      el.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(() => { const i = Math.round(Math.abs(el.scrollLeft) / Math.max(1, el.clientWidth)); if (i !== CUR && i < DAYS.length) { CUR = i; syncTabs(); } }, 60); }, { passive: true });
    }
  }
  function syncTabs() { document.querySelectorAll('#cal .cdays button').forEach((b) => { const on = +b.dataset.i === CUR; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); if (on) b.scrollIntoView({ inline: 'center', block: 'nearest' }); }); }
  function goDay(i, smooth) {
    CUR = Math.max(0, Math.min(DAYS.length - 1, i)); const el = document.querySelector('#cal .cpanes'); if (!el) return;
    el.scrollTo({ left: (rtl() ? -1 : 1) * CUR * el.clientWidth, behavior: smooth ? 'smooth' : 'auto' }); syncTabs();
  }
  function open() { VIEW = 'list'; DETAIL = null; const d = $('cal'); if (!d.open) d.showModal(); render(); }

  // ---------- actions ----------
  const icsEsc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const fold = (l) => { const o = []; while (l.length > 73) { o.push(l.slice(0, 73)); l = ' ' + l.slice(73); } o.push(l); return o.join('\r\n'); };
  function ics(e) {
    const d = e.date.replace(/-/g, ''), tm = (x) => x.replace(':', '') + '00', m = DA.meta(), now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    const sp = (e.speakers || []).map((s) => [s.name, s.role, s.company].filter(Boolean).join(', ')).join('; ');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//K4-Engineering//Fair Assistant Demo//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', 'UID:' + e.id + '-' + DA.FAIR + '@k4-engineering.eu', 'DTSTAMP:' + now, 'DTSTART:' + d + 'T' + tm(e.start), 'DTEND:' + d + 'T' + tm(endOf(e)),
      'SUMMARY:' + icsEsc(e.title), 'LOCATION:' + icsEsc([e.room, m.venue].filter(Boolean).join(', ')), 'DESCRIPTION:' + icsEsc([m.name, sp ? t('spk') + ': ' + sp : '', e.desc].filter(Boolean).join('\n')), 'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsEsc(e.title), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'];
    return lines.map(fold).join('\r\n') + '\r\n';
  }
  function deliver(name, blob) {
    const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    try { const f = new File([blob], name, { type: blob.type }); if (ios && navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: name }).catch(() => {}); return; } } catch (x) { /* fall through */ }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 5000);
  }
  function onClick(ev) {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.classList.contains('cev')) { const e = EV.find((x) => x.id === b.dataset.id); if (e) { document.querySelectorAll('#cal .cpane').forEach((p) => { TOP[p.dataset.i] = p.scrollTop; }); VIEW = 'detail'; DETAIL = e; render(); $('cal').scrollTop = 0; } return; }
    if (b.closest('.cdays')) return goDay(+b.dataset.i, true);
    if (b.dataset.nav) return goDay(CUR + +b.dataset.nav, true);
    const a = b.dataset.a; if (!a || !DETAIL) return;
    if (a === 'back') { VIEW = 'list'; render(); }
    else if (a === 'map') DA.showMap([b.dataset.h]);
    else if (a === 'ics') deliver('Programm_' + DETAIL.date + '_' + DETAIL.start.replace(':', '') + '.ics', new Blob([ics(DETAIL)], { type: 'text/calendar;charset=utf-8' }));
    else if (a === 'save' && window.NB) {
      const e = DETAIL; NB.addNote('📅 ' + dt(e.date, { weekday: 'short', day: 'numeric', month: 'short' }) + ' ' + e.start + '–' + endOf(e) + ' · ' + e.title + (e.room ? ' · ' + e.room : '') + (spk(e) ? ' · ' + spk(e) : ''), 'event');
      SAVED.add(e.id); try { localStorage.setItem(KEY, JSON.stringify([...SAVED])); } catch (x) { /* ignore */ } render();
    } else if (a === 'ask') {
      const e = DETAIL; $('cal').close(); DA.ask(t('askq').replace('{t}', e.title).replace('{d}', dt(e.date, { weekday: 'short', day: 'numeric', month: 'short' })).replace('{s}', e.start));
    }
  }
  function css() {
    const s = document.createElement('style');
    s.textContent = '#calbtn .nblab{display:none}@media(min-width:560px){#calbtn .nblab{display:inline}}#cal{width:min(640px,96vw)}#calbox{padding:6px 14px 14px}' +
      '[data-ty=talk]{--tc:var(--ac)}[data-ty=workshop]{--tc:#b25e09}[data-ty=panel]{--tc:#6a3fb5}[data-ty=social]{--tc:#1b7f4c}[data-ty=poster]{--tc:#8a6d00}[data-ty=opening]{--tc:#5d6b7a}' +
      '.ctabs{display:flex;gap:6px;align-items:center;margin:4px 0 8px}.cdays{display:flex;gap:6px;overflow-x:auto;flex:1;scrollbar-width:none;padding:2px}.cdays button{flex:none;font:inherit;display:flex;flex-direction:column;align-items:center;line-height:1.2;min-width:64px;background:var(--bg);color:var(--tx);border:1px solid var(--bd);border-radius:10px;padding:5px 12px;cursor:pointer}.cdays button span{font-size:.78rem;color:var(--mut)}.cdays button.on{background:var(--ac);color:#fff;border-color:var(--ac)}.cdays button.on span{color:#fff;opacity:.9}' +
      '.cnav{font:inherit;font-size:1.3rem;line-height:1;background:none;border:1px solid var(--bd);border-radius:50%;width:34px;height:34px;color:var(--tx);cursor:pointer;flex:none}[dir=rtl] .cnav,[dir=rtl] .cch{transform:scaleX(-1)}' +
      '.cpanes{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain}.cpane{flex:0 0 100%;scroll-snap-align:start;scroll-snap-stop:always;max-height:min(62vh,560px);overflow-y:auto;padding:0 2px 4px}.cpane h3{margin:2px 0 8px;font-size:1rem;color:var(--mut);font-weight:600}.cnone{color:var(--mut)}' +
      '.cev{display:flex;gap:10px;align-items:stretch;width:100%;text-align:start;font:inherit;color:var(--tx);background:var(--card);border:1px solid var(--bd);border-inline-start:4px solid var(--tc);border-radius:12px;padding:9px 10px;margin-bottom:8px;cursor:pointer}.cev:hover{border-color:var(--tc)}.ct{display:flex;flex-direction:column;min-width:46px;font-variant-numeric:tabular-nums}.ct small{color:var(--mut)}.cb{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}.cb small{color:var(--mut)}.cch{align-self:center;color:var(--mut);font-size:1.3rem}' +
      '.cty{display:inline-block;font-size:.68rem;text-transform:uppercase;letter-spacing:.04em;color:#fff;background:var(--tc);border-radius:5px;padding:0 6px;margin-inline-end:6px}.cnow{display:inline-block;font-size:.68rem;font-weight:700;color:#fff;background:#b3261e;border-radius:5px;padding:0 6px}.cnow.nx{background:#1b7f4c}' +
      '.chint,.cnote{font-size:.8rem;color:var(--mut);text-align:center;margin:6px 0 0}.cback{font:inherit;background:none;border:0;color:var(--ac);cursor:pointer;padding:4px 0;font-weight:600}' +
      '.cdet{border:1px solid var(--bd);border-top:4px solid var(--tc);border-radius:12px;padding:12px 14px}.cdet h3{margin:6px 0 4px;font-size:1.2rem}.cdet h4{margin:14px 0 4px;font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}.cdet p{margin:4px 0}.cm{color:var(--tx)}' +
      '.csp{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}.csp li{display:flex;gap:10px;align-items:center}.csp small{color:var(--mut)}.av{flex:none;width:38px;height:38px;border-radius:50%;background:var(--tc);color:#fff;display:grid;place-items:center;font-weight:700;font-size:.85rem}.cact{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.cact .act{font-size:.88rem;padding:6px 14px}';
    document.head.appendChild(s);
  }

  function init(d) {
    DA = d; const p = DA.meta() && DA.meta().program; if (!p || !Array.isArray(p.events) || !p.events.length || $('cal')) return;
    EV = p.events.slice().sort((a, b) => (a.date + ' ' + a.start).localeCompare(b.date + ' ' + b.start)); DAYS = [...new Set(EV.map((e) => e.date))];
    KEY = 'da_cal_' + DA.FAIR; try { SAVED = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (x) { /* ignore */ }
    const today = nowInfo().today, ti = DAYS.indexOf(today); CUR = ti >= 0 ? ti : 0;
    css();
    const tools = document.querySelector('.tools'), btn = document.createElement('button'); btn.type = 'button'; btn.id = 'calbtn'; btn.title = t('prog'); btn.innerHTML = '📅<span class="nblab"> ' + esc(t('prog')) + '</span>';
    tools.insertBefore(btn, $('nbbtn') || tools.firstChild);
    const dlg = document.createElement('dialog'); dlg.id = 'cal'; dlg.innerHTML = '<div class="dh"><b>📅 ' + esc(t('prog')) + '</b><button type="button" id="calc">' + esc(DA.T.close) + '</button></div><div id="calbox"></div>'; document.body.appendChild(dlg);
    btn.onclick = open; $('calc').onclick = () => dlg.close(); dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    $('calbox').addEventListener('click', onClick);
    dlg.addEventListener('keydown', (e) => { if (VIEW === 'list' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); goDay(CUR + ((e.key === 'ArrowRight') !== rtl() ? 1 : -1), true); } });
  }
  function openEvent(id) { const e = EV.find((x) => x.id === id); if (!e) return open(); const d = $('cal'); VIEW = 'detail'; DETAIL = e; CUR = Math.max(0, DAYS.indexOf(e.date)); if (!d.open) d.showModal(); render(); d.scrollTop = 0; }
  window.CAL = { init, open, openEvent };
})();
