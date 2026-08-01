import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import atecLogo from "@/assets/atec-logo.png.asset.json";
import {
  Boxes,
  Cog,
  Droplets,
  Layers,
  Radio,
  Languages,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
} from "lucide-react";

export const Route = createFileRoute("/atec-offer")({
  head: () => ({
    meta: [
      { title: "ATEC Pharmatechnik Offer — K4-Engineering Scale Models" },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content:
          "Private project offer for ATEC Pharmatechnik GmbH: custom exhibition scale models and interactive prototypes by K4-Engineering.",
      },
      { property: "og:title", content: "ATEC Pharmatechnik Offer — K4-Engineering" },
      {
        property: "og:description",
        content: "Custom exhibition scale models and interactive prototypes for ATEC Pharmatechnik GmbH.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AtecOffer,
});

/* ---------------- image slot ---------------- */

function Slot({
  filename,
  ratio = "aspect-[4/3]",
  className = "",
  alt,
}: {
  filename: string;
  ratio?: string;
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={filename}
        className={`${ratio} ${className} flex items-center justify-center border-2 border-dashed border-border bg-muted text-muted-foreground`}
      >
        <span className="px-2 text-center text-xs font-semibold tracking-[0.12em]">{filename}</span>
      </div>
    );
  }
  return (
    <img
      src={`/images/atec/${filename}`}
      alt={alt ?? filename}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${ratio} ${className} w-full border border-border object-cover`}
    />
  );
}

/* ---------------- copy ---------------- */

const t = {
  de: {
    nav: ["Portfolio", "Workflow", "Kompetenzen", "Preise", "Recht", "Kontakt"],
    heroSub: "Maßgeschneiderte Industrie-Showcase-Lösungen für ATEC Pharmatechnik GmbH",
    heroValue: "Komplexe Prozessanlagen als präzise, interaktive Messemodelle.",
    portfolioTitle: "Case Study: Interaktives Smart-Sensor-Baummodell (Baumpflegetage Augsburg, Mai 2026)",
    portfolioL1: "Eingebettete Sensoren erfassten den Saftfluss im Baumstamm.",
    portfolioL2: "Die Messwerte wurden live in sichtbare Daten übersetzt.",
    capsTitle: "Kompetenzen",
    caps: [
      "PETG-Druck, Schleifen, Metallic-Finish.",
      "Getriebe, Motoren, präzise Bewegung.",
      "Sichtbare Fluidwege mit Lichtreaktion.",
      "Epoxidharz-Optik und Verbundwerkstoffe.",
      "MQTT-Cloud und QR-Code-Besuchersteuerung.",
      "Audioguide in mehreren Sprachen.",
    ],
    capTitles: [
      "Additive Fertigung & Finish",
      "Mechatronik & Antriebstechnik",
      "Fluiddynamik & Reaktionslicht",
      "Epoxy-Art & Composites",
      "IoT & Cloud (MQTT, QR-Code)",
      "Mehrsprachiger Audioguide",
    ],
    workflowTitle: "Ideen sichtbar machen, bevor die Produktion beginnt",
    phases: [
      { t: "Phase 1 — KI-Konzeptrendering", d: "Erstes Bildkonzept nach Ihrem Anlagenlayout." },
      { t: "Phase 2 — CAD-Optimierung", d: "Wandstärken, Statik und Druckbarkeit angepasst." },
      { t: "Phase 3 — Fertiges Modell", d: "Gedruckt, lackiert, montiert und geprüft." },
    ],
    phaseNote:
      "Zwischen Phase 1 und Phase 3 treten geringe Geometrieänderungen auf — für Festigkeit und Transportsicherheit.",
    scopeTitle: "ATEC Projektumfang",
    scope: [
      "Hängender konischer Reaktorbehälter auf auskragender C-Arm-Stütze.",
      "Grundplatte: Holzkern mit 3 mm Aluminium-Verbundplatte (Dibond / RAL9006 Silber-Metallic).",
      "CNC-graviertes ATEC-Logo in der Grundplatte.",
    ],
    pricingTitle: "Modulare Preisstufen",
    tiers: ["Essential 3D", "Dynamic Rotation", "Ultimate Interactive"],
    tierPrices: ["4.650 € – 5.160 €", "5.450 € – 5.960 €", "Individuelles Angebot"],
    features: [
      "PETG 3D-Druck",
      "Silber-Metallic-Finish",
      "Aluminium-Basis + CNC-Logo",
      "Manuelles C-Arm- & Tank-Layout",
      "Automatische 45°-Tankrotation",
      "Custom-Getriebe & Mikromotor",
      "Transparente Fluidleitungen + LED/Optik",
      "Taster-Steuerung in der Basis",
    ],
    priceNote:
      "+800 € Designpauschale nur, wenn keine druckfertigen 3D-CAD-Dateien von ATEC bereitgestellt werden.",
    legalTitle: "Zahlung & Rechtliches",
    legal: [
      "40 % Anzahlung bei Projektstart.",
      "60 % nach Endabnahme, vor Lieferung.",
      "Freiberufliche Ingenieurdienstleistungen.",
      "Werkvertrag / Dienstvertrag nach deutschem BGB.",
    ],
    preparedFor: "Erstellt für ATEC Pharmatechnik GmbH (atec-pharma.com)",
    firm: "K4-Engineering | Freiberufliches Ingenieurbüro, Augsburg",
    accept: "ANGEBOT ANNEHMEN / RÜCKRUF",
    pdf: "PDF-ANGEBOT LADEN",
    prev: "Vorheriges Bild",
    next: "Nächstes Bild",
  },
  en: {
    nav: ["Portfolio", "Workflow", "Capabilities", "Pricing", "Legal", "Contact"],
    heroSub: "Tailored Industrial Showcase Solutions for ATEC Pharmatechnik GmbH",
    heroValue: "Complex process plants turned into precise, interactive exhibition models.",
    portfolioTitle: "Case Study: Interactive Smart Sensor Tree Model (Baumpflegetage Augsburg, May 2026)",
    portfolioL1: "Embedded sensors measured sap flow inside the trunk.",
    portfolioL2: "Readings were translated into live, visible data.",
    capsTitle: "Capabilities",
    caps: [
      "PETG printing, sanding, metallic finish.",
      "Gearboxes, motors, precise motion.",
      "Visible fluid paths with reactive light.",
      "Epoxy finishes and composite parts.",
      "MQTT cloud and QR-code visitor control.",
      "Audio guide in multiple languages.",
    ],
    capTitles: [
      "Additive Manufacturing & Finishing",
      "Mechatronics & Motion Control",
      "Fluid Dynamics & Reaction Lighting",
      "Epoxy Art & Composites",
      "IoT & Cloud (MQTT, QR-code)",
      "Multilingual Audio Guide",
    ],
    workflowTitle: "Visualizing Ideas Before Production Begins",
    phases: [
      { t: "Phase 1 — AI Conceptual Rendering", d: "First visual concept from your plant layout." },
      { t: "Phase 2 — CAD Optimization", d: "Wall thickness, stability and printability tuned." },
      { t: "Phase 3 — Final Realized Model", d: "Printed, painted, assembled and inspected." },
    ],
    phaseNote:
      "Minor geometry changes occur between Phase 1 and Phase 3 for structural strength and safe transport.",
    scopeTitle: "ATEC Project Scope",
    scope: [
      "Suspended conical reactor tank on a cantilevered C-arm support.",
      "Baseplate: wooden core with 3mm Aluminium Composite Panel (Dibond / RAL9006 silver metallic).",
      "CNC-engraved ATEC logo in the baseplate.",
    ],
    pricingTitle: "Modular Pricing Tiers",
    tiers: ["Essential 3D", "Dynamic Rotation", "Ultimate Interactive"],
    tierPrices: ["4,650 € – 5,160 €", "5,450 € – 5,960 €", "Custom Offer"],
    features: [
      "PETG 3D Printing",
      "Silver Metallic Finish",
      "Aluminium Base + CNC Logo",
      "Manual C-Arm & Tank Layout",
      "Automated 45° Tank Rotation",
      "Custom Gearbox & Micro-Motor",
      "Transparent Fluid Piping + LED/Optics",
      "Base Push-Button Control",
    ],
    priceNote:
      "+800 € design fee applies only if print-ready 3D CAD files are not supplied by ATEC.",
    legalTitle: "Payment & Legal",
    legal: [
      "40% down payment at kick-off.",
      "60% on final inspection before delivery.",
      "Freiberufliche Ingenieurdienstleistungen.",
      "Werkvertrag / Dienstvertrag per German BGB.",
    ],
    preparedFor: "Prepared for ATEC Pharmatechnik GmbH (atec-pharma.com)",
    firm: "K4-Engineering | Freiberufliches Ingenieurbüro, Augsburg",
    accept: "ACCEPT OFFER / REQUEST CALL",
    pdf: "DOWNLOAD PDF PROPOSAL",
    prev: "Previous image",
    next: "Next image",
  },
} as const;

const navIds = ["portfolio", "workflow", "capabilities", "pricing", "legal", "contact"];
const capIcons = [Boxes, Cog, Droplets, Layers, Radio, Languages];

const matrix: boolean[][] = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, false, false],
  [false, true, true],
  [false, true, true],
  [false, false, true],
  [false, false, true],
];

function Heading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="flex scroll-mt-24 items-stretch gap-4">
      <span className="block w-1 shrink-0 self-stretch bg-primary" />
      <h2 className="text-2xl font-bold leading-tight text-primary sm:text-3xl">{children}</h2>
    </div>
  );
}

function TierGallery({ files, labels }: { files: [string, string]; labels: { prev: string; next: string } }) {
  const [i, setI] = useState(0);
  return (
    <div className="mt-6">
      <Slot filename={files[i]} ratio="aspect-[16/9]" />
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          aria-label={labels.prev}
          onClick={() => setI((v) => (v === 0 ? 1 : 0))}
          className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {[0, 1].map((d) => (
            <span
              key={d}
              className={`h-1.5 w-1.5 rounded-full ${d === i ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={labels.next}
          onClick={() => setI((v) => (v === 0 ? 1 : 0))}
          className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function AtecOffer() {
  const [lang, setLang] = useState<"de" | "en">("de");
  const c = t[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1 — TOP BAR */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
          <Slot filename="logo-k4.png" ratio="h-10" className="w-28 object-contain" />
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {c.nav.map((label, i) => (
              <a
                key={navIds[i]}
                href={`#${navIds[i]}`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setLang(lang === "de" ? "en" : "de")}
            aria-label="Switch language"
            className="border border-primary px-3 py-1.5 text-xs font-semibold tracking-wider text-primary"
          >
            {lang === "de" ? "DE / EN" : "EN / DE"}
          </button>
        </div>
      </header>

      {/* 2 — HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="flex items-stretch gap-4">
            <span className="block w-1 shrink-0 self-stretch bg-primary" />
            <div>
              <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
                K4-Engineering |{" "}
                <span className="text-primary">
                  Custom Exhibition Scale Models &amp; Interactive Prototypes
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{c.heroSub}</p>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{c.heroValue}</p>
            </div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <Slot filename="hero-1.jpg" ratio="aspect-[16/10]" />
            <Slot filename="hero-2.jpg" ratio="aspect-[16/10]" />
          </div>
        </div>
      </section>

      {/* 3 — PORTFOLIO + CAPABILITIES */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="portfolio">{c.portfolioTitle}</Heading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["tree-1.jpg", "tree-2.jpg", "tree-3.jpg", "tree-4.jpg"].map((f) => (
              <Slot key={f} filename={f} />
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{c.portfolioL1}</p>
          <p className="mt-1 text-sm text-muted-foreground">{c.portfolioL2}</p>

          <div id="capabilities" className="mt-20 scroll-mt-24">
            <Heading>{c.capsTitle}</Heading>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.capTitles.map((title, i) => {
                const Icon = capIcons[i];
                return (
                  <div key={title} className="rounded-lg border border-border bg-card p-6">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-4 text-base font-bold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.caps[i]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4 — WORKFLOW */}
      <section className="border-y border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="workflow">{c.workflowTitle}</Heading>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {c.phases.map((p, i) => (
              <div key={p.t} className="rounded-lg border border-border bg-card p-6">
                <Slot filename={`phase-${i + 1}.jpg`} ratio="aspect-[16/10]" />
                <h3 className="mt-5 text-base font-bold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">{c.phaseNote}</p>
        </div>
      </section>

      {/* 5 — ATEC SCOPE */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading>{c.scopeTitle}</Heading>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <ul className="space-y-4">
              {c.scope.map((s) => (
                <li key={s} className="border-l-2 border-primary pl-4 text-sm leading-7 text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
            <div className="grid gap-5 sm:grid-cols-2">
              <Slot filename="skid-1.jpg" />
              <Slot filename="skid-2.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* 6 — PRICING */}
      <section className="border-y border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="pricing">{c.pricingTitle}</Heading>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {c.tiers.map((tier, ti) => (
              <div
                key={tier}
                className="flex flex-col rounded-lg border border-border border-t-4 border-t-primary bg-card p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Tier {ti + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold">{tier}</h3>
                <p className="mt-3 text-2xl font-bold text-primary">{c.tierPrices[ti]}</p>
                <TierGallery
                  files={[`tier${ti + 1}-a.jpg`, `tier${ti + 1}-b.jpg`]}
                  labels={{ prev: c.prev, next: c.next }}
                />
                <ul className="mt-6 space-y-3">
                  {c.features.map((f, fi) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      {matrix[fi][ti] ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-label="included" />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-label="not included" />
                      )}
                      <span className={matrix[fi][ti] ? "" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">{c.priceNote}</p>
        </div>
      </section>

      {/* 7 — LEGAL */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="legal">{c.legalTitle}</Heading>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {c.legal.map((l) => (
              <li key={l} className="border-l-2 border-primary pl-4 text-sm leading-7 text-muted-foreground">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — FOOTER */}
      <footer id="contact" className="scroll-mt-24 border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <Slot filename="logo-atec.png" ratio="h-20" className="w-48 object-contain" />
            <Slot filename="clientsite.jpg" ratio="aspect-[16/9]" className="lg:col-span-2" />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{c.preparedFor}</p>
          <p className="mt-1 text-sm text-muted-foreground">{c.firm}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:kareem@k4-engineering.eu"
              className="bg-primary px-8 py-4 text-center text-sm font-semibold tracking-wide text-primary-foreground"
            >
              {c.accept}
            </a>
            <a
              href="/images/atec/atec-offer.pdf"
              className="border-2 border-primary px-8 py-4 text-center text-sm font-semibold tracking-wide text-primary"
            >
              {c.pdf}
            </a>
          </div>
          <p className="mt-10 text-xs text-muted-foreground">
            © 2026 K4-Engineering — Freiberufliches Ingenieurbüro
          </p>
        </div>
      </footer>
    </div>
  );
}
