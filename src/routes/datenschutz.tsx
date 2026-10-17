import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, Section, V } from "@/components/LegalPage";
import { LEGAL } from "@/lib/legal";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung / Privacy policy — K4-Engineering" },
      { name: "description", content: "Datenschutzerklärung von K4-Engineering, Augsburg: Website, eingebettete Videos, E-Mail-Kontakt und geschäftliche Kontaktaufnahme." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  const L = LEGAL;
  return (
    <LegalPage kicker="Privacy policy" title="Datenschutzerklärung">
      <p className="text-muted-foreground">
        Mit dieser Erklärung informieren wir Sie nach Art. 13 und 14 DSGVO darüber, welche
        personenbezogenen Daten wir verarbeiten, wenn Sie diese Website besuchen, uns kontaktieren
        oder wenn wir Sie geschäftlich ansprechen. <a href="#en">English summary below.</a>
      </p>

      <Section title="1. Verantwortlicher">
        <p>
          <strong>{L.name}</strong>, {L.businessName}
          <br />
          <V value={L.street} />, <V value={L.zip} /> {L.city}, {L.country}
          <br />
          E-Mail: <a href={`mailto:${L.email}`}>{L.email}</a> · Telefon: {L.phone}
        </p>
        <p>
          Ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen Voraussetzungen dafür
          nicht vorliegen. Bei Fragen zum Datenschutz schreiben Sie bitte an die oben genannte
          E-Mail-Adresse.
        </p>
      </Section>

      <Section title="2. Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei <strong>Netlify, Inc.</strong>, 101 2nd Street, San Francisco,
          CA 94105, USA, gehostet. Beim Aufruf der Seiten verarbeitet Netlify technisch notwendige
          Daten: IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Adresse (URL), Referrer,
          Browser und Betriebssystem. Diese Daten sind erforderlich, um die Website auszuliefern
          und ihre Sicherheit zu gewährleisten. Wir selbst werten diese Daten nicht aus und führen
          sie nicht mit anderen Daten zusammen.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren
          und zuverlässigen Bereitstellung der Website). Netlify verarbeitet die Daten in unserem
          Auftrag (Art. 28 DSGVO). Netlify ist nach dem EU-US Data Privacy Framework zertifiziert;
          die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der
          EU-Kommission (Art. 45 DSGVO).
        </p>
      </Section>

      <Section title="3. SSL/TLS-Verschlüsselung">
        <p>
          Diese Website nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung. Sie erkennen
          eine verschlüsselte Verbindung an „https://“ in der Adresszeile Ihres Browsers.
        </p>
      </Section>

      <Section title="4. Cookies">
        <p>
          Wir verwenden <strong>keine Analyse-, Tracking- oder Werbe-Cookies</strong> und keine
          Webanalyse-Dienste. Ein Cookie wird nur gesetzt, wenn ein Kunde eine passwortgeschützte
          Angebotsseite öffnet: Das Cookie „k4-proposal-gate“ speichert, dass das Passwort richtig
          eingegeben wurde (Gültigkeit 7 Tage). Es ist technisch unbedingt erforderlich (§ 25 Abs. 2
          Nr. 2 TDDDG; Art. 6 Abs. 1 lit. b und f DSGVO).
        </p>
      </Section>

      <Section title="5. Schriftarten">
        <p>
          Die auf dieser Website verwendeten Schriftarten sind lokal auf unserem Server
          gespeichert. Beim Seitenaufruf wird keine Verbindung zu Servern von Google oder anderen
          Schriftanbietern aufgebaut.
        </p>
      </Section>

      <Section title="6. Eingebettete Videos (LinkedIn, Vimeo) – nur nach Klick">
        <p>
          Auf einigen Seiten zeigen wir Videos, die bei <strong>LinkedIn</strong> (LinkedIn Ireland
          Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2, Irland) oder bei{" "}
          <strong>Vimeo</strong> (Vimeo.com, Inc., USA) liegen. Diese Videos werden erst geladen,
          wenn Sie auf „Video laden“ klicken. Vorher wird keine Verbindung zu LinkedIn oder Vimeo
          hergestellt.
        </p>
        <p>
          Nach dem Klick erhält der jeweilige Anbieter Daten wie Ihre IP-Adresse, die besuchte
          Seite und Angaben zu Ihrem Browser; er kann außerdem Cookies setzen und, wenn Sie dort
          eingeloggt sind, den Abruf Ihrem Konto zuordnen. Rechtsgrundlage ist Ihre Einwilligung
          (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), die Sie durch den Klick erteilen. Die
          Einwilligung gilt nur für den aktuellen Seitenaufruf; beim nächsten Aufruf ist das Video
          wieder gesperrt. Eine Übermittlung in die USA ist möglich; sie stützt sich auf das EU-US
          Data Privacy Framework, soweit der Anbieter zertifiziert ist, sonst auf
          EU-Standardvertragsklauseln. Weitere Informationen finden Sie in den
          Datenschutzhinweisen von LinkedIn und Vimeo.
        </p>
      </Section>

      <Section title="7. Links zu anderen Websites">
        <p>
          Diese Website enthält Links, zum Beispiel zu LinkedIn, zu Google Drive (Download von
          Kundendokumenten) oder zu Calendly. Erst wenn Sie einen solchen Link anklicken, verlassen
          Sie unsere Website; ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
      </Section>

      <Section title="8. Kontakt per E-Mail oder Telefon">
        <p>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben (Name,
          Firma, Kontaktdaten, Inhalt der Anfrage), um Ihre Anfrage zu beantworten.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um einen möglichen Auftrag
          geht, sonst Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung).
        </p>
        <p>
          Unser E-Mail-Postfach @k4-engineering.eu wird von der <strong>Zoho Corporation B.V.</strong>{" "}
          (Niederlande) in Rechenzentren in der EU betrieben. Für die geschäftliche Korrespondenz
          nutzen wir außerdem ein Google-Mail-Konto (<strong>Google Ireland Limited</strong>, Gordon
          House, Barrow Street, Dublin 4, Irland). Beide Anbieter verarbeiten die Daten in unserem
          Auftrag (Art. 28 DSGVO). Bei Google ist eine Übermittlung in die USA möglich; sie stützt
          sich auf das EU-US Data Privacy Framework.
        </p>
      </Section>

      <Section title="9. Geschäftliche Kontaktaufnahme (zum Beispiel vor Messen)" id="kontaktaufnahme">
        <p>
          Wir sprechen Unternehmen, die an Fachmessen teilnehmen, gezielt an, um ihnen die
          Entwicklung eines interaktiven 3D-Prototyps für ihren Messestand vorzuschlagen. Dafür
          verarbeiten wir <strong>geschäftliche Kontaktdaten</strong>: Firmenname, Messe und
          Standnummer, die geschäftliche E-Mail-Adresse und gegebenenfalls Name und Funktion einer
          Ansprechperson sowie den Inhalt unserer Korrespondenz.
        </p>
        <p>
          <strong>Herkunft der Daten (Art. 14 DSGVO):</strong> Wir erheben diese Daten
          ausschließlich aus öffentlich zugänglichen Quellen, nämlich der Website des Unternehmens
          (zum Beispiel Kontaktseite oder Impressum) und dem öffentlichen Ausstellerverzeichnis der
          jeweiligen Messe. Wenn Sie uns eine Kollegin oder einen Kollegen als Ansprechperson
          nennen, stammen deren Kontaktdaten von Ihnen.
        </p>
        <p>
          <strong>Zweck und Rechtsgrundlage:</strong> Die Verarbeitung dient der geschäftlichen
          Kontaktaufnahme und der Anbahnung eines möglichen Auftrags. Rechtsgrundlage ist Art. 6
          Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist die Kontaktaufnahme mit
          Unternehmen, für deren Messeauftritt unser Angebot relevant sein kann. Wenn Sie einen
          Termin vereinbaren oder ein Angebot anfragen, ist Rechtsgrundlage Art. 6 Abs. 1 lit. b
          DSGVO.
        </p>
        <p>
          <strong>Hilfsmittel und Empfänger:</strong> Wir versenden die E-Mails über ein
          Google-Mail-Konto und führen die Kontaktliste in Google Sheets (Google Ireland Limited,
          siehe Abschnitt 8). Die Links in unseren E-Mails können Kampagnen-Parameter enthalten
          (zum Beispiel „utm_source=…“ und eine interne Kennnummer bei Terminlinks). Sie zeigen
          nur, aus welcher E-Mail ein Seitenaufruf oder eine Terminbuchung stammt. Wir verwenden{" "}
          <strong>keine Zählpixel</strong> und werten nicht aus, ob oder wann Sie eine E-Mail öffnen.
        </p>
        <p>
          <strong>Speicherdauer:</strong> Entsteht keine Geschäftsbeziehung, löschen wir die Daten
          spätestens 12 Monate nach dem letzten Kontakt. Wenn Sie widersprechen, speichern wir nur
          Ihre E-Mail-Adresse und den Firmennamen in einer Sperrliste, damit wir Sie nicht erneut
          ansprechen.
        </p>
        <p>
          <strong>Widerspruch:</strong> Sie können dieser Verarbeitung jederzeit ohne Angabe von
          Gründen widersprechen. Eine kurze Antwort auf unsere E-Mail (zum Beispiel „Nein“) oder
          eine Nachricht an <a href={`mailto:${L.email}`}>{L.email}</a> genügt. Danach schreiben
          wir Ihnen nicht mehr.
        </p>
      </Section>

      <Section title="10. Terminbuchung über Calendly">
        <p>
          Für die Vereinbarung von Gesprächsterminen bieten wir einen Link zu{" "}
          <strong>Calendly</strong> (Calendly LLC, USA) an. Wenn Sie dort einen Termin buchen,
          verarbeitet Calendly die von Ihnen eingegebenen Daten (zum Beispiel Name, E-Mail-Adresse,
          gewählter Termin) und übermittelt sie an uns. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          DSGVO. Eine Übermittlung in die USA ist möglich; sie stützt sich auf das EU-US Data
          Privacy Framework, soweit Calendly zertifiziert ist, sonst auf
          EU-Standardvertragsklauseln. Sie können einen Termin jederzeit auch per E-Mail oder
          Telefon vereinbaren.
        </p>
      </Section>

      <Section title="11. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung
          (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20).
          Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen
          (Art. 7 Abs. 3 DSGVO).
        </p>
        <p className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-foreground">
          <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Soweit wir Daten auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO verarbeiten, können Sie aus Gründen, die sich aus Ihrer
          besonderen Situation ergeben, jederzeit widersprechen. Der Verarbeitung zum Zweck der
          Direktwerbung können Sie jederzeit ohne Begründung widersprechen; wir verarbeiten Ihre
          Daten dann nicht mehr für diesen Zweck.
        </p>
        <p>
          Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77
          DSGVO). Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht,
          Promenade 18, 91522 Ansbach,{" "}
          <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">
            www.lda.bayern.de
          </a>
          .
        </p>
      </Section>

      <Section title="12. Weitere Hinweise">
        <p>
          Wir treffen keine automatisierten Entscheidungen im Sinne von Art. 22 DSGVO. Sie sind
          nicht verpflichtet, uns personenbezogene Daten bereitzustellen; ohne Kontaktdaten können
          wir eine Anfrage jedoch nicht beantworten.
        </p>
      </Section>

      <Section title="Privacy policy – English summary" id="en">
        <p>
          Controller: {L.name}, {L.businessName}, <V value={L.street} />, <V value={L.zip} />{" "}
          {L.city}, {L.countryEn}, <a href={`mailto:${L.email}`}>{L.email}</a>. The website is
          hosted by Netlify, Inc. (USA, EU-US Data Privacy Framework), which processes technical
          access data (IP address, time, URL, browser) to deliver the site. We use no analytics or
          tracking cookies; fonts are self-hosted. Videos from LinkedIn and Vimeo are only loaded
          after you click "Load video" (consent, Art. 6(1)(a) GDPR). Our mailbox is hosted by Zoho
          (EU data centres); we also use a Google Mail account and Google Sheets.
        </p>
        <p>
          Before trade fairs we contact exhibitors about developing an interactive 3D prototype
          for their stand. We use business contact data taken only from public sources (the
          company's website and the fair's exhibitor directory), based on our legitimate interest
          (Art. 6(1)(f) GDPR). Our e-mails contain no tracking pixels; links may carry campaign
          parameters. If no business relationship results, we delete the data at the latest 12
          months after the last contact. You can object at any time without giving reasons: just
          reply "No" or write to <a href={`mailto:${L.email}`}>{L.email}</a>. You also have the
          rights of access, rectification, erasure, restriction, portability and complaint
          (Bavarian Data Protection Authority, BayLDA, Ansbach). The German version above is the
          legally binding one.
        </p>
      </Section>

      <p className="text-xs text-muted-foreground">
        Stand: {L.updated} ·{" "}
        <Link to="/impressum" className="text-primary hover:underline">
          Impressum
        </Link>
      </p>
    </LegalPage>
  );
}
