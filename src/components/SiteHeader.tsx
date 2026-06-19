import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-display font-bold text-lg">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground font-bold text-base shadow-[0_0_16px_var(--neon)]"
            style={{ fontFamily: "'Tinos', 'Times New Roman', serif", letterSpacing: "0.02em" }}
          >
            K4
          </span>
          <span>Engineering</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/#expertise" className="hover:text-foreground transition">Expertise</a>
          <a href="/#projects" className="hover:text-foreground transition">Projects</a>
          <a href="/#process" className="hover:text-foreground transition">Process</a>
          <Link to="/proposals" className="hover:text-foreground transition">Proposals</Link>
        </nav>
        <a
          href="mailto:kareem@k4-engineering.eu"
          className="hidden sm:inline-flex items-center text-sm px-4 py-2 rounded-md border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
