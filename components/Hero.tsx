import type { Profile } from "@/types/content";
import { ArrowOutIcon } from "./ExternalLink";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="pf-hero max-w-measure pb-8 pt-16 md:pt-24">
      <p className="pf-label m-0 mb-4 text-ink-muted">Portfolio · {profile.location}</p>
      <h1 className="m-0 text-[28px] leading-9 font-semibold tracking-[-0.01em] md:text-display">
        {profile.name}
        <span className="print-only"> {profile.surname}</span>
      </h1>
      <p className="m-0 mt-4 text-lead">
        {profile.tagline}
        <span className="pf-cursor" aria-hidden="true" />
      </p>
      <div className="no-print mt-8 flex flex-wrap gap-3">
        <a className="pf-btn pf-btn--solid" href={`mailto:${profile.email}`}>
          Email me
        </a>
        {profile.links.cv && (
          <a className="pf-btn" href={profile.links.cv}>
            Download CV
          </a>
        )}
        <a className="pf-btn" href={profile.links.github.url} target="_blank" rel="noopener noreferrer">
          GitHub
          <ArrowOutIcon />
        </a>
      </div>
    </section>
  );
}
