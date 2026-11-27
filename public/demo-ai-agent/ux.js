/* Visitor assistant demo – UX layer: intro slides, sponsor carousel (weighted by paid time),
   sector browser, voice input and event buttons in answers. No data leaves the device. */
(function () {
  'use strict';
  const S = {
    en: { help: 'Guide', skip: 'Skip', next: 'Next', start: "Let's go", wait: 'The assistant is busy – trying again in {s} s …', sectors: 'Browse by sector', mic: 'Speak', ad: 'Ad',
      secq: 'Which exhibitors are in the sector “{s}”? Show the most interesting ones with hall and stand.',
      slides: [['👋', 'Your fair assistant', '{n}: exhibitors, halls, programme and your own notes – in one app.'],
        ['💬', 'Ask in your language', 'Type or speak 🎤. The assistant finds exhibitors, products and stands and answers in your language.'],
        ['🗺', 'Find your way', 'Tap 📍 in an answer or 🗺 at the top – the hall plan shows where to go.'],
        ['📅', 'Programme & reminders', 'All talks by day. Add a session to your calendar and get a reminder 15 minutes before.'],
        ['☆', 'Your notebook', 'Scan business cards 📷 – contact and exhibitor are recognised. Save companies, answers, notes and photos. Everything stays on your phone.'],
        ['⬇', 'Take it home', 'At the end of the fair, download your notebook as PDF, HTML or CSV. Tip: add the app to your home screen – plan and notebook work offline.']] },
    de: { help: 'Anleitung', skip: 'Überspringen', next: 'Weiter', start: 'Los geht’s', wait: 'Der Assistent ist ausgelastet – neuer Versuch in {s} s …', sectors: 'Nach Bereich stöbern', mic: 'Sprechen', ad: 'Anzeige',
      secq: 'Welche Aussteller gehören zum Bereich „{s}“? Zeige die interessantesten mit Halle und Stand.',
      slides: [['👋', 'Ihr Messe-Assistent', '{n}: Aussteller, Hallen, Programm und Ihre eigenen Notizen – in einer App.'],
        ['💬', 'Fragen Sie in Ihrer Sprache', 'Tippen oder sprechen 🎤. Der Assistent findet Aussteller, Produkte und Stände und antwortet in Ihrer Sprache.'],
        ['🗺', 'Den Weg finden', 'Tippen Sie auf 📍 in einer Antwort oder oben auf 🗺 – der Hallenplan zeigt den Weg.'],
        ['📅', 'Programm & Erinnerung', 'Alle Vorträge nach Tagen. Programmpunkt in den Kalender übernehmen – mit Erinnerung 15 Minuten vorher.'],
        ['☆', 'Ihr Notizbuch', 'Visitenkarten scannen 📷 – Kontakt und Aussteller werden erkannt. Firmen, Antworten, Notizen und Fotos merken. Alles bleibt auf Ihrem Handy.'],
        ['⬇', 'Mit nach Hause nehmen', 'Am Messeende das Notizbuch als PDF, HTML oder CSV herunterladen. Tipp: App zum Startbildschirm hinzufügen – Plan und Notizbuch gehen auch offline.']] },
    ar: { help: 'الدليل', skip: 'تخطٍّ', next: 'التالي', start: 'لنبدأ', wait: 'المساعد مشغول – محاولة جديدة بعد {s} ث …', sectors: 'تصفّح حسب القطاع', mic: 'تحدّث', ad: 'إعلان',
      secq: 'ما العارضون في قطاع «{s}»؟ اعرض أهمهم مع القاعة والجناح.',
      slides: [['👋', 'مساعدك في المعرض', '{n}: العارضون والقاعات والبرنامج وملاحظاتك – في تطبيق واحد.'],
        ['💬', 'اسأل بلغتك', 'اكتب أو تحدّث 🎤. يجد المساعد العارضين والمنتجات والأجنحة ويجيب بلغتك.'],
        ['🗺', 'اعرف طريقك', 'اضغط 📍 في الإجابة أو 🗺 في الأعلى – خريطة القاعات تدلّك على المكان.'],
        ['📅', 'البرنامج والتذكير', 'كل المحاضرات حسب اليوم. أضف الفقرة إلى تقويمك واحصل على تذكير قبلها بـ 15 دقيقة.'],
        ['☆', 'دفتر ملاحظاتك', 'امسح بطاقات العمل 📷 – يتم التعرّف على جهة الاتصال والعارض. احفظ الشركات والإجابات والملاحظات والصور. كل شيء يبقى على هاتفك.'],
        ['⬇', 'خذها معك', 'في نهاية المعرض نزّل دفترك بصيغة PDF أو HTML أو CSV. نصيحة: أضف التطبيق إلى الشاشة الرئيسية – الخريطة والدفتر يعملان دون إنترنت.']] },
    tr: { help: 'Rehber', skip: 'Geç', next: 'İleri', start: 'Başlayalım', wait: 'Asistan meşgul – {s} sn sonra tekrar deneniyor …', sectors: 'Sektöre göre göz at', mic: 'Konuş', ad: 'Reklam',
      secq: '“{s}” sektöründe hangi katılımcılar var? En ilginçlerini salon ve standıyla göster.',
      slides: [['👋', 'Fuar asistanınız', '{n}: katılımcılar, salonlar, program ve kendi notlarınız – tek uygulamada.'],
        ['💬', 'Kendi dilinizde sorun', 'Yazın ya da konuşun 🎤. Asistan katılımcıları, ürünleri ve standları bulur, sizin dilinizde yanıt verir.'],
        ['🗺', 'Yolunuzu bulun', 'Yanıttaki 📍 veya üstteki 🗺 düğmesine dokunun – salon planı yolu gösterir.'],
        ['📅', 'Program ve hatırlatma', 'Tüm konuşmalar günlere göre. Oturumu takviminize ekleyin, 15 dakika önce hatırlatma alın.'],
        ['☆', 'Not defteriniz', 'Kartvizit tarayın 📷 – kişi ve katılımcı tanınır. Firmaları, yanıtları, notları ve fotoğrafları kaydedin. Her şey telefonunuzda kalır.'],
        ['⬇', 'Yanınızda götürün', 'Fuar sonunda not defterinizi PDF, HTML veya CSV olarak indirin. İpucu: uygulamayı ana ekrana ekleyin – plan ve not defteri çevrimdışı da çalışır.']] },
    fr: { help: 'Guide', skip: 'Passer', next: 'Suivant', start: 'C’est parti', wait: 'L’assistant est occupé – nouvel essai dans {s} s …', sectors: 'Parcourir par secteur', mic: 'Parler', ad: 'Annonce',
      secq: 'Quels exposants font partie du secteur « {s} » ? Montre les plus intéressants avec hall et stand.',
      slides: [['👋', 'Votre assistant salon', '{n} : exposants, halls, programme et vos notes – dans une seule appli.'],
        ['💬', 'Demandez dans votre langue', 'Écrivez ou parlez 🎤. L’assistant trouve exposants, produits et stands et répond dans votre langue.'],
        ['🗺', 'Trouvez votre chemin', 'Touchez 📍 dans une réponse ou 🗺 en haut – le plan des halls vous guide.'],
        ['📅', 'Programme & rappels', 'Toutes les conférences par jour. Ajoutez une session à votre agenda avec un rappel 15 minutes avant.'],
        ['☆', 'Votre carnet', 'Scannez les cartes de visite 📷 – contact et exposant sont reconnus. Gardez entreprises, réponses, notes et photos. Tout reste sur votre téléphone.'],
        ['⬇', 'À emporter', 'À la fin du salon, téléchargez votre carnet en PDF, HTML ou CSV. Astuce : ajoutez l’appli à l’écran d’accueil – plan et carnet marchent hors ligne.']] },
    it: { help: 'Guida', skip: 'Salta', next: 'Avanti', start: 'Iniziamo', wait: 'L’assistente è occupato – nuovo tentativo tra {s} s …', sectors: 'Sfoglia per settore', mic: 'Parla', ad: 'Annuncio',
      secq: 'Quali espositori fanno parte del settore «{s}»? Mostra i più interessanti con padiglione e stand.',
      slides: [['👋', 'Il tuo assistente in fiera', '{n}: espositori, padiglioni, programma e le tue note – in un’unica app.'],
        ['💬', 'Chiedi nella tua lingua', 'Scrivi o parla 🎤. L’assistente trova espositori, prodotti e stand e risponde nella tua lingua.'],
        ['🗺', 'Trova la strada', 'Tocca 📍 in una risposta o 🗺 in alto – la mappa ti mostra dove andare.'],
        ['📅', 'Programma e promemoria', 'Tutti gli interventi per giorno. Aggiungi una sessione al calendario con promemoria 15 minuti prima.'],
        ['☆', 'Il tuo taccuino', 'Scansiona i biglietti da visita 📷 – contatto ed espositore vengono riconosciuti. Salva aziende, risposte, note e foto. Tutto resta sul tuo telefono.'],
        ['⬇', 'Portalo a casa', 'A fine fiera scarica il taccuino in PDF, HTML o CSV. Consiglio: aggiungi l’app alla schermata Home – mappa e taccuino funzionano offline.']] },
    es: { help: 'Guía', skip: 'Saltar', next: 'Siguiente', start: 'Empezar', wait: 'El asistente está ocupado – nuevo intento en {s} s …', sectors: 'Explorar por sector', mic: 'Hablar', ad: 'Anuncio',
      secq: '¿Qué expositores hay en el sector «{s}»? Muestra los más interesantes con pabellón y stand.',
      slides: [['👋', 'Tu asistente de feria', '{n}: expositores, pabellones, programa y tus notas – en una sola app.'],
        ['💬', 'Pregunta en tu idioma', 'Escribe o habla 🎤. El asistente encuentra expositores, productos y stands y responde en tu idioma.'],
        ['🗺', 'Encuentra el camino', 'Toca 📍 en una respuesta o 🗺 arriba – el plano te muestra a dónde ir.'],
        ['📅', 'Programa y avisos', 'Todas las charlas por día. Añade una sesión a tu calendario con aviso 15 minutos antes.'],
        ['☆', 'Tu cuaderno', 'Escanea tarjetas de visita 📷 – se reconocen el contacto y el expositor. Guarda empresas, respuestas, notas y fotos. Todo se queda en tu móvil.'],
        ['⬇', 'Llévatelo', 'Al final de la feria descarga tu cuaderno en PDF, HTML o CSV. Consejo: añade la app a la pantalla de inicio – plano y cuaderno funcionan sin conexión.']] },
    pl: { help: 'Przewodnik', skip: 'Pomiń', next: 'Dalej', start: 'Zaczynamy', wait: 'Asystent jest zajęty – ponowna próba za {s} s …', sectors: 'Przeglądaj branże', mic: 'Mów', ad: 'Reklama',
      secq: 'Którzy wystawcy należą do branży „{s}”? Pokaż najciekawszych z halą i stoiskiem.',
      slides: [['👋', 'Twój asystent targowy', '{n}: wystawcy, hale, program i Twoje notatki – w jednej aplikacji.'],
        ['💬', 'Pytaj w swoim języku', 'Pisz lub mów 🎤. Asystent znajdzie wystawców, produkty i stoiska i odpowie w Twoim języku.'],
        ['🗺', 'Znajdź drogę', 'Dotknij 📍 w odpowiedzi lub 🗺 u góry – plan hal pokaże drogę.'],
        ['📅', 'Program i przypomnienia', 'Wszystkie prelekcje według dni. Dodaj punkt do kalendarza z przypomnieniem 15 minut wcześniej.'],
        ['☆', 'Twój notatnik', 'Skanuj wizytówki 📷 – kontakt i wystawca zostaną rozpoznani. Zapisuj firmy, odpowiedzi, notatki i zdjęcia. Wszystko zostaje w telefonie.'],
        ['⬇', 'Zabierz ze sobą', 'Na koniec targów pobierz notatnik jako PDF, HTML lub CSV. Wskazówka: dodaj aplikację do ekranu głównego – plan i notatnik działają offline.']] },
    ru: { help: 'Гид', skip: 'Пропустить', next: 'Далее', start: 'Начать', wait: 'Ассистент занят – повтор через {s} с …', sectors: 'Разделы выставки', mic: 'Говорить', ad: 'Реклама',
      secq: 'Какие экспоненты относятся к разделу «{s}»? Покажи самых интересных с павильоном и стендом.',
      slides: [['👋', 'Ваш помощник на выставке', '{n}: экспоненты, павильоны, программа и ваши заметки – в одном приложении.'],
        ['💬', 'Спрашивайте на своём языке', 'Пишите или говорите 🎤. Ассистент найдёт экспонентов, продукты и стенды и ответит на вашем языке.'],
        ['🗺', 'Найдите дорогу', 'Нажмите 📍 в ответе или 🗺 вверху – план павильонов покажет путь.'],
        ['📅', 'Программа и напоминания', 'Все доклады по дням. Добавьте пункт в календарь – с напоминанием за 15 минут.'],
        ['☆', 'Ваш блокнот', 'Сканируйте визитки 📷 – контакт и экспонент распознаются. Сохраняйте компании, ответы, заметки и фото. Всё остаётся в телефоне.'],
        ['⬇', 'Заберите с собой', 'В конце выставки скачайте блокнот как PDF, HTML или CSV. Совет: добавьте приложение на главный экран – план и блокнот работают офлайн.']] },
    zh: { help: '指南', skip: '跳过', next: '下一步', start: '开始', wait: '助手繁忙 – {s} 秒后重试 …', sectors: '按领域浏览', mic: '语音', ad: '广告',
      secq: '“{s}”领域有哪些参展商？请列出最值得关注的，并注明展厅和展位。',
      slides: [['👋', '您的展会助手', '{n}：参展商、展厅、日程和您的笔记——尽在一个应用。'],
        ['💬', '用您的语言提问', '输入或说话 🎤。助手为您查找参展商、产品和展位，并用您的语言回答。'],
        ['🗺', '找到路线', '点击回答中的 📍 或顶部的 🗺，展厅平面图为您指路。'],
        ['📅', '日程与提醒', '按天查看所有演讲。将日程加入日历，提前 15 分钟提醒。'],
        ['☆', '您的笔记本', '扫描名片 📷——自动识别联系人和参展商。收藏公司、回答、笔记和照片。所有内容只保存在您的手机上。'],
        ['⬇', '带回家', '展会结束时将笔记本下载为 PDF、HTML 或 CSV。提示：将应用添加到主屏幕——平面图和笔记本可离线使用。']] },
  };
  let C = null, L = 'en';
  const t = (k) => ((S[L] && S[L][k]) || S.en[k]);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => C.esc(s);

  // ---------- intro slides ----------
  const IKEY = 'da_intro_v1';
  function intro(force) {
    let seen = false; try { seen = !!localStorage.getItem(IKEY); } catch (e) { /* ignore */ }
    if (seen && !force) return;
    let d = $('intro');
    if (!d) {
      d = document.createElement('dialog'); d.id = 'intro';
      const n = (C.meta() && C.meta().name) || '';
      d.innerHTML = '<div class="ixs">' + t('slides').map((s, i) => '<section class="ix" aria-label="' + (i + 1) + '"><div class="ixi">' + s[0] + '</div><h2>' + esc(s[1]) + '</h2><p>' + esc(s[2].replace('{n}', n)) + '</p></section>').join('') + '</div>' +
        '<div class="ixf"><button type="button" class="ixskip">' + esc(t('skip')) + '</button><span class="ixd">' + t('slides').map(() => '<i></i>').join('') + '</span><button type="button" class="ixnext">' + esc(t('next')) + '</button></div>';
      document.body.appendChild(d);
      const box = d.querySelector('.ixs'), dots = [...d.querySelectorAll('.ixd i')], nx = d.querySelector('.ixnext'), last = dots.length - 1;
      let cur = 0;
      const sync = () => { dots.forEach((x, i) => x.classList.toggle('on', i === cur)); nx.textContent = cur === last ? t('start') : t('next'); nx.classList.toggle('go', cur === last); };
      const go = (i) => { cur = Math.max(0, Math.min(last, i)); box.children[cur].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' }); sync(); };
      let tm; box.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(() => { const i = Math.round(Math.abs(box.scrollLeft) / Math.max(1, box.clientWidth)); if (i !== cur) { cur = i; sync(); } }, 60); }, { passive: true });
      const close = () => { try { localStorage.setItem(IKEY, '1'); } catch (e) { /* ignore */ } d.close(); };
      nx.onclick = () => (cur === last ? close() : go(cur + 1));
      d.querySelector('.ixskip').onclick = close;
      d.addEventListener('cancel', () => { try { localStorage.setItem(IKEY, '1'); } catch (e) { /* ignore */ } });
      dots.forEach((x, i) => { x.onclick = () => go(i); });
      d._go = go; sync();
    }
    if (!d.open) d.showModal(); d._go(0);
  }

  // ---------- sponsor carousel: banner ads + sponsored exhibitors; each card stays for its paid time ----------
  const logoUrl = (v) => (/^(https:\/\/|\/demo-ai-agent\/logos\/)/i.test(String(v || '')) ? String(v) : '');
  function spots(box, m) {
    const base = Math.max(5, m.ad_interval || 12);
    const items = [];
    (m.ads || []).filter((a) => a.text || a.image).forEach((a) => items.push({ k: 'ad', a, secs: Math.max(4, Math.min(120, Number(a.secs) || base)) }));
    (m.featured || []).forEach((f) => items.push({ k: 'ex', f, secs: Math.max(4, Math.min(120, base * Math.max(1, Number(f.tier) || 1))) }));
    if (!items.length) { box.hidden = true; return; }
    // spread paid exhibitors and banners: interleave both lists
    const ads = items.filter((x) => x.k === 'ad'), ex = items.filter((x) => x.k === 'ex'), list = [];
    for (let i = 0; i < Math.max(ads.length, ex.length); i++) { if (ads[i]) list.push(ads[i]); if (ex[i]) list.push(ex[i]); }
    const card = (it) => {
      if (it.k === 'ad') {
        const a = it.a, u = C.safeUrl(a.url), img = logoUrl(a.logo || a.image);
        return '<div class="sp"><span class="sptag">' + esc(t('ad')) + '</span>' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy" onerror="this.outerHTML=\'<span class=spic>📣</span>\'">' : '<span class="spic">📣</span>') +
          '<div class="spb"><b>' + esc(a.text || '') + '</b>' + (u ? '<a class="spa" href="' + esc(u) + '" target="_blank" rel="noopener sponsored">' + esc(a.cta || '→') + ' →</a>' : '') + '</div></div>';
      }
      const f = it.f, u = C.safeUrl(f.website), h = C.hallsIn(f.stand)[0];
      const tr = Number(f.tier) || 1, tn = tr >= 5 ? ['t5', 'Premium'] : tr >= 3 ? ['t3', 'Gold'] : tr >= 2 ? ['t2', 'Silver'] : null;
      return '<div class="sp"><span class="sptag">' + esc(t('ad')) + '</span>' + (logoUrl(f.logo) ? '<img src="' + esc(logoUrl(f.logo)) + '" alt="" loading="lazy" onerror="this.outerHTML=\'<span class=spic>' + esc(String(f.name || '?').trim().slice(0, 1).toUpperCase()) + '</span>\'">' : '<span class="spic">' + esc(String(f.name || '?').trim().slice(0, 1).toUpperCase()) + '</span>') + '<div class="spb"><b>' + esc(f.name) + (tn ? '<span class="sptier ' + tn[0] + '">' + tn[1] + '</span>' : '') + '</b>' + (f.stand ? ' <small>' + esc(C.T.stand + ' ' + f.stand) + '</small>' : '') +
        (f.description ? '<small class="spd">' + esc(f.description) + '</small>' : '') + '<span class="spx">' +
        (u ? '<a class="spa" href="' + esc(u) + '" target="_blank" rel="noopener sponsored">' + esc(C.T.more) + '</a>' : '') +
        (h ? '<button type="button" data-h="' + esc(h) + '">📍 ' + esc(C.T.map) + '</button>' : '') +
        (window.NB ? '<button type="button" data-s="' + esc(f.name) + '">☆</button>' : '') + '</span></div></div>';
    };
    box.innerHTML = '<div class="spv"><div class="spt">' + list.map(card).join('') + '</div></div>' + (list.length > 1 ? '<div class="spf"><span class="spdots">' + list.map(() => '<i></i>').join('') + '</span><span class="spbar"><i></i></span></div>' : '');
    box.hidden = false;
    const track = box.querySelector('.spt'), dots = [...box.querySelectorAll('.spdots i')], bar = box.querySelector('.spbar i');
    box.querySelectorAll('button[data-h]').forEach((b) => { b.onclick = () => C.showMap([b.dataset.h]); });
    box.querySelectorAll('button[data-s]').forEach((b) => { b.onclick = () => { const f = (m.featured || []).find((x) => x.name === b.dataset.s); if (f && window.NB) { NB.addCompany(f); b.textContent = '✓'; b.disabled = true; } }; });
    if (list.length < 2) return;
    let cur = 0, timer = null, left = 0, startAt = 0, paused = false;
    const rtl = document.documentElement.dir === 'rtl';
    const show = (i, anim) => {
      cur = (i + list.length) % list.length;
      track.style.transition = anim === false ? 'none' : ''; track.style.transform = 'translateX(' + (rtl ? 1 : -1) * cur * 100 + '%)';
      dots.forEach((x, k) => x.classList.toggle('on', k === cur)); run(list[cur].secs * 1000);
    };
    const run = (ms) => {
      clearTimeout(timer); left = ms; startAt = Date.now();
      bar.style.transition = 'none'; bar.style.width = '0%'; void bar.offsetWidth;
      if (paused) return;
      bar.style.transition = 'width ' + ms + 'ms linear'; bar.style.width = '100%';
      timer = setTimeout(() => show(cur + 1), ms);
    };
    const pause = () => { if (paused) return; paused = true; clearTimeout(timer); left = Math.max(800, left - (Date.now() - startAt)); const w = getComputedStyle(bar).width; bar.style.transition = 'none'; bar.style.width = w; };
    const resume = () => { if (!paused) return; paused = false; const tot = list[cur].secs * 1000, done = 1 - left / tot; startAt = Date.now(); bar.style.transition = 'none'; bar.style.width = (done * 100) + '%'; void bar.offsetWidth; bar.style.transition = 'width ' + left + 'ms linear'; bar.style.width = '100%'; timer = setTimeout(() => show(cur + 1), left); };
    box.addEventListener('mouseenter', pause); box.addEventListener('mouseleave', resume);
    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : resume()));
    dots.forEach((x, k) => { x.onclick = () => show(k); });
    let x0 = null, y0 = 0;
    box.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; pause(); }, { passive: true });
    box.addEventListener('touchend', (e) => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null; paused = false;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(cur + ((dx < 0) !== rtl ? 1 : -1)); else { paused = true; resume(); }
    }, { passive: true });
    show(0, false);
  }

  // ---------- sector browser ----------
  function sectors(box, m) {
    const list = (m.sectors || []).filter((s) => s.name && !/^sonstig|^other/i.test(s.name));
    if (!list.length) { box.hidden = true; return; }
    const label = (s) => { const p = s.split('/').map((x) => x.trim()); return (L === 'de' ? p[0] : (p[1] || p[0])); };
    box.innerHTML = '<span class="secl">🔎 ' + esc(t('sectors')) + '</span><div class="secs">' + list.map((s) => '<button type="button" data-s="' + esc(label(s.name)) + '">' + esc(label(s.name)) + ' <small>' + s.n + '</small></button>').join('') + '</div>';
    box.querySelectorAll('button').forEach((b) => { b.onclick = () => C.ask(t('secq').replace('{s}', b.dataset.s)); });
  }

  // ---------- voice input ----------
  function mic(form, input) {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition; if (!R) return;
    const LC = { de: 'de-DE', en: 'en-GB', ar: 'ar-EG', tr: 'tr-TR', fr: 'fr-FR', it: 'it-IT', es: 'es-ES', pl: 'pl-PL', ru: 'ru-RU', zh: 'zh-CN' };
    const b = document.createElement('button'); b.type = 'button'; b.className = 'mic'; b.title = t('mic'); b.setAttribute('aria-label', t('mic')); b.textContent = '🎤';
    form.insertBefore(b, form.querySelector('.send'));
    let rec = null;
    b.onclick = () => {
      if (rec) { rec.stop(); return; }
      rec = new R(); rec.lang = LC[L] || navigator.language || 'en-GB'; rec.interimResults = true; rec.maxAlternatives = 1;
      b.classList.add('on');
      rec.onresult = (e) => { let s = ''; for (const r of e.results) s += r[0].transcript; input.value = s; if (e.results[e.results.length - 1].isFinal) { rec.stop(); if (s.trim()) form.requestSubmit(); } };
      rec.onend = rec.onerror = () => { b.classList.remove('on'); rec = null; };
      try { rec.start(); } catch (e) { b.classList.remove('on'); rec = null; }
    };
  }

  // ---------- event buttons under an answer ----------
  function eventChips(d, text) {
    const ev = (C.meta() && C.meta().program && C.meta().program.events) || [];
    if (!ev.length || !window.CAL || !CAL.openEvent) return;
    const low = String(text).toLowerCase(), hit = ev.filter((e) => e.title && e.title.length > 6 && low.includes(e.title.toLowerCase())).slice(0, 3);
    if (!hit.length) return;
    let row = d.querySelector('.acts'); if (!row) { row = document.createElement('div'); row.className = 'acts'; d.appendChild(row); }
    hit.forEach((e) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'act'; b.textContent = '📅 ' + (e.title.length > 34 ? e.title.slice(0, 32) + '…' : e.title) + ' · ' + e.start; b.onclick = () => CAL.openEvent(e.id); row.appendChild(b); });
  }

  function init(ctx) {
    C = ctx; L = S[ctx.L] ? ctx.L : 'en';
    const tools = document.querySelector('.tools'), hb = document.createElement('button'); hb.type = 'button'; hb.id = 'helpbtn'; hb.title = t('help'); hb.setAttribute('aria-label', t('help')); hb.textContent = '❔';
    tools.insertBefore(hb, $('lang')); hb.onclick = () => intro(true);
    mic($('f'), $('q'));
  }
  window.UX = { init, intro, spots, sectors, eventChips, t };
})();
