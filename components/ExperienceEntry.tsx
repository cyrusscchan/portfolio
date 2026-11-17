import type { Entry } from "@/types/content";

export function ExperienceEntry({ entry }: { entry: Entry }) {
  const dates = (
    <span className="text-small leading-6 text-ink-muted">
      {entry.start} — {entry.end}
    </span>
  );

  // Nothing to expand (e.g. education): plain row.
  if (!entry.detail && entry.bullets.length === 0) {
    return (
      <article className="pf-entry">
        {dates}
        <div>
          <h3 className="m-0 text-subtitle font-semibold">{entry.title}</h3>
          <p className="m-0 text-small text-ink-muted">{entry.org}</p>
        </div>
      </article>
    );
  }

  return (
    <details className="pf-entry pf-entry--collapsible" open={entry.open}>
      <summary>
        {dates}
        <span>
          <span className="block text-subtitle font-semibold">{entry.title}</span>
          <span className="block text-small text-ink-muted">{entry.org}</span>
        </span>
      </summary>
      <div className="pf-entry__body">
        {entry.detail && <p className="m-0">{entry.detail}</p>}
        {entry.bullets.length > 0 && (
          <ul>
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
