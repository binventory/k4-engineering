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
  // v3: business-card scanner, contacts, report
  const NBX = {
    de: { scan: 'Visitenkarte scannen', scanSub: 'Kamera öffnen – Kontakt wird automatisch erkannt', gallery: 'oder Foto auswählen', reading: 'Text wird erkannt …', ocrDev: '🔒 Die Texterkennung läuft nur auf Ihrem Handy.', ocrCloud: '📤 Das Foto wird zur Texterkennung an {p} übertragen, der Text wird von einem KI-Dienst sortiert. Wir speichern davon nichts.', ocrFail: 'Text konnte nicht gelesen werden – bitte Felder selbst ausfüllen.', check: 'Bitte kurz prüfen und korrigieren:', fName: 'Name', fTitle: 'Position', fCo: 'Firma', fMail: 'E-Mail', fTel: 'Telefon', fMob: 'Mobil', fWeb: 'Website', fAddr: 'Adresse', fNote: 'Notiz zum Gespräch', found: 'Aussteller erkannt', saveCt: 'Kontakt speichern', saveVcf: 'Speichern + ins Telefonbuch', cts: 'Kontakte', cancel: 'Abbrechen', retake: 'Neues Foto', report: 'Messebericht / PDF', dlhtml: 'Bericht (HTML)', vcfAll: 'Kontakte (vCard)', myrep: 'Mein Messebericht', sess: 'Programm-Termine', ans: 'Gespeicherte Antworten', notesN: 'Notizen', photos: 'Fotos', overview: 'Übersicht', rmct: 'Kontakt löschen?', vcf: 'vCard' },
    en: { scan: 'Scan business card', scanSub: 'Opens the camera – the contact is read automatically', gallery: 'or choose a photo', reading: 'Reading the card …', ocrDev: '🔒 Text recognition runs only on your phone.', ocrCloud: '📤 The photo is sent to {p} for text recognition and the text is sorted by an AI service. We do not store any of it.', ocrFail: 'Could not read the text – please fill in the fields.', check: 'Please check and correct:', fName: 'Name', fTitle: 'Position', fCo: 'Company', fMail: 'Email', fTel: 'Phone', fMob: 'Mobile', fWeb: 'Website', fAddr: 'Address', fNote: 'Note about the talk', found: 'Exhibitor found', saveCt: 'Save contact', saveVcf: 'Save + add to phone contacts', cts: 'Contacts', cancel: 'Cancel', retake: 'New photo', report: 'Fair report / PDF', dlhtml: 'Report (HTML)', vcfAll: 'Contacts (vCard)', myrep: 'My fair report', sess: 'Programme sessions', ans: 'Saved answers', notesN: 'Notes', photos: 'Photos', overview: 'Overview', rmct: 'Delete this contact?', vcf: 'vCard' },
    ar: { scan: 'مسح بطاقة عمل', scanSub: 'يفتح الكاميرا – تُقرأ بيانات الاتصال تلقائياً', gallery: 'أو اختر صورة', reading: 'جارٍ قراءة البطاقة …', ocrDev: '🔒 التعرّف على النص يتم على هاتفك فقط.', ocrCloud: '📤 تُرسل الصورة إلى {p} للتعرّف على النص، ثم يرتّب النصَّ مساعدُ ذكاء اصطناعي. لا نحفظ شيئاً من ذلك.', ocrFail: 'تعذّرت قراءة النص – يرجى ملء الحقول يدوياً.', check: 'يرجى المراجعة والتصحيح:', fName: 'الاسم', fTitle: 'المنصب', fCo: 'الشركة', fMail: 'البريد الإلكتروني', fTel: 'الهاتف', fMob: 'الجوال', fWeb: 'الموقع', fAddr: 'العنوان', fNote: 'ملاحظة عن اللقاء', found: 'تم التعرف على العارض', saveCt: 'حفظ جهة الاتصال', saveVcf: 'حفظ + إضافة إلى جهات الهاتف', cts: 'جهات الاتصال', cancel: 'إلغاء', retake: 'صورة جديدة', report: 'تقرير المعرض / PDF', dlhtml: 'التقرير (HTML)', vcfAll: 'جهات الاتصال (vCard)', myrep: 'تقريري عن المعرض', sess: 'مواعيد البرنامج', ans: 'الإجابات المحفوظة', notesN: 'الملاحظات', photos: 'الصور', overview: 'نظرة عامة', rmct: 'حذف جهة الاتصال؟', vcf: 'vCard' },
    tr: { scan: 'Kartvizit tara', scanSub: 'Kamerayı açar – kişi bilgileri otomatik okunur', gallery: 'veya fotoğraf seç', reading: 'Kart okunuyor …', ocrDev: '🔒 Metin tanıma yalnızca telefonunuzda çalışır.', ocrCloud: '📤 Fotoğraf metin tanıma için {p} hizmetine gönderilir, metin bir yapay zekâ hizmetiyle düzenlenir. Hiçbirini saklamıyoruz.', ocrFail: 'Metin okunamadı – lütfen alanları doldurun.', check: 'Lütfen kontrol edip düzeltin:', fName: 'Ad', fTitle: 'Pozisyon', fCo: 'Firma', fMail: 'E-posta', fTel: 'Telefon', fMob: 'Cep', fWeb: 'Web sitesi', fAddr: 'Adres', fNote: 'Görüşme notu', found: 'Katılımcı bulundu', saveCt: 'Kişiyi kaydet', saveVcf: 'Kaydet + rehbere ekle', cts: 'Kişiler', cancel: 'İptal', retake: 'Yeni fotoğraf', report: 'Fuar raporu / PDF', dlhtml: 'Rapor (HTML)', vcfAll: 'Kişiler (vCard)', myrep: 'Fuar raporum', sess: 'Program oturumları', ans: 'Kaydedilen yanıtlar', notesN: 'Notlar', photos: 'Fotoğraflar', overview: 'Genel bakış', rmct: 'Kişi silinsin mi?', vcf: 'vCard' },
    fr: { scan: 'Scanner une carte de visite', scanSub: "Ouvre l'appareil photo – le contact est lu automatiquement", gallery: 'ou choisir une photo', reading: 'Lecture de la carte …', ocrDev: '🔒 La reconnaissance du texte se fait uniquement sur votre téléphone.', ocrCloud: '📤 La photo est envoyée à {p} pour la reconnaissance du texte, puis triée par un service d’IA. Nous n’en conservons rien.', ocrFail: 'Texte illisible – veuillez remplir les champs.', check: 'Vérifiez et corrigez :', fName: 'Nom', fTitle: 'Fonction', fCo: 'Entreprise', fMail: 'E-mail', fTel: 'Téléphone', fMob: 'Mobile', fWeb: 'Site web', fAddr: 'Adresse', fNote: "Note sur l'échange", found: 'Exposant reconnu', saveCt: 'Enregistrer le contact', saveVcf: 'Enregistrer + ajouter aux contacts', cts: 'Contacts', cancel: 'Annuler', retake: 'Nouvelle photo', report: 'Rapport du salon / PDF', dlhtml: 'Rapport (HTML)', vcfAll: 'Contacts (vCard)', myrep: 'Mon rapport de salon', sess: 'Sessions du programme', ans: 'Réponses gardées', notesN: 'Notes', photos: 'Photos', overview: 'Aperçu', rmct: 'Supprimer ce contact ?', vcf: 'vCard' },
    it: { scan: 'Scansiona biglietto da visita', scanSub: 'Apre la fotocamera – il contatto viene letto automaticamente', gallery: 'oppure scegli una foto', reading: 'Lettura del biglietto …', ocrDev: '🔒 Il riconoscimento del testo avviene solo sul tuo telefono.', ocrCloud: '📤 La foto viene inviata a {p} per il riconoscimento del testo e il testo viene ordinato da un servizio di IA. Non salviamo nulla.', ocrFail: 'Testo non leggibile – compila i campi.', check: 'Controlla e correggi:', fName: 'Nome', fTitle: 'Ruolo', fCo: 'Azienda', fMail: 'E-mail', fTel: 'Telefono', fMob: 'Cellulare', fWeb: 'Sito web', fAddr: 'Indirizzo', fNote: 'Nota sul colloquio', found: 'Espositore trovato', saveCt: 'Salva contatto', saveVcf: 'Salva + aggiungi alla rubrica', cts: 'Contatti', cancel: 'Annulla', retake: 'Nuova foto', report: 'Report fiera / PDF', dlhtml: 'Report (HTML)', vcfAll: 'Contatti (vCard)', myrep: 'Il mio report della fiera', sess: 'Sessioni del programma', ans: 'Risposte salvate', notesN: 'Note', photos: 'Foto', overview: 'Panoramica', rmct: 'Eliminare il contatto?', vcf: 'vCard' },
    es: { scan: 'Escanear tarjeta de visita', scanSub: 'Abre la cámara – el contacto se lee automáticamente', gallery: 'o elegir una foto', reading: 'Leyendo la tarjeta …', ocrDev: '🔒 El reconocimiento de texto se hace solo en tu móvil.', ocrCloud: '📤 La foto se envía a {p} para reconocer el texto y un servicio de IA ordena los datos. No guardamos nada.', ocrFail: 'No se pudo leer el texto – rellena los campos.', check: 'Revisa y corrige:', fName: 'Nombre', fTitle: 'Cargo', fCo: 'Empresa', fMail: 'Correo', fTel: 'Teléfono', fMob: 'Móvil', fWeb: 'Web', fAddr: 'Dirección', fNote: 'Nota de la conversación', found: 'Expositor encontrado', saveCt: 'Guardar contacto', saveVcf: 'Guardar + añadir a contactos', cts: 'Contactos', cancel: 'Cancelar', retake: 'Nueva foto', report: 'Informe de la feria / PDF', dlhtml: 'Informe (HTML)', vcfAll: 'Contactos (vCard)', myrep: 'Mi informe de la feria', sess: 'Sesiones del programa', ans: 'Respuestas guardadas', notesN: 'Notas', photos: 'Fotos', overview: 'Resumen', rmct: '¿Borrar este contacto?', vcf: 'vCard' },
    pl: { scan: 'Skanuj wizytówkę', scanSub: 'Otwiera aparat – kontakt zostanie odczytany automatycznie', gallery: 'lub wybierz zdjęcie', reading: 'Odczytywanie wizytówki …', ocrDev: '🔒 Rozpoznawanie tekstu działa tylko na Twoim telefonie.', ocrCloud: '📤 Zdjęcie jest wysyłane do {p} w celu rozpoznania tekstu, a tekst porządkuje usługa AI. Niczego nie zapisujemy.', ocrFail: 'Nie udało się odczytać tekstu – uzupełnij pola.', check: 'Sprawdź i popraw:', fName: 'Imię i nazwisko', fTitle: 'Stanowisko', fCo: 'Firma', fMail: 'E-mail', fTel: 'Telefon', fMob: 'Komórka', fWeb: 'Strona', fAddr: 'Adres', fNote: 'Notatka z rozmowy', found: 'Rozpoznano wystawcę', saveCt: 'Zapisz kontakt', saveVcf: 'Zapisz + dodaj do kontaktów', cts: 'Kontakty', cancel: 'Anuluj', retake: 'Nowe zdjęcie', report: 'Raport z targów / PDF', dlhtml: 'Raport (HTML)', vcfAll: 'Kontakty (vCard)', myrep: 'Mój raport z targów', sess: 'Punkty programu', ans: 'Zapisane odpowiedzi', notesN: 'Notatki', photos: 'Zdjęcia', overview: 'Przegląd', rmct: 'Usunąć kontakt?', vcf: 'vCard' },
    ru: { scan: 'Сканировать визитку', scanSub: 'Откроется камера – контакт распознаётся автоматически', gallery: 'или выбрать фото', reading: 'Распознаём визитку …', ocrDev: '🔒 Распознавание текста выполняется только на вашем телефоне.', ocrCloud: '📤 Фото отправляется в {p} для распознавания текста, текст упорядочивает ИИ-сервис. Мы ничего не сохраняем.', ocrFail: 'Не удалось прочитать текст – заполните поля.', check: 'Проверьте и исправьте:', fName: 'Имя', fTitle: 'Должность', fCo: 'Компания', fMail: 'E-mail', fTel: 'Телефон', fMob: 'Мобильный', fWeb: 'Сайт', fAddr: 'Адрес', fNote: 'Заметка о встрече', found: 'Экспонент найден', saveCt: 'Сохранить контакт', saveVcf: 'Сохранить + в контакты телефона', cts: 'Контакты', cancel: 'Отмена', retake: 'Новое фото', report: 'Отчёт о выставке / PDF', dlhtml: 'Отчёт (HTML)', vcfAll: 'Контакты (vCard)', myrep: 'Мой отчёт о выставке', sess: 'Пункты программы', ans: 'Сохранённые ответы', notesN: 'Заметки', photos: 'Фото', overview: 'Обзор', rmct: 'Удалить контакт?', vcf: 'vCard' },
    zh: { scan: '扫描名片', scanSub: '打开相机——自动识别联系人', gallery: '或选择照片', reading: '正在识别名片 …', ocrDev: '🔒 文字识别仅在您的手机上进行。', ocrCloud: '📤 照片将发送至 {p} 进行文字识别，再由 AI 服务整理文字。我们不保存任何内容。', ocrFail: '无法识别文字——请手动填写。', check: '请检查并更正：', fName: '姓名', fTitle: '职位', fCo: '公司', fMail: '邮箱', fTel: '电话', fMob: '手机', fWeb: '网站', fAddr: '地址', fNote: '交谈备注', found: '已识别参展商', saveCt: '保存联系人', saveVcf: '保存并添加到通讯录', cts: '联系人', cancel: '取消', retake: '重新拍照', report: '展会报告 / PDF', dlhtml: '报告（HTML）', vcfAll: '联系人（vCard）', myrep: '我的展会报告', sess: '日程安排', ans: '已保存的回答', notesN: '笔记', photos: '照片', overview: '概览', rmct: '删除此联系人？', vcf: 'vCard' },
  };
  for (const l of Object.keys(NBT)) Object.assign(NBT[l], NBX[l] || {});

  let DA = null, LIST = [], BYSTAND = new Map(), DLOPT = '', NB = { co: [], notes: [], ct: [] }, PH = [], KEY = '', memOnly = false, dip = null;
  const $ = (id) => document.getElementById(id);
  const t = (k) => ((DA && NBT[DA.L] && NBT[DA.L][k]) || NBT.en[k] || '');
  const esc = (s) => DA.esc(s);
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const kOf = (n) => String(n || '').trim().toLowerCase();
  const hallOf = (s) => { const m = /^\s*(\d)\s*[-‐‑–]/.exec(s || ''); return m ? m[1] : ''; };
  const dstr = (ts) => { try { return new Date(ts).toLocaleDateString(DA.L); } catch (e) { return new Date(ts).toISOString().slice(0, 10); } };

  // ---------- storage ----------
  function load() { try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j && Array.isArray(j.co) && Array.isArray(j.notes)) { NB = j; if (!Array.isArray(NB.ct)) NB.ct = []; } } catch (e) { /* storage blocked */ } }
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
    if (!/^image\//.test(file.type) || PH.length >= 120) return '';
    const blob = await shrink(file), rec = { id: uid(), fair: DA.FAIR, co: co || '', blob, ts: Date.now() };
    PH.push({ ...rec, url: URL.createObjectURL(blob) });
    try { await tx('readwrite', (s) => s.put(rec)); } catch (e) { memOnly = true; }
    return rec.id;
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
  const badge = () => { const n = NB.co.length + NB.notes.length + NB.ct.length, b = $('nbcnt'); if (b) { b.textContent = n || ''; b.style.display = n ? '' : 'none'; } };

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
  const phById = (id) => PH.find((p) => p.id === id);
  function thumbs(co) { return PH.filter((p) => p.co === co).map((p) => '<span class="th"><img src="' + p.url + '" alt="" data-act="zoom" data-u="' + p.id + '"><button type="button" data-act="rmph" data-id="' + p.id + '" aria-label="' + esc(t('clear')) + '">✕</button></span>').join(''); }
  const photoBtn = (co) => '<label class="nbbtn">📷 ' + esc(t('photo')) + '<input type="file" accept="image/*" multiple hidden data-pco="' + esc(co) + '"></label>';
  const initials = (c) => (String(c.name || c.company || c.email || '?').trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('') || '?').toUpperCase();
  const telOf = (v) => String(v || '').replace(/[^\d+]/g, '');
  function ctHtml(c, inCo) {
    const p = c.ph && phById(c.ph), sub = [c.title, inCo ? '' : c.company].filter(Boolean).map(esc).join(' · ');
    return '<div class="nbct">' + (p ? '<img src="' + p.url + '" alt="" data-act="zoom" data-u="' + p.id + '">' : '<span class="nbav">' + esc(initials(c)) + '</span>') +
      '<div class="nbcti"><b>' + esc(c.name || c.email || c.company || '—') + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + (!inCo && c.stand ? '<small>' + esc(DA.T.stand + ' ' + c.stand) + '</small>' : '') +
      '<span class="nbctl">' + (c.email ? '<a href="mailto:' + esc(c.email) + '">✉ ' + esc(c.email) + '</a>' : '') + (c.mobile || c.phone ? '<a href="tel:' + esc(telOf(c.mobile || c.phone)) + '">☎ ' + esc(c.mobile || c.phone) + '</a>' : '') + '</span>' +
      (c.note ? '<small class="nbctn">' + esc(c.note) + '</small>' : '') + '</div>' +
      '<span class="nbx nbxv"><button type="button" data-act="vcf" data-id="' + esc(c.id) + '" title="' + esc(t('vcf')) + '">👤⬇</button><button type="button" data-act="rmct" data-id="' + esc(c.id) + '" aria-label="' + esc(t('clear')) + '">✕</button></span></div>';
  }
  function render() {
    const dlg = $('nb'), box = $('nbbox'), top = dlg.scrollTop, lay = (DA.meta() || {}).layout, halls = new Set(((lay && lay.halls) || []).map((h) => h.id));
    let h = '<button type="button" class="nbscan" data-act="scan"><span class="nbsi">📷</span><span><b>' + esc(t('scan')) + '</b><small>' + esc(t('scanSub')) + '</small></span></button>' +
      '<label class="nbgal">' + esc(t('gallery')) + '<input type="file" accept="image/*" hidden data-scan="1"></label>' +
      '<p class="nbp">🔒 ' + esc(t('priv')) + (memOnly ? ' ⚠' : '') + '</p>' +
      '<div class="nbadd"><input id="nbq" type="text" list="nbdl" maxlength="120" autocomplete="off" placeholder="' + esc(t('search')) + '"><button type="button" id="nbaddb" class="nbbtn pri">＋ ' + esc(t('addco')) + '</button><datalist id="nbdl">' + DLOPT + '</datalist></div>';
    if (!NB.co.length && !NB.notes.length && !PH.length && !NB.ct.length) h += '<p class="nbe">' + esc(t('empty')) + '</p>';
    if (NB.ct.length) h += '<h3 class="nbsec">👤 ' + esc(t('cts')) + ' <span>' + NB.ct.length + '</span></h3>' + NB.ct.map((c) => ctHtml(c, false)).join('');
    if (NB.co.length) h += '<h3 class="nbsec">🏢 ' + esc(t('cos')) + ' <span>' + NB.co.length + '</span></h3>';
    NB.co.forEach((c) => {
      const hl = hallOf(c.stand), fld = (f, lab, rows) => '<textarea rows="' + rows + '" data-f="' + f + '" data-k="' + esc(c.k) + '" maxlength="2000" placeholder="' + esc(lab) + '" aria-label="' + esc(lab) + '">' + esc(c[f] || '') + '</textarea>';
      const cts = NB.ct.filter((x) => x.co === c.k);
      h += '<section class="nbc" data-k="' + esc(c.k) + '"><div class="nbh"><b>' + esc(c.name) + '</b><span class="nbx">' + (hl && halls.has(hl) ? '<button type="button" data-act="map" data-h="' + esc(hl) + '">📍</button>' : '') + (c.website ? '<a href="' + esc(c.website) + '" target="_blank" rel="noopener">' + esc(DA.T.more) + '</a>' : '') + '<button type="button" data-act="rm" aria-label="' + esc(DA.T.close) + '">✕</button></span></div>' +
        '<small>' + [c.stand ? DA.T.stand + ' ' + c.stand : '', c.country, c.sector].filter(Boolean).map(esc).join(' · ') + '</small>' +
        (cts.length ? '<div class="nbcts">' + cts.map((x) => '<span>👤 ' + esc(x.name || x.email || '') + (x.title ? ' · ' + esc(x.title) : '') + '</span>').join('') + '</div>' : '') +
        fld('contact', t('contact'), 2) + fld('prods', t('prods'), 2) + fld('note', t('note'), 2) +
        '<div class="nbrow">' + thumbs(c.k) + photoBtn(c.k) + '</div></section>';
    });
    h += '<section class="nbc"><div class="nbh"><b>📝 ' + esc(t('gen')) + '</b></div><textarea id="nbnt" rows="2" maxlength="1500" placeholder="' + esc(t('notePh')) + '"></textarea><div class="nbrow"><button type="button" id="nbnadd" class="nbbtn">＋ ' + esc(t('addnote')) + '</button>' + thumbs('') + photoBtn('') + '</div>' +
      NB.notes.map((n) => '<div class="nbn"><small>' + esc(dstr(n.ts)) + '</small><button type="button" data-act="rmn" data-id="' + esc(n.id) + '" aria-label="' + esc(t('clear')) + '">✕</button><div>' + esc(n.text) + '</div></div>').join('') + '</section>' +
      '<div class="nbf"><button type="button" class="nbbtn pri" id="nbdl1">📄 ' + esc(t('report')) + '</button><button type="button" class="nbbtn" id="nbdl3">⬇ ' + esc(t('dlhtml')) + '</button><button type="button" class="nbbtn" id="nbdl2">⬇ ' + esc(t('dlcsv')) + '</button>' +
      (NB.ct.length ? '<button type="button" class="nbbtn" id="nbdl4">👤 ' + esc(t('vcfAll')) + '</button>' : '') + '<button type="button" class="nbbtn" id="nbclr">🗑 ' + esc(t('clear')) + '</button></div>';
    box.innerHTML = h; dlg.scrollTop = top; badge();
  }
  function open() { render(); const d = $('nb'); if (!d.open) d.showModal(); }

  // ---------- business-card scanner ----------
  let SC = null;
  const FIELDS = [['name', 'fName', 'text', 'name'], ['title', 'fTitle', 'text', 'organization-title'], ['company', 'fCo', 'text', 'organization'], ['email', 'fMail', 'email', 'email'], ['phone', 'fTel', 'tel', 'tel'], ['mobile', 'fMob', 'tel', 'tel'], ['web', 'fWeb', 'url', 'url'], ['addr', 'fAddr', 'text', 'street-address'], ['note', 'fNote', 'textarea', 'off']];
  function scanPick() { const i = $('nbcam'); if (!i) return; i.value = ''; i.click(); }
  async function scanFile(file) {
    if (!file || !/^image\//.test(file.type)) return;
    if (SC && SC.url) URL.revokeObjectURL(SC.url);
    SC = { file, url: URL.createObjectURL(file) };
    const d = $('nbs'), mode = ['mistral', 'llamaparse'].includes((DA.meta() || {}).ocr) ? DA.meta().ocr : 'device', pn = mode === 'llamaparse' ? 'LlamaParse (LlamaIndex)' : 'Mistral AI (EU)';
    $('nbsbox').innerHTML = '<img class="nbsimg" src="' + SC.url + '" alt=""><div class="nbprog"><i id="nbpb"></i></div><p class="nbsst">' + esc(t('reading')) + '</p><p class="nbp">' + esc(mode === 'device' ? t('ocrDev') : t('ocrCloud').replace('{p}', pn)) + '</p>';
    if (!d.open) d.showModal();
    let raw = '', ai = null;
    try {
      const r = await window.CARD.ocr(file, { mode, fair: DA.FAIR, progress: (p) => { const b = $('nbpb'); if (b) b.style.width = Math.max(4, Math.round(p * 100)) + '%'; }, onFallback: () => { const n = $('nbsbox').querySelector('.nbp'); if (n) n.textContent = t('ocrDev'); } });
      raw = r.text || ''; ai = r.fields || null;
    } catch (e) { raw = ''; }
    const o = window.CARD ? window.CARD.parse(raw) : {};
    if (ai) for (const k of Object.keys(o)) if (ai[k]) o[k] = ai[k];
    const ex = window.CARD ? window.CARD.matchExhibitor(o, raw, LIST) : null;
    if (ex && !o.company) o.company = ex.n;
    SC.raw = raw; SC.o = o; SC.ex = ex; scanForm(!String(raw).trim());
  }
  function scanForm(failed) {
    const o = SC.o || {}, ex = SC.ex, hl = ex ? hallOf(ex.s) : '';
    $('nbsbox').innerHTML = '<img class="nbsimg" src="' + SC.url + '" alt="">' +
      (failed ? '<p class="nbwarn">' + esc(t('ocrFail')) + '</p>' : '<p class="nbsst">' + esc(t('check')) + '</p>') +
      (ex ? '<div class="nbfound">✓ ' + esc(t('found')) + ': <b>' + esc(ex.n) + '</b>' + (ex.s ? ' · ' + esc(DA.T.stand + ' ' + ex.s) : '') + (hl ? ' <button type="button" data-sact="map" data-h="' + esc(hl) + '">📍</button>' : '') + '</div>' : '') +
      '<div class="nbform">' + FIELDS.map(([k, lab, ty, ac]) => '<label><span>' + esc(t(lab)) + '</span>' + (ty === 'textarea' ? '<textarea rows="2" data-sf="' + k + '" maxlength="600"></textarea>' : '<input type="' + ty + '" data-sf="' + k + '" autocomplete="' + ac + '" maxlength="200" value="' + esc(o[k] || '') + '"' + (k === 'company' ? ' list="nbdl2l"' : '') + '>') + '</label>').join('') +
      '<datalist id="nbdl2l">' + DLOPT + '</datalist></div>' +
      '<div class="nbsf"><button type="button" class="nbbtn pri" data-sact="save">✓ ' + esc(t('saveCt')) + '</button><button type="button" class="nbbtn" data-sact="savevcf">👤 ' + esc(t('saveVcf')) + '</button><button type="button" class="nbbtn" data-sact="retake">📷 ' + esc(t('retake')) + '</button><button type="button" class="nbbtn" data-sact="cancel">' + esc(t('cancel')) + '</button></div>';
  }
  async function scanSave(withVcf) {
    const c = { id: uid(), ts: Date.now() };
    $('nbsbox').querySelectorAll('[data-sf]').forEach((el) => { c[el.dataset.sf] = el.value.trim().slice(0, 600); });
    if (!c.name && !c.email && !c.company && !c.phone && !c.mobile) return;
    const n0 = (v) => kOf(v).replace(/[^\p{L}\p{N}]+/gu, ''), cc = n0(c.company);
    const ex = LIST.find((e) => kOf(e.n) === kOf(c.company)) || (SC.ex && (!cc || cc === n0((SC.o || {}).company) || cc.includes(n0(SC.ex.n)) || n0(SC.ex.n).includes(cc)) ? SC.ex : null);
    let co = null;
    if (ex) co = addCompany(ex);
    else if (c.company) co = addCompany({ n: c.company, website: c.web ? (/^https?:/i.test(c.web) ? c.web : 'https://' + c.web) : '' });
    c.co = co ? co.k : ''; c.stand = co ? co.stand : '';
    if (co && !co.contact) co.contact = [c.name, c.title, c.email, c.mobile || c.phone].filter(Boolean).join(', ');
    c.ph = (await addPhoto(SC.file, c.co)) || '';
    NB.ct.unshift(c); persist();
    if (withVcf) deliver(fileName(c.name || c.company || 'contact') + '.vcf', new Blob([window.CARD.vcard(c, (DA.meta() || {}).name)], { type: 'text/vcard;charset=utf-8' }));
    $('nbs').close(); render(); toast('👤 ' + (c.name || c.company || c.email) + ' – ' + t('saved'));
  }
  function onScanClick(e) {
    const b = e.target.closest('[data-sact]'); if (!b) return;
    const a = b.dataset.sact;
    if (a === 'save') scanSave(false); else if (a === 'savevcf') scanSave(true);
    else if (a === 'retake') scanPick(); else if (a === 'cancel') $('nbs').close();
    else if (a === 'map') DA.showMap([b.dataset.h]);
  }
  const fileName = (s) => String(s || 'file').normalize('NFKD').replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 60) || 'file';

  function onClick(e) {
    const b = e.target.closest('[data-act],#nbaddb,#nbnadd,#nbdl1,#nbdl2,#nbdl3,#nbdl4,#nbclr'); if (!b) return;
    const sec = b.closest('[data-k]'), k = sec && sec.dataset.k, act = b.dataset.act;
    if (b.id === 'nbaddb') { const v = $('nbq').value.trim(); if (v) { addCompany({ n: v }); render(); } return; }
    if (b.id === 'nbnadd') { const v = $('nbnt').value; if (v.trim()) { addNote(v); render(); } return; }
    if (b.id === 'nbdl1') return report('view'); if (b.id === 'nbdl3') return report('file'); if (b.id === 'nbdl2') return exportCsv(); if (b.id === 'nbdl4') return exportVcf();
    if (b.id === 'nbclr') { if (confirm(t('clearq'))) clearAll(); return; }
    if (act === 'scan') scanPick();
    else if (act === 'map') DA.showMap([b.dataset.h]);
    else if (act === 'rm') { const c = NB.co.find((x) => x.k === k); if (!c) return; if ((c.contact || c.prods || c.note || PH.some((p) => p.co === k)) && !confirm(t('rmq'))) return; PH.filter((p) => p.co === k).forEach((p) => delPhoto(p.id)); NB.co = NB.co.filter((x) => x.k !== k); NB.ct.forEach((x) => { if (x.co === k) { x.co = ''; x.ph = ''; } }); persist(); render(); }
    else if (act === 'rmn') { NB.notes = NB.notes.filter((n) => n.id !== b.dataset.id); persist(); render(); }
    else if (act === 'rmph') { delPhoto(b.dataset.id); render(); }
    else if (act === 'rmct') { if (!confirm(t('rmct'))) return; const c = NB.ct.find((x) => x.id === b.dataset.id); if (c && c.ph) delPhoto(c.ph); NB.ct = NB.ct.filter((x) => x.id !== b.dataset.id); persist(); render(); }
    else if (act === 'vcf') { const c = NB.ct.find((x) => x.id === b.dataset.id); if (c) deliver(fileName(c.name || c.company) + '.vcf', new Blob([window.CARD.vcard(c, (DA.meta() || {}).name)], { type: 'text/vcard;charset=utf-8' })); }
    else if (act === 'zoom') { const p = phById(b.dataset.u); if (p) window.open(p.url, '_blank'); }
  }
  async function onChange(e) {
    const el = e.target;
    if (el.dataset && el.dataset.scan && el.files && el.files[0]) { scanFile(el.files[0]); return; }
    if (el.dataset && el.dataset.pco !== undefined && el.files) { const co = el.dataset.pco; for (const f of el.files) await addPhoto(f, co); render(); }
    else if (el.id === 'nbq') { const v = el.value.trim(); if (v && LIST.some((x) => kOf(x.n) === kOf(v))) { addCompany({ n: v }); render(); } }
  }
  function onInput(e) { const el = e.target; if (el.dataset && el.dataset.f) { const c = NB.co.find((x) => x.k === el.dataset.k); if (c) { c[el.dataset.f] = el.value.slice(0, 2000); persist(); } } }
  function clearAll() { PH.slice().forEach((p) => delPhoto(p.id)); NB = { co: [], notes: [], ct: [] }; try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } render(); }

  // ---------- export: fair report (HTML → print / PDF), CSV, vCard ----------
  const sortedCos = () => NB.co.slice().sort((a, b) => (a.stand ? 0 : 1) - (b.stand ? 0 : 1) || String(a.stand || '').localeCompare(String(b.stand || ''), 'en', { numeric: true }) || a.name.localeCompare(b.name));
  const stamp = () => new Date().toISOString().slice(0, 10);
  const ios = () => /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function deliver(name, blob) {
    try { const f = new File([blob], name, { type: blob.type }); if (ios() && navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: name }).catch(() => {}); return; } } catch (e) { /* fall through */ }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 5000);
  }
  const dataUrl = (b) => new Promise((r) => { const f = new FileReader(); f.onload = () => r(f.result); f.onerror = () => r(''); f.readAsDataURL(b); });
  async function imgs(list) { const u = (await Promise.all(list.map((p) => dataUrl(p.blob)))).filter(Boolean); return u.length ? '<div class="ph">' + u.map((x) => '<img src="' + x + '" alt="">').join('') + '</div>' : ''; }
  const nl = (s) => esc(s).replace(/\n/g, '<br>');
  const shade = (hex, f) => { const n = parseInt(hex.slice(1), 16), c = (v) => Math.max(0, Math.min(255, Math.round(v * f))); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map((v) => c(v).toString(16).padStart(2, '0')).join(''); };
  async function buildReport() {
    const m = DA.meta() || {}, cos = sortedCos(), rtl = DA.L === 'ar', ac = /^#[0-9a-f]{6}$/i.test(m.accent) ? m.accent : '#0b5fa5', ac2 = shade(ac, 0.62);
    const evs = NB.notes.filter((n) => n.src === 'event'), ans = NB.notes.filter((n) => n.src === 'chat'), oth = NB.notes.filter((n) => n.src !== 'event' && n.src !== 'chat');
    const gen = PH.filter((p) => (p.co === '' || !NB.co.some((c) => c.k === p.co)) && !NB.ct.some((c) => c.ph === p.id));
    const cardImg = async (c) => { const p = c.ph && phById(c.ph); return p ? '<img class="card" src="' + (await dataUrl(p.blob)) + '" alt="">' : '<span class="av">' + esc(initials(c)) + '</span>'; };
    const lbl = (l, v) => (v ? '<div class="lbl">' + esc(l) + '</div><div>' + nl(v) + '</div>' : '');
    let ctH = '';
    for (const c of NB.ct) {
      ctH += '<div class="ct">' + (await cardImg(c)) + '<div><b>' + esc(c.name || c.email || '—') + '</b>' + (c.title ? '<div class="mut">' + esc(c.title) + '</div>' : '') + (c.company ? '<div>' + esc(c.company) + (c.stand ? ' <span class="badge">' + esc(c.stand) + '</span>' : '') + '</div>' : '') +
        (c.email ? '<div><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></div>' : '') + (c.mobile ? '<div>☎ ' + esc(c.mobile) + '</div>' : '') + (c.phone ? '<div>☎ ' + esc(c.phone) + '</div>' : '') +
        (c.web ? '<div><a href="' + esc(/^https?:/i.test(c.web) ? c.web : 'https://' + c.web) + '">' + esc(c.web) + '</a></div>' : '') + (c.note ? '<div class="note">' + nl(c.note) + '</div>' : '') + '</div></div>';
    }
    let coH = '', cur = null;
    if (cos.length) coH += '<table class="ov"><thead><tr><th>' + esc(DA.T.stand) + '</th><th>' + esc(t('cos')) + '</th><th>' + esc(t('cts')) + '</th></tr></thead><tbody>' + cos.map((c) => '<tr><td>' + esc(c.stand || '–') + '</td><td><b>' + esc(c.name) + '</b>' + (c.sector ? '<br><span class="mut">' + esc(c.sector) + '</span>' : '') + '</td><td>' + esc(NB.ct.filter((x) => x.co === c.k).map((x) => x.name || x.email).join(', ') || c.contact || '') + '</td></tr>').join('') + '</tbody></table>';
    for (const c of cos) {
      const hl = hallOf(c.stand); if (hl !== cur) { cur = hl; coH += '<div class="hall">' + esc(hl ? t('hall') + ' ' + hl : '–') + '</div>'; }
      const cts = NB.ct.filter((x) => x.co === c.k);
      coH += '<article class="co"><div class="coh"><h3>' + esc(c.name) + '</h3>' + (c.stand ? '<span class="badge">' + esc(DA.T.stand + ' ' + c.stand) + '</span>' : '') + '</div><div class="mut">' + [c.country, c.sector].filter(Boolean).map(esc).join(' · ') + '</div>' +
        (c.website ? '<div><a href="' + esc(c.website) + '">' + esc(c.website.replace(/^https?:\/\//, '')) + '</a></div>' : '') +
        (cts.length ? '<div class="lbl">' + esc(t('cts')) + '</div><div>' + cts.map((x) => esc([x.name, x.title, x.email, x.mobile || x.phone].filter(Boolean).join(' · '))).join('<br>') + '</div>' : lbl(t('contact'), c.contact)) +
        lbl(t('prods'), c.prods) + lbl(t('note'), c.note) + (await imgs(PH.filter((p) => p.co === c.k && !NB.ct.some((x) => x.ph === p.id)))) + '</article>';
    }
    const evH = evs.map((n) => { const p = n.text.replace(/^📅\s*/, '').split(' · '); return '<div class="ev"><div class="evt">' + esc(p[0] || '') + '</div><div><b>' + esc(p[1] || '') + '</b><div class="mut">' + esc(p.slice(2).join(' · ')) + '</div></div></div>'; }).join('');
    const ansH = ans.map((n) => { const m2 = /^❓\s*([^\n]*)\n([\s\S]*)$/.exec(n.text); return '<div class="qa">' + (m2 ? '<div class="q">' + esc(m2[1]) + '</div>' + nl(m2[2]) : nl(n.text)) + '</div>'; }).join('');
    const othH = oth.map((n) => '<div class="qa"><div class="mut">' + esc(dstr(n.ts)) + '</div>' + nl(n.text) + '</div>').join('') + (await imgs(gen));
    const stat = (n, l) => (n ? '<div class="st"><b>' + n + '</b><span>' + esc(l) + '</span></div>' : '');
    const sec = (ico, title, n, body) => (body ? '<section><h2><span>' + ico + '</span>' + esc(title) + (n ? ' <em>' + n + '</em>' : '') + '</h2>' + body + '</section>' : '');
    const name = 'Messebericht_' + fileName(m.name || DA.FAIR) + '_' + stamp() + '.html';
    const css = '@page{size:A4;margin:12mm}*{box-sizing:border-box}body{margin:0;font:14px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#18212b;background:#eef1f5}' +
      '.bar{position:sticky;top:0;z-index:2;display:flex;gap:8px;justify-content:center;padding:10px;background:rgba(255,255,255,.95);border-bottom:1px solid #e3e8ee;backdrop-filter:blur(6px)}.bar button{font:inherit;font-weight:600;border-radius:999px;padding:9px 18px;border:1px solid #d5dce4;background:#fff;cursor:pointer}.bar button.p{background:' + ac + ';border-color:' + ac + ';color:#fff}' +
      '.page{max-width:880px;margin:0 auto;background:#fff;box-shadow:0 2px 18px rgba(0,0,0,.06)}' +
      '.cover{background:linear-gradient(135deg,' + ac + ',' + ac2 + ');color:#fff;padding:38px 36px 30px}.cover small{text-transform:uppercase;letter-spacing:.12em;opacity:.85;font-size:12px}.cover h1{margin:6px 0 2px;font-size:30px;line-height:1.2}.cover p{margin:0;opacity:.92}' +
      '.stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.st{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.25);border-radius:14px;padding:8px 16px;min-width:92px}.st b{display:block;font-size:24px;line-height:1.1}.st span{font-size:12px;opacity:.9}' +
      'main{padding:6px 36px 30px}section{margin-top:26px}h2{display:flex;align-items:center;gap:10px;font-size:19px;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid ' + ac + ';break-after:avoid}h2 span{font-size:20px}h2 em{font-style:normal;font-size:12px;background:' + ac + ';color:#fff;border-radius:999px;padding:1px 9px}' +
      '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}.ct{display:flex;gap:12px;border:1px solid #e3e8ee;border-radius:14px;padding:12px;break-inside:avoid;font-size:13px}.ct .card{width:100px;height:62px;object-fit:cover;border-radius:8px;border:1px solid #e3e8ee;flex:none}.av{flex:none;width:46px;height:46px;border-radius:50%;background:' + ac + ';color:#fff;display:grid;place-items:center;font-weight:700}' +
      '.mut{color:#6b7785;font-size:12.5px}.note{margin-top:6px;background:#f6f8fb;border-radius:8px;padding:6px 8px}a{color:' + ac + ';text-decoration:none;word-break:break-word}' +
      '.ov{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:6px}.ov th{text-align:start;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#6b7785;border-bottom:1px solid #e3e8ee;padding:6px 8px}.ov td{border-bottom:1px solid #eef1f5;padding:7px 8px;vertical-align:top}.ov tr{break-inside:avoid}' +
      '.hall{margin:22px 0 6px;font-size:12px;font-weight:700;color:#6b7785;text-transform:uppercase;letter-spacing:.1em}.co{border:1px solid #e3e8ee;border-inline-start:5px solid ' + ac + ';border-radius:12px;padding:12px 16px;margin:10px 0;break-inside:avoid}.coh{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.co h3{margin:0;font-size:16px}' +
      '.badge{display:inline-block;background:#eef3fa;color:' + ac + ';border-radius:6px;padding:1px 8px;font-weight:700;font-size:12px;white-space:nowrap}.lbl{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#6b7785;margin:9px 0 1px}' +
      '.ev{display:flex;gap:14px;padding:9px 0;border-bottom:1px solid #eef1f5;break-inside:avoid}.evt{flex:none;width:150px;font-weight:700;color:' + ac + ';font-size:13px}.qa{background:#f6f8fb;border-radius:12px;padding:10px 14px;margin:8px 0;break-inside:avoid;font-size:13.5px}.q{font-weight:700;margin-bottom:4px}' +
      '.ph{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.ph img{height:120px;max-width:100%;border-radius:8px;border:1px solid #e3e8ee;break-inside:avoid}footer{padding:16px 36px 26px;border-top:1px solid #e3e8ee;color:#6b7785;font-size:11.5px}' +
      '@media(max-width:600px){.cover{padding:28px 18px 22px}.cover h1{font-size:24px}main{padding:4px 16px 24px}footer{padding:14px 16px 22px}.evt{width:96px}.ct .card{width:84px;height:52px}}' +
      '@media print{body{background:#fff}.bar{display:none}.page{max-width:none;box-shadow:none}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}a{color:#18212b}}';
    const js = 'function dl(){var h="<!doctype html>"+document.documentElement.outerHTML,b=new Blob([h],{type:"text/html"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=' + JSON.stringify(name) + ';document.body.appendChild(a);a.click();}';
    const html = '<!doctype html><html lang="' + esc(DA.L) + '"' + (rtl ? ' dir="rtl"' : '') + '><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>' + esc(t('myrep') + ' – ' + (m.name || '')) + '</title><style>' + css + '</style></head><body>' +
      '<div class="bar"><button class="p" onclick="print()">🖨 ' + esc(t('print')) + '</button><button onclick="dl()">⬇ HTML</button></div><div class="page">' +
      '<header class="cover"><small>' + esc(t('myrep')) + '</small><h1>' + esc(m.name || '') + '</h1><p>' + [m.dates, m.venue].filter(Boolean).map(esc).join(' · ') + '</p><p style="font-size:12px;margin-top:6px">' + esc(t('created')) + ' ' + esc(new Date().toLocaleString(DA.L)) + '</p>' +
      '<div class="stats">' + stat(NB.ct.length, t('cts')) + stat(cos.length, t('cos')) + stat(evs.length, t('sess')) + stat(ans.length + oth.length, t('notesN')) + stat(PH.length, t('photos')) + '</div></header><main>' +
      sec('👤', t('cts'), NB.ct.length, ctH ? '<div class="grid">' + ctH + '</div>' : '') + sec('🏢', t('cos'), cos.length, coH) + sec('📅', t('sess'), evs.length, evH) + sec('💬', t('ans'), ans.length, ansH) + sec('📝', t('other'), oth.length, othH) +
      '</main><footer>' + esc(t('ftr')) + '</footer></div><script>' + js + '<\/script></body></html>';
    return { html, name };
  }
  async function report(mode) {
    const standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
    const w = mode === 'view' && !(standalone && ios()) ? window.open('', '_blank') : null;
    const { html, name } = await buildReport();
    if (w) { try { w.document.open(); w.document.write(html); w.document.close(); return; } catch (e) { /* fall back to a file */ } }
    deliver(name, new Blob([html], { type: 'text/html' }));
  }
  function exportCsv() {
    const de = DA.L === 'de', head = de ? ['Typ', 'Firma', 'Stand', 'Halle', 'Land', 'Bereich', 'Website', 'Name', 'Position', 'E-Mail', 'Telefon', 'Mobil', 'Kontakt', 'Produkte', 'Notiz', 'Fotos'] : ['Type', 'Company', 'Stand', 'Hall', 'Country', 'Sector', 'Website', 'Name', 'Position', 'Email', 'Phone', 'Mobile', 'Contact', 'Products', 'Note', 'Photos'];
    const cell = (v) => { let s = String(v == null ? '' : v).replace(/\r?\n/g, ' ⏎ '); if (/^[=+\-@\t]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
    const rows = [head].concat(sortedCos().map((c) => [de ? 'Firma' : 'Company', c.name, c.stand, hallOf(c.stand), c.country, c.sector, c.website, '', '', '', '', '', c.contact, c.prods, c.note, PH.filter((p) => p.co === c.k).length]))
      .concat(NB.ct.map((c) => [de ? 'Kontakt' : 'Contact', c.company, c.stand, hallOf(c.stand), '', '', c.web, c.name, c.title, c.email, c.phone, c.mobile, c.addr, '', c.note, c.ph ? 1 : 0]))
      .concat(NB.notes.map((n) => [de ? 'Notiz' : 'Note', '', '', '', '', '', '', '', '', '', '', '', '', '', n.text, '']));
    deliver('Messe-Notizen_' + DA.FAIR + '_' + stamp() + '.csv', new Blob(['﻿' + rows.map((r) => r.map(cell).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
  }
  function exportVcf() {
    if (!NB.ct.length || !window.CARD) return;
    deliver('Kontakte_' + DA.FAIR + '_' + stamp() + '.vcf', new Blob([NB.ct.map((c) => window.CARD.vcard(c, (DA.meta() || {}).name)).join('')], { type: 'text/vcard;charset=utf-8' }));
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
      '#nbtoast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:#18212b;color:#fff;padding:8px 16px;border-radius:999px;font-size:.88rem;opacity:0;pointer-events:none;transition:.25s;z-index:99;max-width:92vw}#nbtoast.on{opacity:1;transform:translateX(-50%)}' +
      '@media(max-width:600px){dialog#nb,dialog#nbs,dialog#cal,dialog#dlg{width:100vw;max-width:100vw;height:100dvh;max-height:100dvh;margin:0;border-radius:0}.nbf{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}.nbf .nbbtn{flex:none;white-space:nowrap}}#nb .dh,#nbs .dh{position:sticky;top:0;background:var(--card);z-index:2}' +
      '.nbscan{display:flex;gap:14px;align-items:center;width:100%;text-align:start;font:inherit;color:#fff;background:linear-gradient(135deg,var(--ac),#073b67);border:0;border-radius:16px;padding:14px 16px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.15)}.nbscan .nbsi{font-size:1.7rem;width:52px;height:52px;border-radius:14px;background:rgba(255,255,255,.18);display:grid;place-items:center;flex:none}.nbscan b{display:block;font-size:1.02rem}.nbscan small{opacity:.9;font-size:.8rem}' +
      '.nbgal{display:block;text-align:center;font-size:.82rem;color:var(--ac);margin:6px 0 10px;cursor:pointer;text-decoration:underline}.nbsec{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--mut);margin:16px 0 8px;display:flex;gap:8px;align-items:center}.nbsec span{background:var(--ac);color:#fff;border-radius:999px;font-size:.72rem;padding:0 8px;letter-spacing:0}' +
      '.nbct{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--bd);border-radius:12px;padding:10px;margin-bottom:8px;background:var(--card)}.nbct img{width:72px;height:46px;object-fit:cover;border-radius:6px;border:1px solid var(--bd);cursor:zoom-in;flex:none}.nbav{flex:none;width:42px;height:42px;border-radius:50%;background:var(--ac);color:#fff;display:grid;place-items:center;font-weight:700}' +
      '.nbcti{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.nbcti small{color:var(--mut)}.nbctl{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:.84rem}.nbctl a{color:var(--ac);text-decoration:none;word-break:break-all}.nbctn{white-space:pre-wrap}.nbxv{flex-direction:column}.nbcts{display:flex;flex-wrap:wrap;gap:6px}.nbcts span{font-size:.8rem;background:var(--bg);border-radius:999px;padding:2px 10px}' +
      '#nbs{width:min(560px,96vw)}#nbsbox{padding:12px 14px 0}.nbsimg{width:100%;max-height:32vh;object-fit:contain;border-radius:12px;background:var(--bg);display:block}.nbprog{height:6px;background:var(--bd);border-radius:6px;overflow:hidden;margin:12px 0 6px}.nbprog i{display:block;height:100%;width:4%;background:var(--ac);transition:width .3s}.nbsst{font-weight:600;margin:10px 0 6px}.nbwarn{color:#b3261e;font-weight:600;margin:10px 0 6px}' +
      '.nbfound{background:#e8f5ec;color:#1b5e33;border-radius:10px;padding:8px 12px;margin:8px 0;font-size:.9rem}.nbfound button{font:inherit;border:1px solid #9fd3b0;background:#fff;border-radius:8px;cursor:pointer}@media(prefers-color-scheme:dark){.nbfound{background:#173524;color:#bfe8cc}}' +
      '.nbform{display:grid;grid-template-columns:1fr 1fr;gap:8px 10px}.nbform label{display:flex;flex-direction:column;gap:2px;font-size:.78rem;color:var(--mut)}.nbform label:nth-child(1),.nbform label:nth-child(3),.nbform label:nth-child(8),.nbform label:nth-child(9){grid-column:1/-1}.nbform input,.nbform textarea{font:inherit;font-size:16px;color:var(--tx);background:var(--bg);border:1px solid var(--bd);border-radius:10px;padding:9px 11px;width:100%}' +
      '.nbsf{position:sticky;bottom:0;background:var(--card);display:flex;flex-wrap:wrap;gap:8px;padding:12px 0 calc(12px + env(safe-area-inset-bottom));border-top:1px solid var(--bd);margin-top:12px}.nbsf .nbbtn,.nbf .nbbtn{font-size:.9rem;padding:9px 14px}' +
      '@media(max-width:600px){.nbform{grid-template-columns:1fr}.nbsf .nbbtn.pri{flex:1 1 100%}.nbf{padding-bottom:calc(10px + env(safe-area-inset-bottom))}.nbc textarea,.nbadd input,#nbnt{font-size:16px}}';
    document.head.appendChild(s);
  }

  function init(d) {
    DA = d; KEY = 'da_nb_' + DA.FAIR; load(); css();
    const tools = document.querySelector('.tools');
    const nbb = document.createElement('button'); nbb.type = 'button'; nbb.id = 'nbbtn'; nbb.title = t('nb'); nbb.innerHTML = '📒<span class="nblab"> ' + esc(t('nb')) + '</span> <span id="nbcnt" class="cnt"></span>'; tools.insertBefore(nbb, tools.firstChild);
    const ib = document.createElement('button'); ib.type = 'button'; ib.id = 'instbtn'; ib.hidden = true; ib.textContent = '📲'; ib.title = t('inst'); tools.insertBefore(ib, tools.firstChild);
    const dlg = document.createElement('dialog'); dlg.id = 'nb'; dlg.innerHTML = '<div class="dh"><b>' + esc(t('title')) + '</b><button type="button" id="nbc">' + esc(DA.T.close) + '</button></div><div id="nbbox"></div>'; document.body.appendChild(dlg);
    nbb.onclick = open; $('nbc').onclick = () => dlg.close(); dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    const sd = document.createElement('dialog'); sd.id = 'nbs'; sd.innerHTML = '<div class="dh"><b>📇 ' + esc(t('scan')) + '</b><button type="button" id="nbsc">' + esc(DA.T.close) + '</button></div><div id="nbsbox"></div>'; document.body.appendChild(sd);
    $('nbsc').onclick = () => sd.close(); $('nbsbox').addEventListener('click', onScanClick);
    const cam = document.createElement('input'); cam.type = 'file'; cam.accept = 'image/*'; cam.setAttribute('capture', 'environment'); cam.id = 'nbcam'; cam.hidden = true; document.body.appendChild(cam);
    cam.addEventListener('change', () => { if (cam.files && cam.files[0]) scanFile(cam.files[0]); });
    const box = $('nbbox'); box.addEventListener('click', onClick); box.addEventListener('change', onChange); box.addEventListener('input', onInput);
    badge();
    addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); dip = e; if (!standalone()) ib.hidden = false; });
    addEventListener('appinstalled', () => { ib.hidden = true; dip = null; });
    if (!standalone() && /iP(hone|ad|od)/.test(navigator.userAgent)) ib.hidden = false;
    ib.onclick = async () => { if (dip) { dip.prompt(); try { await dip.userChoice; } catch (e) { /* ignore */ } dip = null; ib.hidden = true; } else toast(t('insti')); };
    loadList(); loadPhotos().then(badge);
  }

  window.NB = { init, t, scan: () => { open(); scanPick(); }, addNote: (x, s) => addNote(x, s), addCompany: (e) => { if (!DA) return null; const c = addCompany(e); badge(); return c; }, actions, open };
})();
