import type { Entry } from "@/types/content";

export function ExperienceEntry({ entry }: { entry: Entry }) {
  return (
    <article className="pf-entry">
      <div className="text-small leading-6 text-ink-muted">
        {entry.start} — {entry.end}
      </div>
      <div>
        <h3 className="m-0 text-subtitle font-semibold">{entry.title}</h3>
        <p className={`m-0 text-small text-ink-muted ${entry.bullets.length ? "mb-3" : ""}`}>{entry.org}</p>
        {entry.detail && <p className="m-0 mb-3">{entry.detail}</p>}
        {entry.bullets.length > 0 && (
          <ul>
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
