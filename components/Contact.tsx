import type { Profile } from "@/types/content";
import { ExternalLink } from "./ExternalLink";

export function Contact({ profile }: { profile: Profile }) {
  const { github, scholar, linkedin } = profile.links;
  return (
    <dl className="pf-kv">
      <div className="contents">
        <dt>github</dt>
        <dd>
          <ExternalLink href={github.url}>{github.label}</ExternalLink>
        </dd>
      </div>
      {scholar && (
        <div className="contents">
          <dt>scholar</dt>
          <dd>
            <ExternalLink href={scholar.url}>{scholar.label}</ExternalLink>
          </dd>
        </div>
      )}
      <div className="contents">
        <dt>linkedin</dt>
        <dd>
          <ExternalLink href={linkedin.url}>{linkedin.label}</ExternalLink>
        </dd>
      </div>
    </dl>
  );
}
