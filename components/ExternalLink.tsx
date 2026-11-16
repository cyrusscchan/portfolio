export function ArrowOutIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="pf-icon">
      <path d="M4.5 2.5H2.5v7h7v-2M7 2.5h2.5V5M9.5 2.5 5.5 6.5" />
    </svg>
  );
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="pf-ext" target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowOutIcon />
    </a>
  );
}
