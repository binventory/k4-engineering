/* Visitor notebook for the fair assistant demo.
   Everything stays in the visitor's browser (localStorage for text, IndexedDB for photos). Nothing is sent anywhere.
   Exposes window.NB; index.html calls NB.init({FAIR,L,T,esc,safeUrl,meta,showMap}). */
(function () {
  'use strict';
  const NBT = {
    de: { nb: 'Notizbuch', title: 'Mein Messe-Notizbuch', priv: 'Bleibt nur auf Ihrem Gerät – es wird nichts auf einem Server gespeichert.', addco: 'Firma hinzufügen', search: 'Firma suchen oder eintippen …', empty: 'Noch nichts gespeichert. Merken Sie Firmen aus den Antworten (☆) oder fügen Sie Notizen und Fotos hinzu.', contact: 'Kontakt (Name, E-Mail, Telefon)', prods: 'Produkte, die mir gefallen', note: 'Notiz', photo: 'Foto / Visitenkarte', addnote: 'Notiz speichern', notePh: 'Eigene Notiz …', gen: 'Allgemeine Notizen & Fotos', dl: 'Zusammenfassung (HTML/PDF)', dlcsv: 'Tabelle (CSV)', clear: 'Alles löschen', clearq: 'Alle Notizen und Fotos auf diesem Gerät löschen?', rmq: 'Eintrag samt Fotos entfernen?', save: 'Merken', saved: 'Gemerkt', saveans: 'Antwort speichern', inst: 'App installieren', insti: 'Zum Installieren: Teilen-Symbol → „Zum Home-Bildschirm“.', off: 'Offline – der Chat braucht Internet. Hallenplan und Notizbuch funktionieren weiter.', sumt: 'Messe-Zusammenfassung', cos: 'Firmen', hall: 'Halle', created: 'Erstellt am', print: 'Drucken / als PDF speichern', other: 'Weitere Notizen & Fotos', ftr: 'Lokal auf dem Gerät erstellt mit dem Besucher-Assistenten (Demo von K4-Engineering). Keine Speicherung auf einem Server.' },
    en: { nb: 'Notebook', title: 'My fair notebook', priv: 'Stays on your device only – nothing is stored on a server.', addco: 'Add company', search: 'Search or type a company …', empty: 'Nothing saved yet. Save companies from the answers (☆) or add notes and photos.', contact: 'Contact (name, email, phone)', prods: 'Products I like', note: 'Note', photo: 'Photo / business card', addnote: 'Save note', notePh: 'Your own note …', gen: 'General notes & photos', dl: 'Summary (HTML/PDF)', dlcsv: 'Table (CSV)', clear: 'Delete all', clearq: 'Delete all notes and photos on this device?', rmq: 'Remove this entry and its photos?', save: 'Save', saved: 'Saved', saveans: 'Save answer', inst: 'Install app', insti: 'To install: tap Share → “Add to Home Screen”.', off: 'Offline – the chat needs internet. Hall plan and notebook still work.', sumt: 'Fair summary', cos: 'Companies', hall: 'Hall', created: 'Created', print: 'Print / save as PDF', other: 'More notes & photos', ftr: 'Created locally on your device with the visitor assistant (demo by K4-Engineering). Nothing is stored on a server.' },
    ar: { nb: 'دفتر الملاحظات', title: 'دفتر ملاحظاتي في المعرض', priv: 'يبقى على جهازك فقط – لا يُحفظ شيء على أي خادم.', addco: 'إضافة شركة', search: 'ابحث عن شركة أو اكتب اسمها …', empty: 'لا يوجد شيء محفوظ بعد. احفظ الشركات من الإجابات (☆) أو أضف ملاحظات وصوراً.', contact: 'جهة الاتصال (الاسم، البريد، الهاتف)', prods: 'المنتجات التي أعجبتني', note: 'ملاحظة', photo: 'صورة / بطاقة عمل', addnote: 'حفظ الملاحظة', notePh: 'ملاحظتك …', gen: 'ملاحظات وصور عامة', dl: 'الملخص (HTML/PDF)', dlcsv: 'جدول (CSV)', clear: 'حذف الكل', clearq: 'حذف كل الملاحظات والصور من هذا الجهاز؟', rmq: 'إزالة هذا العنصر مع صوره؟', save: 'حفظ', saved: 'تم الحفظ', saveans: 'حفظ الإجابة', inst: 'تثبيت التطبيق', insti: 'للتثبيت: اضغط مشاركة ← «إضافة إلى الشاشة الرئيسية».', off: 'غير متصل – الدردشة تحتاج إنترنت. خريطة القاعات والدفتر يعملان.', sumt: 'ملخص المعرض', cos: 'الشركات', hall: 'القاعة', created: 'تاريخ الإنشاء', print: 'طباعة / حفظ PDF', other: 'ملاحظات وصور أخرى', ftr: 'أُنشئ محلياً على جهازك بمساعد الزوار (عرض تجريبي من K4-Engineering). لا يوجد تخزين على خادم.' },
    tr: { nb: 'Not defteri', title: 'Fuar not defterim', priv: 'Yalnızca cihazınızda kalır – hiçbir şey sunucuda saklanmaz.', addco: 'Firma ekle', search: 'Firma arayın veya yazın …', empty: 'Henüz bir şey kaydedilmedi. Yanıtlardan firmaları kaydedin (☆) veya not ve fotoğraf ekleyin.', contact: 'İletişim (ad, e-posta, telefon)', prods: 'Beğendiğim ürünler', note: 'Not', photo: 'Fotoğraf / kartvizit', addnote: 'Notu kaydet', notePh: 'Kendi notunuz …', gen: 'Genel notlar ve fotoğraflar', dl: 'Özet (HTML/PDF)', dlcsv: 'Tablo (CSV)', clear: 'Tümünü sil', clearq: 'Bu cihazdaki tüm notlar ve fotoğraflar silinsin mi?', rmq: 'Bu kayıt ve fotoğrafları kaldırılsın mı?', save: 'Kaydet', saved: 'Kaydedildi', saveans: 'Yanıtı kaydet', inst: 'Uygulamayı yükle', insti: 'Yüklemek için: Paylaş → “Ana Ekrana Ekle”.', off: 'Çevrimdışı – sohbet internet gerektirir. Salon planı ve not defteri çalışmaya devam eder.', sumt: 'Fuar özeti', cos: 'Firmalar', hall: 'Salon', created: 'Oluşturulma', print: 'Yazdır / PDF olarak kaydet', other: 'Diğer notlar ve fotoğraflar', ftr: 'Ziyaretçi asistanıyla cihazınızda yerel olarak oluşturuldu (K4-Engineering demosu). Sunucuda saklanmaz.' },
    fr: { nb: 'Carnet', title: 'Mon carnet de salon', priv: "Reste uniquement sur votre appareil – rien n'est enregistré sur un serveur.", addco: 'Ajouter une entreprise', search: 'Chercher ou saisir une entreprise …', empty: "Rien d'enregistré. Gardez des entreprises depuis les réponses (☆) ou ajoutez notes et photos.", contact: 'Contact (nom, e-mail, téléphone)', prods: "Produits qui m'ont plu", note: 'Note', photo: 'Photo / carte de visite', addnote: 'Enregistrer la note', notePh: 'Votre note …', gen: 'Notes et photos générales', dl: 'Résumé (HTML/PDF)', dlcsv: 'Tableau (CSV)', clear: 'Tout supprimer', clearq: 'Supprimer toutes les notes et photos de cet appareil ?', rmq: 'Supprimer cette entrée et ses photos ?', save: 'Garder', saved: 'Gardé', saveans: 'Garder la réponse', inst: "Installer l'app", insti: "Pour installer : Partager → « Sur l'écran d'accueil ».", off: 'Hors ligne – le chat nécessite Internet. Le plan des halls et le carnet restent disponibles.', sumt: 'Résumé du salon', cos: 'Entreprises', hall: 'Hall', created: 'Créé le', print: 'Imprimer / enregistrer en PDF', other: 'Autres notes et photos', ftr: "Créé localement sur votre appareil avec l'assistant visiteur (démo K4-Engineering). Aucun stockage sur serveur." },
    it: { nb: 'Taccuino', title: 'Il mio taccuino della fiera', priv: 'Resta solo sul tuo dispositivo – nulla viene salvato su un server.', addco: 'Aggiungi azienda', search: "Cerca o scrivi un'azienda …", empty: 'Ancora niente. Salva le aziende dalle risposte (☆) o aggiungi note e foto.', contact: 'Contatto (nome, e-mail, telefono)', prods: 'Prodotti che mi piacciono', note: 'Nota', photo: 'Foto / biglietto da visita', addnote: 'Salva nota', notePh: 'La tua nota …', gen: 'Note e foto generali', dl: 'Riepilogo (HTML/PDF)', dlcsv: 'Tabella (CSV)', clear: 'Elimina tutto', clearq: 'Eliminare tutte le note e le foto su questo dispositivo?', rmq: 'Rimuovere questa voce e le sue foto?', save: 'Salva', saved: 'Salvato', saveans: 'Salva risposta', inst: "Installa l'app", insti: 'Per installare: Condividi → «Aggiungi alla schermata Home».', off: 'Offline – la chat richiede Internet. Mappa dei padiglioni e taccuino funzionano.', sumt: 'Riepilogo della fiera', cos: 'Aziende', hall: 'Padiglione', created: 'Creato il', print: 'Stampa / salva come PDF', other: 'Altre note e foto', ftr: "Creato localmente sul tuo dispositivo con l'assistente visitatori (demo K4-Engineering). Nessun salvataggio su server." },
    es: { nb: 'Cuaderno', title: 'Mi cuaderno de la feria', priv: 'Se queda solo en tu dispositivo: nada se guarda en un servidor.', addco: 'Añadir empresa', search: 'Busca o escribe una empresa …', empty: 'Aún no hay nada. Guarda empresas desde las respuestas (☆) o añade notas y fotos.', contact: 'Contacto (nombre, correo, teléfono)', prods: 'Productos que me gustan', note: 'Nota', photo: 'Foto / tarjeta de visita', addnote: 'Guardar nota', notePh: 'Tu nota …', gen: 'Notas y fotos generales', dl: 'Resumen (HTML/PDF)', dlcsv: 'Tabla (CSV)', clear: 'Borrar todo', clearq: '¿Borrar todas las notas y fotos de este dispositivo?', rmq: '¿Quitar esta entrada y sus fotos?', save: 'Guardar', saved: 'Guardado', saveans: 'Guardar respuesta', inst: 'Instalar app', insti: 'Para instalar: Compartir → «Añadir a pantalla de inicio».', off: 'Sin conexión: el chat necesita internet. El plano y el cuaderno siguen funcionando.', sumt: 'Resumen de la feria', cos: 'Empresas', hall: 'Pabellón', created: 'Creado el', print: 'Imprimir / guardar como PDF', other: 'Otras notas y fotos', ftr: 'Creado localmente en tu dispositivo con el asistente de visitantes (demo de K4-Engineering). No se guarda en ningún servidor.' },
    pl: { nb: 'Notatnik', title: 'Mój notatnik targowy', priv: 'Zostaje tylko na Twoim urządzeniu – nic nie jest zapisywane na serwerze.', addco: 'Dodaj firmę', search: 'Szukaj lub wpisz firmę …', empty: 'Nic jeszcze nie zapisano. Zapisuj firmy z odpowiedzi (☆) lub dodaj notatki i zdjęcia.', contact: 'Kontakt (imię, e-mail, telefon)', prods: 'Produkty, które mi się podobają', note: 'Notatka', photo: 'Zdjęcie / wizytówka', addnote: 'Zapisz notatkę', notePh: 'Twoja notatka …', gen: 'Notatki i zdjęcia ogólne', dl: 'Podsumowanie (HTML/PDF)', dlcsv: 'Tabela (CSV)', clear: 'Usuń wszystko', clearq: 'Usunąć wszystkie notatki i zdjęcia z tego urządzenia?', rmq: 'Usunąć ten wpis wraz ze zdjęciami?', save: 'Zapisz', saved: 'Zapisano', saveans: 'Zapisz odpowiedź', inst: 'Zainstaluj aplikację', insti: 'Aby zainstalować: Udostępnij → „Dodaj do ekranu początkowego”.', off: 'Offline – czat wymaga internetu. Plan hal i notatnik nadal działają.', sumt: 'Podsumowanie targów', cos: 'Firmy', hall: 'Hala', created: 'Utworzono', print: 'Drukuj / zapisz jako PDF', other: 'Pozostałe notatki i zdjęcia', ftr: 'Utworzono lokalnie na Twoim urządzeniu w asystencie odwiedzających (demo K4-Engineering). Bez zapisu na serwerze.' },
    ru: { nb: 'Блокнот', title: 'Мой блокнот выставки', priv: 'Хранится только на вашем устройстве – на сервере ничего не сохраняется.', addco: 'Добавить компанию', search: 'Найдите или введите компанию …', empty: 'Пока пусто. Сохраняйте компании из ответов (☆) или добавляйте заметки и фото.', contact: 'Контакт (имя, e-mail, телефон)', prods: 'Понравившиеся продукты', note: 'Заметка', photo: 'Фото / визитка', addnote: 'Сохранить заметку', notePh: 'Ваша заметка …', gen: 'Общие заметки и фото', dl: 'Сводка (HTML/PDF)', dlcsv: 'Таблица (CSV)', clear: 'Удалить всё', clearq: 'Удалить все заметки и фото на этом устройстве?', rmq: 'Удалить запись вместе с фото?', save: 'Сохранить', saved: 'Сохранено', saveans: 'Сохранить ответ', inst: 'Установить приложение', insti: 'Для установки: «Поделиться» → «На экран “Домой”».', off: 'Нет сети – чату нужен интернет. План павильонов и блокнот работают.', sumt: 'Сводка по выставке', cos: 'Компании', hall: 'Павильон', created: 'Создано', print: 'Печать / сохранить в PDF', other: 'Другие заметки и фото', ftr: 'Создано локально на вашем устройстве в ассистенте посетителя (демо K4-Engineering). Ничего не хранится на сервере.' },
    zh: { nb: '笔记本', title: '我的展会笔记', priv: '仅保存在您的设备上——不会存储到服务器。', addco: '添加公司', search: '搜索或输入公司 …', empty: '还没有内容。可从回答中收藏公司（☆），或添加笔记和照片。', contact: '联系方式（姓名、邮箱、电话）', prods: '我喜欢的产品', note: '笔记', photo: '照片 / 名片', addnote: '保存笔记', notePh: '您的笔记 …', gen: '通用笔记和照片', dl: '汇总（HTML/PDF）', dlcsv: '表格（CSV）', clear: '全部删除', clearq: '删除此设备上的所有笔记和照片？', rmq: '删除此条目及其照片？', save: '收藏', saved: '已收藏', saveans: '保存回答', inst: '安装应用', insti: '安装方法：点击分享 →“添加到主屏幕”。', off: '离线——聊天需要网络。展厅平面图和笔记本仍可使用。', sumt: '展会汇总', cos: '公司', hall: '展厅', created: '创建于', print: '打印 / 保存为 PDF', other: '其他笔记和照片', ftr: '由访客助手在您的设备上本地生成（K4-Engineering 演示）。不存储在服务器上。' }
  };

  let DA = null, LIST = [], BYSTAND = new Map(), DLOPT = '', NB = { co: [], notes: [] }, PH = [], KEY = '', memOnly = false, dip = null;
  const $ = (id) => document.getElementById(id);
  const t = (k) => ((DA && NBT[DA.L] && NBT[DA.L][k]) || NBT.en[k] || '');
  const esc = (s) => DA.esc(s);
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const kOf = (n) => String(n || '').trim().toLowerCase();
  const hallOf = (s) => { const m = /^\s*(\d)\s*[-‐‑–]/.exec(s || ''); return m ? m[1] : ''; };
  const dstr = (ts) => { try { return new Date(ts).toLocaleDateString(DA.L); } catch (e) { return new Date(ts).toISOString().slice(0, 10); } };

  // ---------- storage ----------
  function load() { try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j && Array.isArray(j.co) && Array.isArray(j.notes)) NB = j; } catch (e) { /* storage blocked */ } }
  let st; function persist() { clearTimeout(st); st = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(NB)); } catch (e) { /* ignore */ } }, 200); badge(); }
  const idb = () => new Promise((res, rej) => { try { if (!window.indexedDB) return rej(new Error('no idb')); const r = indexedDB.open('da-nb', 1); r.onupgradeneeded = () => r.result.createObjectStore('p', { keyPath: 'id' }); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); } });
  const tx = (mode, fn) => idb().then((db) => new Promise((res, rej) => { const x = db.transaction('p', mode), r = fn(x.objectStore('p')); x.oncomplete = () => { db.close(); res(r && r.result); }; x.onerror = () => { db.close(); rej(x.error); }; x.onabort = () => { db.close(); rej(x.error); }; }));
  async function loadPhotos() { try { const all = (await tx('readonly', (s) => s.getAll())) || []; PH = all.filter((p) => p.fair === DA.FAIR && p.blob).map((p) => ({ ...p, url: URL.createObjectURL(p.blob) })); } catch (e) { memOnly = true; } }

  async function shrink(file) {
    try {
      const bmp = await createImageBitmap(file), s = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
      const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(bmp.width * s)); c.height = Math.max(1, Math.round(bmp.height * s));
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(bmp, 0, 0, c.width, c.height);
      return await new Promise((r) => c.toBlob((b) => r(b || file), 'image/jpeg', 0.82));
    } catch (e) { return file; }
  }
  async function addPhoto(file, co) {
    if (!/^image\//.test(file.type) || PH.length >= 80) return;
    const blob = await shrink(file), rec = { id: uid(), fair: DA.FAIR, co: co || '', blob, ts: Date.now() };
    PH.push({ ...rec, url: URL.createObjectURL(blob) });
    try { await tx('readwrite', (s) => s.put(rec)); } catch (e) { memOnly = true; }
  }
  function delPhoto(id) { const i = PH.findIndex((p) => p.id === id); if (i < 0) return; URL.revokeObjectURL(PH[i].url); PH.splice(i, 1); tx('readwrite', (s) => s.delete(id)).catch(() => {}); }

  // ---------- data ops ----------
  function addCompany(e) {
    const name = String(e.n || e.name || '').trim().slice(0, 120); if (!name) return null;
    const hit = LIST.find((x) => kOf(x.n) === kOf(name)) || e;
    let c = NB.co.find((x) => x.k === kOf(name));
    if (!c) {
      c = { k: kOf(name), name: hit.n || hit.name || name, stand: String(hit.s || hit.stand || '').slice(0, 20), country: String(hit.c || hit.country || '').slice(0, 40), sector: String(hit.x || hit.sector || '').split('/')[0].trim().slice(0, 70), website: DA.safeUrl(hit.w || hit.website) ? String(hit.w || hit.website).slice(0, 200) : '', contact: '', prods: '', note: '', ts: Date.now() };
      NB.co.push(c); persist(); toast('☆ ' + c.name + ' – ' + t('saved'));
    }
    return c;
  }
  function addNote(text, src) { const x = String(text || '').trim().slice(0, 1500); if (!x) return; NB.notes.unshift({ id: uid(), text: x, ts: Date.now(), src: src || '' }); persist(); }
  const badge = () => { const n = NB.co.length + NB.notes.length, b = $('nbcnt'); if (b) { b.textContent = n || ''; b.style.display = n ? '' : 'none'; } };

  // ---------- chat integration ----------
  function detect(text) {
    const out = new Map(), lc = String(text).toLowerCase(), isW = (ch) => /[a-z0-9À-ɏ]/i.test(ch || '');
    for (const e of LIST) {
      const n = e.n.toLowerCase(); if (n.length < 4) continue;
      const i = lc.indexOf(n); if (i < 0) continue;
      if (isW(lc[i - 1]) || isW(lc[i + n.length])) continue;
      out.set(e.n, e);
    }
    for (const m of String(text).matchAll(/(?:^|[^0-9A-Za-z])([0-9]\s?[-‐‑–]\s?[A-Z]\d{1,3})\b/g)) { const l = BYSTAND.get(m[1].replace(/\s/g, '').replace(/[‐‑–]/, '-')); if (l && l.length === 1) out.set(l[0].n, l[0]); }
    return [...out.values()].slice(0, 6);
  }
  function actions(d, text, q) {
    const a = document.createElement('div'); a.className = 'acts';
    const sb = document.createElement('button'); sb.type = 'button'; sb.className = 'act'; sb.textContent = '☆ ' + t('saveans');
    sb.onclick = () => { addNote((q ? '❓ ' + q + '\n' : '') + text, 'chat'); sb.disabled = true; sb.textContent = '✓ ' + t('saved'); };
    a.appendChild(sb);
    detect(text).forEach((e) => {
      const b = document.createElement('button'), lab = e.n + (e.s ? ' (' + e.s + ')' : ''); b.type = 'button'; b.className = 'act';
      const has = NB.co.some((c) => c.k === kOf(e.n)); b.textContent = (has ? '✓ ' : '☆ ') + lab; b.disabled = has;
      b.onclick = () => { addCompany(e); b.disabled = true; b.textContent = '✓ ' + lab; };
      a.appendChild(b);
    });
    d.appendChild(a);
  }

  // ---------- dialog ----------
  function thumbs(co) { return PH.filter((p) => p.co === co).map((p) => '<span class="th"><img src="' + p.url + '" alt="" data-act="zoom" data-u="' + p.id + '"><button type="button" data-act="rmph" data-id="' + p.id + '" aria-label="' + esc(t('clear')) + '">✕</button></span>').join(''); }
  const photoBtn = (co) => '<label class="nbbtn">📷 ' + esc(t('photo')) + '<input type="file" accept="image/*" multiple hidden data-pco="' + esc(co) + '"></label>';
  function render() {
    const dlg = $('nb'), box = $('nbbox'), top = dlg.scrollTop, lay = (DA.meta() || {}).layout, halls = new Set(((lay && lay.halls) || []).map((h) => h.id));
    let h = '<p class="nbp">🔒 ' + esc(t('priv')) + (memOnly ? ' ⚠' : '') + '</p>' +
      '<div class="nbadd"><input id="nbq" type="text" list="nbdl" maxlength="120" autocomplete="off" placeholder="' + esc(t('search')) + '"><button type="button" id="nbaddb" class="nbbtn pri">＋ ' + esc(t('addco')) + '</button><datalist id="nbdl">' + DLOPT + '</datalist></div>';
    if (!NB.co.length && !NB.notes.length && !PH.length) h += '<p class="nbe">' + esc(t('empty')) + '</p>';
    NB.co.forEach((c) => {
      const hl = hallOf(c.stand), fld = (f, lab, rows) => '<textarea rows="' + rows + '" data-f="' + f + '" data-k="' + esc(c.k) + '" maxlength="2000" placeholder="' + esc(lab) + '" aria-label="' + esc(lab) + '">' + esc(c[f] || '') + '</textarea>';
      h += '<section class="nbc" data-k="' + esc(c.k) + '"><div class="nbh"><b>' + esc(c.name) + '</b><span class="nbx">' + (hl && halls.has(hl) ? '<button type="button" data-act="map" data-h="' + esc(hl) + '">📍</button>' : '') + (c.website ? '<a href="' + esc(c.website) + '" target="_blank" rel="noopener">' + esc(DA.T.more) + '</a>' : '') + '<button type="button" data-act="rm" aria-label="' + esc(DA.T.close) + '">✕</button></span></div>' +
        '<small>' + [c.stand ? DA.T.stand + ' ' + c.stand : '', c.country, c.sector].filter(Boolean).map(esc).join(' · ') + '</small>' +
        fld('contact', t('contact'), 2) + fld('prods', t('prods'), 2) + fld('note', t('note'), 2) +
        '<div class="nbrow">' + thumbs(c.k) + photoBtn(c.k) + '</div></section>';
    });
    h += '<section class="nbc"><div class="nbh"><b>' + esc(t('gen')) + '</b></div><textarea id="nbnt" rows="2" maxlength="1500" placeholder="' + esc(t('notePh')) + '"></textarea><div class="nbrow"><button type="button" id="nbnadd" class="nbbtn">＋ ' + esc(t('addnote')) + '</button>' + thumbs('') + photoBtn('') + '</div>' +
      NB.notes.map((n) => '<div class="nbn"><small>' + esc(dstr(n.ts)) + '</small><button type="button" data-act="rmn" data-id="' + esc(n.id) + '" aria-label="' + esc(t('clear')) + '">✕</button><div>' + esc(n.text) + '</div></div>').join('') + '</section>' +
      '<div class="nbf"><button type="button" class="nbbtn pri" id="nbdl1">⬇ ' + esc(t('dl')) + '</button><button type="button" class="nbbtn" id="nbdl2">⬇ ' + esc(t('dlcsv')) + '</button><button type="button" class="nbbtn" id="nbclr">🗑 ' + esc(t('clear')) + '</button></div>';
    box.innerHTML = h; dlg.scrollTop = top; badge();
  }
  function open() { render(); const d = $('nb'); if (!d.open) d.showModal(); }

  function onClick(e) {
    const b = e.target.closest('[data-act],#nbaddb,#nbnadd,#nbdl1,#nbdl2,#nbclr'); if (!b) return;
    const sec = b.closest('[data-k]'), k = sec && sec.dataset.k, act = b.dataset.act;
    if (b.id === 'nbaddb') { const v = $('nbq').value.trim(); if (v) { addCompany({ n: v }); render(); } return; }
    if (b.id === 'nbnadd') { const v = $('nbnt').value; if (v.trim()) { addNote(v); render(); } return; }
    if (b.id === 'nbdl1') return exportHtml(); if (b.id === 'nbdl2') return exportCsv();
    if (b.id === 'nbclr') { if (confirm(t('clearq'))) clearAll(); return; }
    if (act === 'map') DA.showMap([b.dataset.h]);
    else if (act === 'rm') { const c = NB.co.find((x) => x.k === k); if (!c) return; if ((c.contact || c.prods || c.note || PH.some((p) => p.co === k)) && !confirm(t('rmq'))) return; PH.filter((p) => p.co === k).forEach((p) => delPhoto(p.id)); NB.co = NB.co.filter((x) => x.k !== k); persist(); render(); }
    else if (act === 'rmn') { NB.notes = NB.notes.filter((n) => n.id !== b.dataset.id); persist(); render(); }
    else if (act === 'rmph') { delPhoto(b.dataset.id); render(); }
    else if (act === 'zoom') { const p = PH.find((x) => x.id === b.dataset.u); if (p) window.open(p.url, '_blank'); }
  }
  async function onChange(e) {
    const el = e.target;
    if (el.dataset && el.dataset.pco !== undefined && el.files) { const co = el.dataset.pco; for (const f of el.files) await addPhoto(f, co); render(); }
    else if (el.id === 'nbq') { const v = el.value.trim(); if (v && LIST.some((x) => kOf(x.n) === kOf(v))) { addCompany({ n: v }); render(); } }
  }
  function onInput(e) { const el = e.target; if (el.dataset && el.dataset.f) { const c = NB.co.find((x) => x.k === el.dataset.k); if (c) { c[el.dataset.f] = el.value.slice(0, 2000); persist(); } } }
  function clearAll() { PH.slice().forEach((p) => delPhoto(p.id)); NB = { co: [], notes: [] }; try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } render(); }

  // ---------- export ----------
  const sortedCos = () => NB.co.slice().sort((a, b) => (a.stand ? 0 : 1) - (b.stand ? 0 : 1) || String(a.stand || '').localeCompare(String(b.stand || ''), 'en', { numeric: true }) || a.name.localeCompare(b.name));
  const stamp = () => new Date().toISOString().slice(0, 10);
  function deliver(name, blob) {
    const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    try { const f = new File([blob], name, { type: blob.type }); if (ios && navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: name }).catch(() => {}); return; } } catch (e) { /* fall through */ }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 5000);
  }
  const dataUrl = (b) => new Promise((r) => { const f = new FileReader(); f.onload = () => r(f.result); f.onerror = () => r(''); f.readAsDataURL(b); });
  async function imgs(list) { const u = (await Promise.all(list.map((p) => dataUrl(p.blob)))).filter(Boolean); return u.length ? '<div class="ph">' + u.map((x) => '<img src="' + x + '" alt="">').join('') + '</div>' : ''; }
  async function exportHtml() {
    const m = DA.meta() || {}, cos = sortedCos(), rtl = DA.L === 'ar';
    const fld = (l, v) => (v ? '<p><span class="l">' + esc(l) + '</span><br>' + esc(v).replace(/\n/g, '<br>') + '</p>' : '');
    const rows = cos.map((c) => '<tr><td>' + esc(c.stand || '') + '</td><td><b>' + esc(c.name) + '</b></td><td>' + esc(c.contact || '').replace(/\n/g, '<br>') + '</td></tr>').join('');
    let det = '', cur = null;
    for (const c of cos) {
      const hl = hallOf(c.stand); if (hl !== cur) { cur = hl; det += '<h3>' + esc(hl ? t('hall') + ' ' + hl : '–') + '</h3>'; }
      det += '<article><h4>' + esc(c.name) + '</h4><p class="m">' + [c.stand ? DA.T.stand + ' ' + c.stand : '', c.country, c.sector].filter(Boolean).map(esc).join(' · ') + '</p>' +
        (c.website ? '<p><a href="' + esc(c.website) + '">' + esc(c.website) + '</a></p>' : '') + fld(t('contact'), c.contact) + fld(t('prods'), c.prods) + fld(t('note'), c.note) + (await imgs(PH.filter((p) => p.co === c.k))) + '</article>';
    }
    const gen = PH.filter((p) => p.co === '' || !NB.co.some((c) => c.k === p.co));
    const other = NB.notes.map((n) => '<article><p class="m">' + esc(dstr(n.ts)) + '</p><p>' + esc(n.text).replace(/\n/g, '<br>') + '</p></article>').join('') + (await imgs(gen));
    const css = 'body{font:15px/1.5 system-ui,Segoe UI,Roboto,sans-serif;max-width:820px;margin:0 auto;padding:20px;color:#18212b}h1{margin:0 0 4px;font-size:1.5rem}h2{margin:28px 0 8px;font-size:1.15rem;border-bottom:2px solid ' + (/^#[0-9a-f]{6}$/i.test(m.accent) ? m.accent : '#0b5fa5') + '}h3{margin:20px 0 6px;font-size:1rem;color:#5d6b7a}h4{margin:0 0 2px}article{border:1px solid #dde3ea;border-radius:10px;padding:10px 14px;margin:8px 0;break-inside:avoid}.m{color:#5d6b7a;margin:0 0 6px;font-size:.88rem}.l{font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;color:#5d6b7a}table{border-collapse:collapse;width:100%}td{border-bottom:1px solid #dde3ea;padding:5px 8px;vertical-align:top}.ph img{height:130px;margin:4px 6px 0 0;border-radius:6px;border:1px solid #dde3ea}footer{margin-top:30px;font-size:.78rem;color:#5d6b7a}button{font:inherit;padding:6px 14px;border-radius:8px;border:1px solid #bbb;background:#f4f6f9;cursor:pointer}@media print{button{display:none}body{padding:0}}';
    const html = '<!doctype html><html lang="' + esc(DA.L) + '"' + (rtl ? ' dir="rtl"' : '') + '><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>' + esc(t('sumt') + ' – ' + (m.name || '')) + '</title><style>' + css + '</style></head><body>' +
      '<h1>' + esc(t('sumt')) + '</h1><p class="m"><b>' + esc(m.name || '') + '</b>' + [m.dates, m.venue].filter(Boolean).map((x) => ' · ' + esc(x)).join('') + '<br>' + esc(t('created')) + ' ' + esc(new Date().toLocaleString(DA.L)) + '</p><p><button onclick="print()">🖨 ' + esc(t('print')) + '</button></p>' +
      (cos.length ? '<h2>' + esc(t('cos')) + ' (' + cos.length + ')</h2><table>' + rows + '</table><h2>' + esc(t('hall')) + '</h2>' + det : '') +
      (other ? '<h2>' + esc(t('other')) + '</h2>' + other : '') + '<footer>' + esc(t('ftr')) + '</footer></body></html>';
    deliver('Messe-Notizen_' + DA.FAIR + '_' + stamp() + '.html', new Blob([html], { type: 'text/html' }));
  }
  function exportCsv() {
    const de = DA.L === 'de', head = de ? ['Firma', 'Stand', 'Halle', 'Land', 'Bereich', 'Website', 'Kontakt', 'Produkte', 'Notiz', 'Fotos'] : ['Company', 'Stand', 'Hall', 'Country', 'Sector', 'Website', 'Contact', 'Products', 'Note', 'Photos'];
    const cell = (v) => { let s = String(v == null ? '' : v).replace(/\r?\n/g, ' ⏎ '); if (/^[=+\-@\t]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
    const rows = [head].concat(sortedCos().map((c) => [c.name, c.stand, hallOf(c.stand), c.country, c.sector, c.website, c.contact, c.prods, c.note, PH.filter((p) => p.co === c.k).length]))
      .concat(NB.notes.map((n) => ['— ' + t('gen'), '', '', '', '', '', '', '', n.text, '']));
    deliver('Messe-Notizen_' + DA.FAIR + '_' + stamp() + '.csv', new Blob(['﻿' + rows.map((r) => r.map(cell).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
  }

  // ---------- small helpers: toast, install, list ----------
  let tt; function toast(msg) { let x = $('nbtoast'); if (!x) { x = document.createElement('div'); x.id = 'nbtoast'; x.setAttribute('role', 'status'); document.body.appendChild(x); } x.textContent = msg; x.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => x.classList.remove('on'), 2600); }
  async function loadList() {
    try {
      const r = await fetch('/.netlify/functions/da-list?fair=' + encodeURIComponent(DA.FAIR)); if (!r.ok) return; const j = await r.json(); LIST = Array.isArray(j.list) ? j.list : [];
      BYSTAND = new Map(); LIST.forEach((e) => { if (e.s) { const a = BYSTAND.get(e.s) || []; a.push(e); BYSTAND.set(e.s, a); } });
      DLOPT = LIST.map((e) => '<option value="' + esc(e.n) + '">' + esc(e.s || '') + '</option>').join('');
    } catch (e) { /* offline: notebook still works with typed names */ }
  }
  const standalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  function css() {
    const s = document.createElement('style');
    s.textContent = '#nbbtn .cnt{background:#fff;color:var(--ac);border-radius:999px;padding:0 6px;font-size:.72rem;font-weight:700;margin-inline-start:4px}.nblab{display:none}@media(min-width:560px){.nblab{display:inline}}.tools{flex-wrap:wrap;justify-content:flex-end}' +
      '.acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.act,.nbbtn{font:inherit;font-size:.8rem;background:var(--bg);color:var(--ac);border:1px solid var(--bd);border-radius:999px;padding:3px 11px;cursor:pointer;display:inline-block}.act[disabled]{opacity:.65;cursor:default}.nbbtn.pri{background:var(--ac);color:#fff;border-color:var(--ac)}' +
      '#nb{width:min(760px,96vw)}#nbbox{padding:10px 14px 0}.nbp{margin:0 0 10px;font-size:.82rem;color:var(--mut)}.nbe{color:var(--mut)}.nbadd{display:flex;gap:8px;margin-bottom:12px}.nbadd input{flex:1;min-width:0;font:inherit;padding:8px 10px;border-radius:10px;border:1px solid var(--bd);background:var(--bg);color:var(--tx)}' +
      '.nbc{border:1px solid var(--bd);border-radius:12px;padding:10px 12px;margin-bottom:10px;display:flex;flex-direction:column;gap:6px}.nbh{display:flex;justify-content:space-between;gap:8px;align-items:center}.nbx{display:flex;gap:8px;align-items:center;flex:none}.nbx a{color:var(--ac);font-size:.82rem}.nbx button,.nbn button{font:inherit;background:none;border:1px solid var(--bd);border-radius:8px;color:var(--tx);cursor:pointer;padding:0 7px}.nbc small{color:var(--mut)}' +
      '.nbc textarea,#nbnt{font:inherit;font-size:.9rem;width:100%;padding:7px 9px;border-radius:9px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);resize:vertical}.nbrow{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.th{position:relative;display:inline-block}.th img{height:64px;border-radius:8px;border:1px solid var(--bd);cursor:zoom-in;display:block}.th button{position:absolute;top:-6px;inset-inline-end:-6px;font-size:.7rem;line-height:1;width:20px;height:20px;border-radius:50%;border:0;background:#b3261e;color:#fff;cursor:pointer;padding:0}' +
      '.nbn{display:grid;grid-template-columns:1fr auto;gap:2px 8px;border-top:1px solid var(--bd);padding-top:6px;white-space:pre-wrap;word-wrap:break-word;font-size:.9rem}.nbn div{grid-column:1/-1}.nbf{position:sticky;bottom:0;background:var(--card);border-top:1px solid var(--bd);padding:10px 0;display:flex;flex-wrap:wrap;gap:8px}' +
      '#nbtoast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:#18212b;color:#fff;padding:8px 16px;border-radius:999px;font-size:.88rem;opacity:0;pointer-events:none;transition:.25s;z-index:99;max-width:92vw}#nbtoast.on{opacity:1;transform:translateX(-50%)}';
    document.head.appendChild(s);
  }

  function init(d) {
    DA = d; KEY = 'da_nb_' + DA.FAIR; load(); css();
    const tools = document.querySelector('.tools');
    const nbb = document.createElement('button'); nbb.type = 'button'; nbb.id = 'nbbtn'; nbb.title = t('nb'); nbb.innerHTML = '📒<span class="nblab"> ' + esc(t('nb')) + '</span> <span id="nbcnt" class="cnt"></span>'; tools.insertBefore(nbb, tools.firstChild);
    const ib = document.createElement('button'); ib.type = 'button'; ib.id = 'instbtn'; ib.hidden = true; ib.textContent = '📲'; ib.title = t('inst'); tools.insertBefore(ib, tools.firstChild);
    const dlg = document.createElement('dialog'); dlg.id = 'nb'; dlg.innerHTML = '<div class="dh"><b>' + esc(t('title')) + '</b><button type="button" id="nbc">' + esc(DA.T.close) + '</button></div><div id="nbbox"></div>'; document.body.appendChild(dlg);
    nbb.onclick = open; $('nbc').onclick = () => dlg.close(); dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    const box = $('nbbox'); box.addEventListener('click', onClick); box.addEventListener('change', onChange); box.addEventListener('input', onInput);
    badge();
    addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); dip = e; if (!standalone()) ib.hidden = false; });
    addEventListener('appinstalled', () => { ib.hidden = true; dip = null; });
    if (!standalone() && /iP(hone|ad|od)/.test(navigator.userAgent)) ib.hidden = false;
    ib.onclick = async () => { if (dip) { dip.prompt(); try { await dip.userChoice; } catch (e) { /* ignore */ } dip = null; ib.hidden = true; } else toast(t('insti')); };
    loadList(); loadPhotos().then(badge);
  }

  window.NB = { init, t, addNote: (x, s) => addNote(x, s), addCompany: (e) => { if (!DA) return null; const c = addCompany(e); badge(); return c; }, actions, open };
})();
