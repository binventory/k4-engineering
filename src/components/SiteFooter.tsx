import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-navy-deep/40">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display font-bold text-lg flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground font-bold text-base"
              style={{ fontFamily: "'Tinos', 'Times New Roman', serif", letterSpacing: "0.02em" }}
            >
              K4
            </span>
            <span>Engineering.eu</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Making the invisible visible — at the intersection of hardware, software, and art.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:kareem@k4-engineering.eu" className="hover:text-primary">kareem@k4-engineering.eu</a></li>
            <li><a href="https://www.linkedin.com" className="hover:text-primary">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Based in</h4>
          <p className="text-sm text-muted-foreground">Augsburg, Germany · Operating across the EU</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 px-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} K4-Engineering.eu — All rights reserved.</span>
        <nav aria-label="Legal" className="flex gap-4">
          <Link to="/impressum" className="hover:text-primary">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-primary">Datenschutz / Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
