import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, Section, V } from "@/components/LegalPage";
import { LEGAL, isPlaceholder } from "@/lib/legal";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum / Legal notice — K4-Engineering" },
      { name: "description", content: "Impressum (Anbieterkennzeichnung) von K4-Engineering, Augsburg." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  const L = LEGAL;
  const hasVat = L.vatId.trim() !== "";
  return (
    <LegalPage kicker="Legal notice" title="Impressum">
      <Section title="Angaben gemäß § 5 DDG">
        <p>
          <strong>{L.name}</strong>
          <br />
          {L.businessName}
          <br />
          {L.activity}
          <br />
          <V value={L.street} />
          <br />
          <V value={L.zip} /> {L.city}
          <br />
          {L.country}
        </p>
      </Section>

      <Section title="Kontakt">
        <p>
          Telefon: <a href={`tel:${L.phone.replace(/\s+/g, "")}`}>{L.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${L.email}`}>{L.email}</a>
        </p>
      </Section>

      {hasVat && (
        <Section title="Umsatzsteuer-ID">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: <V value={L.vatId} />
          </p>
        </Section>
      )}

      <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {L.name}, <V value={L.street} />, <V value={L.zip} /> {L.city}
        </p>
      </Section>

      <Section title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>

      <Section title="Datenschutz">
        <p>
          Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
          <Link to="/datenschutz">Datenschutzerklärung</Link>.
        </p>
      </Section>

      <Section title="Legal notice (English)" id="en">
        <p>
          Provider of this website: <strong>{L.name}</strong>, {L.businessName} ({L.activityEn}),{" "}
          <V value={L.street} />, <V value={L.zip} /> {L.city}, {L.countryEn}. Phone {L.phone}, e-mail{" "}
          <a href={`mailto:${L.email}`}>{L.email}</a>.
          {hasVat && (
            <>
              {" "}
              VAT ID: <V value={L.vatId} />.
            </>
          )}{" "}
          The German version above is the legally binding one. For data protection see our{" "}
          <Link to="/datenschutz" hash="en">
            privacy policy
          </Link>
          .
        </p>
      </Section>

      <p className="text-xs text-muted-foreground">
        Stand: {L.updated}
        {(isPlaceholder(L.street) || isPlaceholder(L.zip) || isPlaceholder(L.vatId)) && (
          <span className="ml-2 font-semibold text-destructive">
            · Platzhalter noch in src/lib/legal.ts ausfüllen
          </span>
        )}
      </p>
    </LegalPage>
  );
}
