export function SectionTitle({ id, num, children }: { id?: string; num: number; children: React.ReactNode }) {
  return (
    <h2 id={id} className="pf-section-title">
      <span className="pf-section-title__num">[{String(num).padStart(2, "0")}]</span>
      {children}
      <span className="pf-section-title__rule" aria-hidden="true" />
    </h2>
  );
}

export function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="max-w-measure pt-16">
      <SectionTitle id={`${id}-title`} num={num}>
        {title}
      </SectionTitle>
      {children}
    </section>
  );
}
