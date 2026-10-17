import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isPlaceholder } from "@/lib/legal";

/** Page frame for the Impressum and the privacy page. */
export function LegalPage({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">{kicker}</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold">{title}</h1>
        <div className="mt-10 space-y-10 text-[15px] leading-7 text-foreground/90">{children}</div>
        <p className="mt-16 text-sm">
          <Link to="/" className="text-primary hover:underline">
            ← Home
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

export function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:underline">
        {children}
      </div>
    </section>
  );
}

/** Shows a legal value; a value that still contains "[…]" is shown as a red placeholder. */
export function V({ value }: { value: string }) {
  if (isPlaceholder(value)) {
    return (
      <span className="rounded bg-destructive/10 px-1 font-semibold text-destructive" title="Bitte in src/lib/legal.ts ausfüllen">
        {value}
      </span>
    );
  }
  return <>{value}</>;
}
