import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ParticleField } from "@/components/ParticleField";
import heroBg from "@/assets/hero-bg.jpg";
import treeBoothHauraton from "@/assets/tree/booth-hauraton.jpg.asset.json";
import tree3dModel from "@/assets/tree/3d-model.jpg.asset.json";
import treeBoothIris3 from "@/assets/tree/booth-iris3.jpg.asset.json";
import treePrototype from "@/assets/tree/prototype.jpg.asset.json";
import treePrint from "@/assets/tree/print.jpg.asset.json";
import treeIlluminated from "@/assets/tree/illuminated.jpg.asset.json";

const treeGallery = [
  { src: treeIlluminated.url, caption: "Illuminated prototype — RGB sap-flow visualization" },
  { src: treePrototype.url, caption: "Translucent trunk housing with sensor electronics" },
  { src: tree3dModel.url, caption: "Parametric 3D model — bark topology in CAD" },
  { src: treePrint.url, caption: "Vase-mode FDM print in progress" },
  { src: treeBoothHauraton.url, caption: "Exhibited at Hauraton — Baumpflegetage 2026" },
  { src: treeBoothIris3.url, caption: "Live demo at the IRIS3 Baum booth" },
];
import {
  Boxes, Printer, Cpu, Radio, Sparkles, ArrowRight, Lightbulb,
  PenTool, Cog, Wifi, LineChart,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "K4-Engineering — Making the Invisible Visible" },
      { name: "description", content: "An engineering & design firm blending 3D design, 3D printing, mechatronics, IoT and art. Founded by a former Airbus Manufacturing & Automation Engineer." },
      { property: "og:title", content: "K4-Engineering — Making the Invisible Visible" },
      { property: "og:description", content: "Hardware. Software. IoT. Art. Engineered in Europe." },
    ],
  }),
  component: Landing,
});

const expertise = [
  { icon: Boxes, title: "3D Design & Prototyping", text: "Parametric CAD, generative geometry, and rapid functional prototypes." },
  { icon: Printer, title: "Advanced 3D Printing", text: "FDM, SLA and SLS production for engineering-grade parts and enclosures." },
  { icon: Cpu, title: "Mechatronics & Hardware", text: "Custom PCBs, sensors, actuators and embedded firmware for precise control." },
  { icon: Radio, title: "Software & IoT Integration", text: "Edge-to-cloud pipelines, real-time dashboards and automated control loops." },
  { icon: Sparkles, title: "Artistic Data Visualization", text: "Turning signals and datasets into sculptural, interactive experiences." },
];

const steps = [
  { icon: Lightbulb, title: "01 — Discover", text: "Workshop the problem, the audience and the invisible signal to surface." },
  { icon: PenTool, title: "02 — Design", text: "Mechanical CAD, PCB schematics and software architecture in parallel." },
  { icon: Cog, title: "03 — Fabricate", text: "3D-print enclosures, assemble electronics, flash firmware, iterate fast." },
  { icon: Wifi, title: "04 — Connect", text: "Wire up IoT telemetry, cloud sync and control logic." },
  { icon: LineChart, title: "05 — Reveal", text: "Ship a tangible, interactive model with live data — public-ready." },
];

function Landing() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <ParticleField />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs text-primary backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Founded by a former Airbus Manufacturing &amp; Automation Engineer
            </div>
            <h1 className="reveal mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              K4 Engineering: <span className="text-gradient-neon">Making the Invisible Visible.</span>
            </h1>
            <p className="reveal mt-6 text-lg text-muted-foreground max-w-2xl">
              Bridging the gap between physical reality and digital insight through
              3D Design, 3D Printing, Hardware, Software, IoT — and a touch of Art.
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-110 transition"
              >
                Discover Our Innovations
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              <Link
                to="/proposals"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-6 py-3 text-sm font-semibold hover:border-primary/60 hover:text-primary transition"
              >
                View Proposals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Our Expertise</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">A studio at the intersection of disciplines.</h2>
            <p className="mt-4 text-muted-foreground">
              Five capabilities, one toolkit — from first sketch to a connected, physical artefact.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((e, i) => (
              <div
                key={e.title}
                className="reveal group relative rounded-xl border border-border bg-card/60 p-6 hover:border-primary/50 hover:bg-card transition"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <e.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="projects" className="py-24 bg-navy-deep/40 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Featured Project</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">The Smart Tree IoT System</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Debuted at the <span className="text-foreground">Baumpflegetag Fair in Augsburg, May 2026</span>.
            </p>
            <p className="mt-5 text-muted-foreground">
              We developed an innovative IoT sensor system that measures liquid and sap flow inside a
              tree in real-time. The system generates a comprehensive digital health profile for the
              tree and automatically controls precise watering and supplement values.
            </p>
          </div>

          <div className="reveal mt-12 grid gap-6 lg:grid-cols-5">
            <figure className="lg:col-span-3 rounded-xl overflow-hidden border border-border bg-card/60 relative">
              <img
                src={treeIlluminated.url}
                alt="Illuminated 3D-printed Smart Tree prototype showing RGB sap-flow visualization"
                loading="lazy"
                className="w-full h-full max-h-[520px] object-cover"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4 text-sm">
                Live RGB visualization of sap-flow data inside the translucent trunk
              </figcaption>
            </figure>
            <div className="lg:col-span-2 grid gap-6">
              <figure className="rounded-xl overflow-hidden border border-border bg-card/60">
                <img src={tree3dModel.url} alt="CAD render of the parametric tree trunk geometry" loading="lazy" className="w-full h-48 object-cover" />
                <figcaption className="p-3 text-xs text-muted-foreground">Parametric CAD — bark topology</figcaption>
              </figure>
              <figure className="rounded-xl overflow-hidden border border-border bg-card/60">
                <img src={treeBoothHauraton.url} alt="Smart Tree on display at the Hauraton booth" loading="lazy" className="w-full h-48 object-cover" />
                <figcaption className="p-3 text-xs text-muted-foreground">Exhibited at Hauraton — Baumpflegetage 2026</figcaption>
              </figure>
            </div>
          </div>

          {/* Project gallery */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treeGallery.map((g, i) => (
              <figure
                key={g.src}
                className="reveal group rounded-xl overflow-hidden border border-border bg-card/60 hover:border-primary/50 transition"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <figcaption className="p-3 text-xs text-muted-foreground">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Methodology</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">From concept to a physical, interactive IoT model.</h2>
          </div>

          <ol className="mt-14 relative grid gap-8 md:grid-cols-5">
            <div aria-hidden className="hidden md:block absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="reveal relative"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-full border border-primary/40 bg-background flex items-center justify-center text-primary relative z-10 shadow-[0_0_24px_oklch(0.82_0.18_195_/_0.3)]">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 text-sm font-semibold tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="reveal rounded-2xl border border-primary/30 bg-gradient-to-br from-card to-navy p-10 sm:p-14 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold">Have an invisible signal to surface?</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Let's design the hardware, the software, and the story around it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="mailto:hello@k4-engineering.eu" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition">
                  Start a Project
                </a>
                <Link to="/proposals" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold hover:border-primary/60 hover:text-primary transition">
                  View Proposals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
