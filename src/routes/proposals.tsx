import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight, FileText, Calendar, Building2 } from "lucide-react";

export const Route = createFileRoute("/proposals")({
  head: () => ({
    meta: [
      { title: "Client Proposals — K4-Engineering" },
      { name: "description", content: "Browse custom client proposals from K4-Engineering: interactive exhibitions, IoT systems and bespoke engineering programs." },
      { property: "og:title", content: "Client Proposals — K4-Engineering" },
      { property: "og:description", content: "Custom engineering proposals — interactive, measurable, deliverable." },
    ],
  }),
  component: ProposalsPage,
});

const proposals = [
  {
    title: "Interactive CVRM Exhibition Proposal for [Client Name]",
    tag: "Exhibition · IoT",
    date: "Q3 2026",
    org: "Confidential",
    summary:
      "A walk-through, sensor-driven installation translating cardiovascular risk metrics into a tangible, interactive experience — combining 3D-printed organ models, live biosignals and ambient data art.",
  },
  {
    title: "Smart Urban Tree Monitoring — Pilot Program",
    tag: "IoT · Municipal",
    date: "2026",
    org: "Sample placeholder",
    summary:
      "Deploy 25 K4 sap-flow nodes across a city district, with a public dashboard and automated irrigation control valves.",
  },
  {
    title: "Bespoke Mechatronic Prototype Sprint",
    tag: "Hardware · Rapid",
    date: "Rolling",
    org: "Sample placeholder",
    summary:
      "A 6-week sprint from idea to working prototype: CAD, PCB, firmware, and a polished demo enclosure ready for investor showcase.",
  },
];

function ProposalsPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Client Proposals</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Tailored briefs, <span className="text-gradient-neon">engineered to deliver.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl">
              Each proposal is a private, scoped engagement — combining hardware, software and storytelling.
              Reach out for an access link to your project.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proposals.map((p, i) => (
            <article
              key={p.title}
              className="reveal group rounded-xl border border-border bg-card/60 p-6 flex flex-col hover:border-primary/50 hover:bg-card transition"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-primary/30 text-primary">
                  <FileText className="w-3 h-3" />
                  {p.tag}
                </span>
                <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground flex-1">{p.summary}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Building2 className="w-3 h-3" />{p.org}</span>
                <button className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all text-sm font-semibold">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-16">
          <div className="reveal rounded-2xl border border-border bg-card/60 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">Need a private proposal link?</h2>
              <p className="mt-2 text-sm text-muted-foreground">We'll prepare a confidential scope, timeline and price for your brief.</p>
            </div>
            <div className="flex gap-3">
              <a href="mailto:hello@k4-engineering.eu" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition">Request Access</a>
              <Link to="/" className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:border-primary/60 hover:text-primary transition">Back Home</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
