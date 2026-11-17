import type { Project } from "@/types/content";
import { ExternalLink } from "./ExternalLink";
import { MetricsTable } from "./MetricsTable";

export function ProjectDetails({
  project,
  hidden,
  rich,
}: {
  project: Project;
  hidden?: boolean;
  rich?: React.ReactNode;
}) {
  return (
    <details className="pf-project" id={project.slug} open={project.open} hidden={hidden}>
      <summary>
        <span className="font-semibold">{project.name}</span>
        <span className="flex gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="pf-tag">
              {tag}
            </span>
          ))}
        </span>
        <span className="pf-project__blurb">{project.blurb}</span>
      </summary>
      <div className="pf-project__body">
        {project.summary && <p className="m-0 text-[14px] leading-[22px]">{project.summary}</p>}
        {project.pipeline && (
          <div>
            <div className="pf-caption mb-2">Pipeline</div>
            <pre className="pf-ascii" role="img" aria-label={project.pipeline.label}>
              {project.pipeline.ascii}
            </pre>
          </div>
        )}
        {project.metrics && <MetricsTable metrics={project.metrics} />}
        {rich}
        <p className="m-0 text-small text-ink-muted">
          Deep link: <a href={`#${project.slug}`}>#{project.slug}</a>
          {project.links.map((link) => (
            <span key={link.label}>
              {" · "}
              <ExternalLink href={link.url}>{link.label}</ExternalLink>
            </span>
          ))}
        </p>
      </div>
    </details>
  );
}
