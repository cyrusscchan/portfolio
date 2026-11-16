"use client";

import { useEffect, useState } from "react";
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
        role="group"
        aria-label="Filter projects by tag"
        className="no-print mb-4 flex flex-wrap items-center gap-2"
      >
        <span className="pf-caption mr-1">Filter</span>
        {tags.map((tag) => (
          <button
            key={tag}
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
