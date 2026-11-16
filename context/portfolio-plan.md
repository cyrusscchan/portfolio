# Portfolio Website Plan (v3)

## Decisions
- Frontend-only Next.js (App Router, TypeScript), static export (`output: "export"`), no DB/CMS.
- Single page with anchored sections (no /projects or /projects/[slug] routes).
- Minimal, greyscale, monospace; "paper print meets terminal"; text-first; icons supplementary only.
- Headings are plain, human-readable titles (no shell-command styling), so the site reads well for non-technical viewers such as HR and researchers.
- Owner supplies resume, project details, publications. No blog for now.

## Stack
Next.js + TypeScript, Tailwind CSS, next/font (one monospace family), next-themes, Zod (build-time content validation), optional Motion for tiny effects. Host on Vercel / Cloudflare Pages.

## Content model
```
content/
  profile.json  experience.json  publications.json
  projects.json  skills.json  education.json
types/content.ts   # Zod schemas + inferred types
components/projects/<slug>.tsx  # optional rich detail per project
```

## Page structure (one route: `/`)
header/nav -> hero -> about -> experience -> publications -> projects -> skills -> education -> contact

## Design system
- Light "paper" theme (warm-neutral light grey bg, near-black ink), dark theme (near-black bg, light grey text). Greys only; no accent color (emphasis via weight, inversion, underline).
- One monospace family; hierarchy via size/weight/case, not font mixing. ~70-80ch reading column, left-aligned.
- Subtle terminal/print motifs, kept approachable: plain section titles (e.g. "Experience") with `[01]` numbering, dashed or box-drawing rules, `[nlp]` tags, a blinking block cursor in the hero only, `key: value` skills, citation-style publication entries (copy-BibTeX button).
- Icons: small, only for external links and theme toggle.
- Print stylesheet so the page prints as a clean resume.

### Design artifacts (2026-11-15)
- Design system "Paper & Terminal": https://claude.ai/artifact/AAbXBPRHArpDjy7rPecZXN
  - Font: IBM Plex Mono 400/500/600. Themes `data-theme="paper" | "terminal"`.
  - Paper: bg #ecebe6, raised #f6f5f1, ink #1a1a18, muted #55544f, rule #c4c2bb, rule-strong #82807a.
  - Terminal: bg #0f0f0f, raised #171717, ink #d9d9d5, muted #9c9c97, rule #333331, rule-strong #6b6b67.
  - Type: display 40/48, title 22/32, subtitle 16/24, body 15/24, small 13/20, label 12/16 caps, code 13/18. 4px spacing grid; radius 0.
  - Components: SiteHeader, ThemeToggle, SectionTitle, Tag, Button, ExperienceEntry, PublicationEntry, ProjectDetails, MetricsTable, SkillsList.
- UI mockup (both themes, interactive toggle/filter/expand): https://claude.ai/artifact/7XFLxkVL8JMo5nqNezrrVt

## Text-first treatment of NLP / AES work
- Projects expand inline (`<details>`), deep-linkable via `#slug`; tag filter inline.
- Metrics as monospace tables (e.g. QWK, F1); pipelines as ASCII diagrams, not images.
- Optional static annotated-essay example (highlighted spans + rubric scores), no backend.

## Frontend-only details
mailto or Formspree contact; Metadata API + OG + sitemap/robots; keyboard-accessible, prefers-reduced-motion; Lighthouse 95+.

## Milestones
1. Scaffold, fonts, theme tokens, Zod schemas, placeholder content
2. Layout + nav + hero + simple sections (experience, publications, education, skills)
3. Projects section (inline expand, filter, metrics tables, ASCII diagrams)
4. Polish: print CSS, a11y, SEO, keyboard shortcuts (optional)
5. Deploy, domain, CI (lint, typecheck, build)