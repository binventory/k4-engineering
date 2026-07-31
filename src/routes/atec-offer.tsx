import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/atec-offer")({
  head: () => ({
    meta: [
      { title: "ATEC Pharmatechnik Offer — K4-Engineering Scale Models" },
      {
        name: "description",
        content:
          "Project offer for ATEC Pharmatechnik GmbH: custom exhibition scale models and interactive prototypes of industrial process skids by K4-Engineering.",
      },
      { property: "og:title", content: "ATEC Pharmatechnik Offer — K4-Engineering" },
      {
        property: "og:description",
        content:
          "Custom exhibition scale models, modular pricing tiers and terms for ATEC Pharmatechnik GmbH.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AtecOffer,
});

/* ---------- Placeholder slots (swap real files in later) ---------- */
const LOGO1 = "LOGO1";
const LOGO_ATEC = "LOGO_ATEC";
const IMG_HERO = "IMG_HERO";
const IMG_P1 = "IMG_P1";
const IMG_P2 = "IMG_P2";
const IMG_P3 = "IMG_P3";
const IMG_P4 = "IMG_P4";
const VID_P1 = "VID_P1";
const IMG_EVO1 = "IMG_EVO1";
const IMG_EVO2 = "IMG_EVO2";
const IMG_EVO3 = "IMG_EVO3";
const IMG_SCOPE = "IMG_SCOPE";
const IMG_PRICE1 = "IMG_PRICE1";
const IMG_PRICE2 = "IMG_PRICE2";
const IMG_PRICE3 = "IMG_PRICE3";
const IMG_CLIENTSITE = "IMG_CLIENTSITE";
const EMAIL = "{{EMAIL}}";
const PHONE = "{{PHONE}}";

const ORANGE = "#F68518";

function Slot({
  name,
  className = "",
  ratio = "aspect-[4/3]",
  dark = false,
}: {
  name: string;
  className?: string;
  ratio?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={name}
      className={`${ratio} ${className} flex items-center justify-center border-2 border-dashed`}
      style={{
        background: dark ? "#4A4A4A" : "#EDEDED",
        borderColor: dark ? "#6A6A6A" : "#BFBFBF",
        color: dark ? "#EDEDED" : "#7A7A7A",
      }}
    >
      <span className="text-xs sm:text-sm font-semibold tracking-[0.15em]">{name}</span>
    </div>
  );
}

function Bar() {
  return <span className="block w-1 self-stretch shrink-0" style={{ background: ORANGE }} />;
}

function Heading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="flex gap-4 items-stretch scroll-mt-24">
      <Bar />
      <h2 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: ORANGE }}>
        {children}
      </h2>
    </div>
  );
}

const nav = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Scope", href: "#scope" },
  { label: "Pricing", href: "#pricing" },
  { label: "Terms", href: "#terms" },
  { label: "Contact", href: "#contact" },
];

