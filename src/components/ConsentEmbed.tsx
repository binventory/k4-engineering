import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PlayCircle, ExternalLink } from "lucide-react";

type Props = {
  /** URL of the iframe (only loaded after the visitor clicks). */
  src: string;
  title: string;
  /** Name of the provider shown to the visitor, e.g. "LinkedIn" or "Vimeo". */
  provider: string;
  /** Optional link to the same content on the provider's site. */
  externalUrl?: string;
  externalLabel?: string;
  /** Classes for the frame / placeholder box (size, background …). */
  className?: string;
  allow?: string;
  /** Wording of the placeholder: "en" (default) or "de". */
  lang?: "en" | "de";
};

/**
 * Two-click embed: nothing is loaded from the provider until the visitor clicks
 * "Load video". Only then the iframe is created and the provider receives data
 * such as the IP address. See /datenschutz.
 */
export function ConsentEmbed({
  src,
  title,
  provider,
  externalUrl,
  externalLabel,
  className = "",
  allow = "autoplay; encrypted-media; fullscreen; picture-in-picture",
  lang = "en",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const t =
    lang === "de"
      ? {
          note: `Dieses Video liegt bei ${provider}. Erst wenn Sie auf „Video laden“ klicken, wird es von ${provider} geladen; dabei erhält ${provider} Daten wie Ihre IP-Adresse.`,
          load: "Video laden",
          privacy: "Datenschutz",
        }
      : {
          note: `This video is hosted by ${provider}. It is only loaded when you click "Load video"; ${provider} then receives data such as your IP address.`,
          load: "Load video",
          privacy: "Privacy policy",
        };

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        className={className}
        frameBorder="0"
        allow={allow}
        allowFullScreen
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-6 text-center ${className}`}
      role="group"
      aria-label={title}
    >
      <PlayCircle className="h-12 w-12 text-primary" aria-hidden />
      <p className="max-w-sm text-sm text-muted-foreground">{t.note}</p>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition"
      >
        {t.load}
      </button>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-primary"
          >
            {externalLabel ?? provider}
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
        <Link to="/datenschutz" className="underline hover:text-primary">
          {t.privacy}
        </Link>
      </div>
    </div>
  );
}
