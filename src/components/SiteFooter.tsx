export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-navy-deep/40">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display font-bold text-lg flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary" />
            K4·Engineering.eu
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Making the invisible visible — at the intersection of hardware, software, and art.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:hello@k4-engineering.eu" className="hover:text-primary">hello@k4-engineering.eu</a></li>
            <li><a href="https://www.linkedin.com" className="hover:text-primary">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Based in</h4>
          <p className="text-sm text-muted-foreground">Augsburg, Germany · Operating across the EU</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} K4-Engineering.eu — All rights reserved.
      </div>
    </footer>
  );
}