function AtecOffer() {
  return (
    <div style={{ background: "#FFFFFF", color: "#333333" }} className="min-h-screen font-sans">
      {/* HEADER */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "#FFFFFF", borderColor: "#E3E3E3" }}
      >
        <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between gap-6">
          {/* LOGO1 */}
          <Slot name={LOGO1} ratio="h-10 w-28" />
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="transition-colors"
                style={{ color: "#333333" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333333")}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="text-xs font-semibold tracking-wider px-3 py-1.5 border"
            style={{ borderColor: ORANGE, color: ORANGE }}
          >
            DE / EN
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "#F4F4F4" }}>
        <div className="absolute inset-0 opacity-30">
          {/* IMG_HERO */}
          <Slot name={IMG_HERO} ratio="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="flex gap-4 items-stretch">
            <Bar />
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight" style={{ color: "#333333" }}>
                K4-Engineering |{" "}
                <span style={{ color: ORANGE }}>
                  Custom Exhibition Scale Models &amp; Interactive Prototypes
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg max-w-2xl" style={{ color: "#555555" }}>
                Tailored Industrial Showcase Solutions for ATEC Pharmatechnik GmbH
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — PORTFOLIO */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="portfolio">Bringing Industrial Process Skids to Life</Heading>
          <p className="mt-6 max-w-3xl leading-8">
            As a specialized engineering partner, we transform complex industrial process plants
            into high-precision, tactile scale models built specifically for trade show floors and
            corporate showrooms.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* IMG_P1 IMG_P2 IMG_P3 IMG_P4 */}
            <Slot name={IMG_P1} />
            <Slot name={IMG_P2} />
            <Slot name={IMG_P3} />
            <Slot name={IMG_P4} />
            {/* VID_P1 — 16:9 video player slot */}
            <Slot name={VID_P1} ratio="aspect-video" className="sm:col-span-2" />
          </div>

          <div className="mt-20">
            <div className="flex gap-4 items-stretch">
              <Bar />
              <h3 className="text-xl font-bold" style={{ color: ORANGE }}>
                Evolution of a Model
              </h3>
            </div>
            <p className="mt-5 max-w-3xl leading-8">
              This transparency highlights how designs evolve for optimal additive manufacturing and
              physical stability.
            </p>

            <div className="mt-10 flex flex-col md:flex-row md:items-start gap-6">
              {[
                { img: IMG_EVO1, title: "Phase 1 — AI Conceptual Rendering", cap: "Initial visual concept generated and refined against the client's plant layout." },
                { img: IMG_EVO2, title: "Phase 2 — Design Adaptation", cap: "CAD adaptation for printability, wall thickness and structural stability." },
                { img: IMG_EVO3, title: "Phase 3 — Final Realized Model", cap: "Printed, sanded, primed and metallic-finished physical exhibition model." },
              ].map((p, i) => (
                <div key={p.img} className="flex-1 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full">
                    <Slot name={p.img} />
                    <h4 className="mt-4 text-sm font-bold" style={{ color: "#333333" }}>
                      {p.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7" style={{ color: "#666666" }}>
                      {p.cap}
                    </p>
                  </div>
                  {i < 2 && (
                    <span
                      aria-hidden
                      className="text-3xl font-light rotate-90 md:rotate-0 self-center"
                      style={{ color: ORANGE }}
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SCOPE */}
      <section className="py-20 sm:py-24" style={{ background: "#F4F4F4" }}>
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="scope">Proposed Exhibition Model for ATEC Process Skid</Heading>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
              {[
                {
                  t: "Manufacturing Technique",
                  d: "Built using high-grade PETG via advanced 3D printing, finished with intensive hand-sanding, primer filler spray, and multi-stage metallic silver painting to mimic true stainless steel industrial equipment.",
                },
                {
                  t: "Baseplate Integration",
                  d: "Mounted on a sturdy wooden base skinned with a premium 3mm Aluminium Composite Panel (Dibond / RAL9006 silver metallic), featuring CNC-engraved company logos for a high-end corporate presentation finish.",
                },
              ].map((c) => (
                <div key={c.t} className="border p-7" style={{ background: "#FFFFFF", borderColor: "#E3E3E3" }}>
                  <div className="w-10 h-1 mb-5" style={{ background: ORANGE }} />
                  <h3 className="text-lg font-bold" style={{ color: "#333333" }}>{c.t}</h3>
                  <p className="mt-3 text-sm leading-7">{c.d}</p>
                </div>
              ))}
            </div>
            {/* IMG_SCOPE */}
            <Slot name={IMG_SCOPE} ratio="aspect-[3/4]" />
          </div>
        </div>
      </section>

      {/* SECTION 3 — PRICING */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="pricing">Transparent Pricing &amp; Customization Tiers</Heading>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Base */}
            <div className="border p-8 flex flex-col" style={{ borderColor: "#D8D8D8", borderTopWidth: 4, borderTopColor: "#333333" }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#888888" }}>
                Base Model
              </p>
              <h3 className="mt-2 text-xl font-bold" style={{ color: "#333333" }}>
                Mechanical &amp; Aesthetic Finish
              </h3>
              {/* IMG_PRICE1 */}
              <Slot name={IMG_PRICE1} ratio="aspect-[16/9]" className="mt-6" />
              <p className="mt-6 text-sm leading-7 flex-1">
                Full 3D physical representation of the skid, PETG printing, professional
                sanding/painting, aluminum composite baseplate with CNC engraving of the ATEC logo,
                and manual structural layout.
              </p>
              <p className="mt-6 text-3xl font-bold" style={{ color: ORANGE }}>4,650 € – 5,160 €</p>
              <p className="mt-4 text-xs leading-6" style={{ color: "#777777" }}>
                Base price applies if a clean, print-ready 3D CAD model is provided. If full 3D
                redesign/editing is required from drawings or references, an additional design fee
                of +800 € applies.
              </p>
            </div>

            {/* Upgrade 1 */}
            <div className="border p-8 flex flex-col" style={{ borderColor: "#D8D8D8", borderTopWidth: 4, borderTopColor: ORANGE }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
                Upgrade
              </p>
              <h3 className="mt-2 text-xl font-bold" style={{ color: "#333333" }}>
                LED &amp; Fiber-Optic Lighting
              </h3>
              {/* IMG_PRICE2 */}
              <Slot name={IMG_PRICE2} ratio="aspect-[16/9]" className="mt-6" />
              <p className="mt-6 text-sm leading-7 flex-1">
                Integration of transparent fluid-path piping filled with internal LED strips or
                optical fibers to visually simulate active chemical/fluid flow, controlled via an
                integrated base power switch.
              </p>
              <p className="mt-6 text-lg font-semibold" style={{ color: ORANGE }}>
                Configured per custom layout package
              </p>
            </div>

            {/* Upgrade 2 */}
            <div className="border p-8 flex flex-col" style={{ borderColor: "#D8D8D8", borderTopWidth: 4, borderTopColor: ORANGE }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
                Upgrade
              </p>
              <h3 className="mt-2 text-xl font-bold" style={{ color: "#333333" }}>
                Fully Automated Motorized Rotation System
              </h3>
              {/* IMG_PRICE3 */}
              <Slot name={IMG_PRICE3} ratio="aspect-[16/9]" className="mt-6" />
              <p className="mt-6 text-sm leading-7 flex-1">
                Integration of custom internal gears, a micro-electric motor, control electronics,
                and automated programming to allow the main front reactor tank to smoothly rotate
                45° right and left automatically (zero manual movement required).
              </p>
              <p className="mt-6 text-3xl font-bold" style={{ color: ORANGE }}>+800 €</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TERMS */}
      <section className="py-20 sm:py-24" style={{ background: "#F4F4F4" }}>
        <div className="mx-auto max-w-6xl px-6">
          <Heading id="terms">Project Terms &amp; Conditions (Freiberufler Ingenieurbüro)</Heading>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold" style={{ color: "#333333" }}>Payment Terms</h3>
              <div className="mt-6 space-y-6">
                {[
                  { t: "40% Down Payment", d: "Due upon project start to secure raw materials, components, and immediate production scheduling." },
                  { t: "60% Final Payment", d: "Due upon successful completion and delivery approval prior to shipping/handover." },
                ].map((p) => (
                  <div key={p.t} className="pl-5 border-l-4" style={{ borderColor: ORANGE }}>
                    <p className="font-semibold" style={{ color: "#333333" }}>{p.t}</p>
                    <p className="mt-2 text-sm leading-7">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold" style={{ color: "#333333" }}>
                Legal Status &amp; Contract Structure
              </h3>
              <div className="mt-6 space-y-6">
                {[
                  { t: "Contract Classification", d: "In accordance with German tax and commercial law, this contract falls under the legal framework for Freiberufliche Ingenieurdienstleistungen (Freelance Engineering Services) operated via an Ingenieurbüro." },
                  { t: "Contract Subject", d: "The formal scope of work is defined as the engineering, customized 3D design adaptation, and physical prototype creation of a bespoke technical scale model (\u201CEntwurf und Erstellung eines kundenspezifischen 3D-Modells und Funktionsprototypen\u201D)." },
                  { t: "Legal Compliance Notice", d: "This offer and subsequent project execution comply fully with German regulations concerning independent engineering freelancers (Selbstständige Freiberufler / Ingenieure), ensuring an independent service contract (Dienst- / Werkvertrag) tailored for professional B2B technical deliverables." },
                ].map((p) => (
                  <div key={p.t}>
                    <p className="font-semibold text-sm" style={{ color: ORANGE }}>{p.t}</p>
                    <p className="mt-2 text-sm leading-7">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT REFERENCE */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Heading>Prepared for</Heading>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-8">
            {/* LOGO_ATEC */}
            <Slot name={LOGO_ATEC} ratio="h-24 w-56" />
            <p className="text-sm leading-7 max-w-xl">
              ATEC Pharmatechnik GmbH — process plant engineering for the pharmaceutical and
              chemical industries.
            </p>
          </div>
          <figure className="mt-10">
            {/* IMG_CLIENTSITE */}
            <Slot name={IMG_CLIENTSITE} ratio="aspect-[21/9]" />
            <figcaption className="mt-3 text-xs" style={{ color: "#777777" }}>
              ATEC Pharmatechnik GmbH — atec-pharma.com
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 scroll-mt-24" style={{ background: "#F4F4F4" }}>
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="px-8 py-4 text-sm font-semibold tracking-wide"
            style={{ background: ORANGE, color: "#FFFFFF" }}
          >
            Accept Offer / Contact Us
          </button>
          <button
            type="button"
            className="px-8 py-4 text-sm font-semibold tracking-wide border-2"
            style={{ borderColor: ORANGE, color: ORANGE }}
          >
            Download PDF
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#3A3A3A", color: "#E5E5E5" }} className="py-14">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 sm:grid-cols-3 items-start">
          {/* LOGO1 (light version) */}
          <Slot name={LOGO1} ratio="h-12 w-32" dark />
          <div className="text-sm leading-7">
            <p>{EMAIL}</p>
            <p>{PHONE}</p>
          </div>
          <p className="text-xs sm:text-right" style={{ color: "#B5B5B5" }}>
            © 2026 K4-Engineering — Freiberufliches Ingenieurbüro
          </p>
        </div>
      </footer>
    </div>
  );
}
