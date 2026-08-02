import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Lock, LoaderCircle } from "lucide-react";
import { unlockProposal } from "@/lib/gate.functions";

export function ClientAccessGate() {
  const router = useRouter();
  const unlock = useServerFn(unlockProposal);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBusy(true);
    setError(false);
    try {
      const { ok } = await unlock({ data: { password } });
      if (ok) {
        await router.invalidate();
      } else {
        setError(true);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-hero)] opacity-80" />

      <div className="relative w-full max-w-md animate-[reveal-up_0.7s_ease] rounded-2xl border border-border bg-card/80 p-8 shadow-[var(--shadow-elegant)] backdrop-blur-xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--gradient-neon)] font-display text-xl font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            K4
          </div>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            K4-Engineering
          </p>
          <h1 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
            Confidential Engineering Proposal
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Prepared exclusively for ATEC Pharmatechnik GmbH
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Client Access Password
            </span>
            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="••••••••••••"
                aria-invalid={error}
                className="w-full rounded-lg border border-input bg-background/60 py-3 pl-10 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </label>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              Invalid Access Code. Please check your invitation email.
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--gradient-neon)] px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Unlock Proposal
          </button>
        </form>

        <p className="mt-6 flex items-start gap-2 text-[11px] leading-5 text-muted-foreground">
          <Lock className="mt-0.5 h-3 w-3 shrink-0" />
          Confidential B2B document. Access is restricted to authorised ATEC Pharmatechnik GmbH
          personnel.
        </p>
      </div>
    </div>
  );
}
