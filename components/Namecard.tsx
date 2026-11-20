import QRCode from "qrcode";
import { siteUrl } from "@/lib/content";
import type { Profile } from "@/types/content";
import { ExternalLink } from "./ExternalLink";

const QUIET = 4;

// Rendered at build time: one path of 1×1 squares, filled with currentColor so it follows the theme.
function QrCode({ url }: { url: string }) {
  const { modules } = QRCode.create(url, { errorCorrectionLevel: "M" });
  const size = modules.size;
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules.get(x, y)) d += `M${x + QUIET} ${y + QUIET}h1v1h-1z`;
    }
  }
  const box = size + QUIET * 2;
  return (
    <svg
      viewBox={`0 0 ${box} ${box}`}
      role="img"
      aria-label={`QR code linking to ${url}`}
      shapeRendering="crispEdges"
      className="pf-namecard__qr"
    >
      <rect width={box} height={box} fill="var(--bg)" />
      <path d={d} fill="currentColor" />
    </svg>
  );
}

// Hidden until <html data-view="card"> (set by NamecardToggle).
export function Namecard({ profile }: { profile: Profile }) {
  const url = `${siteUrl}/`;
  const host = new URL(siteUrl).host;
  const { github, scholar, linkedin } = profile.links;

  return (
    <section aria-label="Namecard" className="pf-namecard no-print">
      <QrCode url={url} />
      <div className="pf-namecard__info">
        <p className="pf-label m-0 mb-4 text-ink-muted">{profile.location}</p>
        <p className="m-0 text-[28px] leading-9 font-semibold tracking-[-0.01em] md:text-display">
          {profile.name} {profile.surname}
        </p>
        <p className="m-0 mt-4 text-lead">{profile.tagline}</p>
        <hr className="my-6 border-0 border-t border-dashed border-rule" />
        <dl className="pf-kv">
          <div className="contents">
            <dt>web</dt>
            <dd>
              <a href={url}>{host}</a>
            </dd>
          </div>
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
      </div>
    </section>
  );
}
