import type { Skills } from "@/types/content";

export function SkillsList({ skills }: { skills: Skills }) {
  return (
    <dl className="pf-kv">
      {Object.entries(skills).map(([key, values]) => (
        <div key={key} className="contents">
          <dt>{key}</dt>
          <dd>{values.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
