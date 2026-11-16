// Static annotated-essay example: highlighted spans plus rubric scores. No backend.
export function EssayScorerDetail() {
  return (
    <div>
      <div className="pf-caption mb-2">Annotated example</div>
      <p className="pf-essay m-0">
        [Sample essay sentence.] <mark>[Highlighted span the model credits for organization.]</mark> [More text]{" "}
        <mark className="weak">[span flagged as weak evidence]</mark> [continues.]
      </p>
      <p className="m-0 mt-2 text-small text-ink-muted">
        Ideas [4]/6 · Organization [5]/6 · Conventions [3]/6
      </p>
      <p className="m-0 mt-1 text-small text-ink-muted">
        Solid underline: credited evidence. Dashed underline: weak evidence.
      </p>
    </div>
  );
}
