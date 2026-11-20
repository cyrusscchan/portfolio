import type { Publication } from "@/types/content";
import { CopyBibtex } from "./CopyBibtex";
import { ExternalLink } from "./ExternalLink";

export function PublicationEntry({ pub, index }: { pub: Publication; index: number }) {
  const links = [
    { label: "URL", url: pub.links.url },
    { label: "PDF", url: pub.links.pdf },
    { label: "Code", url: pub.links.code },
  ].filter((link): link is { label: string; url: string } => Boolean(link.url));

  return (
    <article className="pf-pub" id={pub.id}>
      <span className="text-small text-ink-muted">[{index}]</span>
      <div>
        <h3 className="m-0 text-subtitle font-semibold">{pub.title}</h3>
        <p className="m-0 text-small text-ink-muted">
          {pub.authors.map((author, i) => (
            <span key={`${author.name}-${i}`}>
              {i > 0 && ", "}
              {author.me ? <b className="font-semibold text-ink">{author.name}</b> : author.name}
            </span>
          ))}
        </p>
        <p className="m-0 text-small text-ink-muted">
          {pub.venue} {pub.year}
          {pub.pages && ` · pp. ${pub.pages}`}
        </p>
        <div className="no-print mt-2 flex flex-wrap gap-4 text-small">
          {links.map((link) => (
            <ExternalLink key={link.label} href={link.url}>
              {link.label}
            </ExternalLink>
          ))}
          <CopyBibtex bibtex={pub.bibtex} />
        </div>
      </div>
    </article>
  );
}
