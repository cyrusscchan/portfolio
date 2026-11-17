"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "@/types/content";
import { ProjectDetails } from "./ProjectDetails";

export function Projects({
  projects,
  rich = {},
}: {
  projects: Project[];
  rich?: Record<string, React.ReactNode>;
}) {
  const [filter, setFilter] = useState("all");
  const tags = ["all", ...new Set(projects.flatMap((p) => p.tags))];
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<React.CSSProperties | null>(null);

  // Sliding highlight: track the pressed tag's box; re-measure when the row reflows.
  useLayoutEffect(() => {
    const measure = () => {
      const button = buttonRefs.current.get(filter);
      if (!button) return;
      setIndicator({
        transform: `translate(${button.offsetLeft}px, ${button.offsetTop}px)`,
        width: button.offsetWidth,
        height: button.offsetHeight,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (groupRef.current) observer.observe(groupRef.current);
    return () => observer.disconnect();
  }, [filter]);

  // `/#slug` deep links: clear the filter, open the matching row and scroll to it.
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!projects.some((p) => p.slug === slug)) return;
      setFilter("all");
      requestAnimationFrame(() => {
        const el = document.getElementById(slug);
        if (el instanceof HTMLDetailsElement) {
          el.open = true;
          el.scrollIntoView();
        }
      });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [projects]);

  return (
    <>
      <div
        ref={groupRef}
        role="group"
        aria-label="Filter projects by tag"
        className="no-print relative mb-4 flex flex-wrap items-center gap-2"
        data-ready={indicator ? "" : undefined}
      >
        {indicator && <span className="pf-filter-indicator" aria-hidden="true" style={indicator} />}
        <span className="pf-caption mr-1">Filter</span>
        {tags.map((tag) => (
          <button
            key={tag}
            ref={(el) => {
              if (el) buttonRefs.current.set(tag, el);
              else buttonRefs.current.delete(tag);
            }}
            type="button"
            className="pf-tag"
            aria-pressed={filter === tag}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="border-b border-dashed border-rule">
        {projects.map((project) => (
          <ProjectDetails
            key={project.slug}
            project={project}
            hidden={filter !== "all" && !project.tags.includes(filter)}
            rich={rich[project.slug]}
          />
        ))}
      </div>
    </>
  );
}
