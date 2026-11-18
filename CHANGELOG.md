# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-11-18

### Added

- Single-page site with hero, about, experience, publications, projects, skills, education and contact sections.
- JSON content in `content/`, validated against Zod schemas at build time.
- "Paper" (light) and "Terminal" (dark) themes with a header toggle and `t` keyboard shortcut.
- Expandable, tag-filterable, deep-linkable projects with metrics tables and a rich essay-scorer detail view.
- Citation-style publication entries with copy-BibTeX.
- Animations that respect `prefers-reduced-motion`.
- Print stylesheet for printing the page as a resume.
- Favicon, app icons, web manifest, generated OG image, sitemap and `robots.txt`.
- Multi-stage Docker build serving the static export with nginx, plus `compose.yml`.
- `NEXT_PUBLIC_SITE_URL` build argument for the canonical site URL.

[Unreleased]: https://github.com/cyruscsc/portfolio/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/cyruscsc/portfolio/releases/tag/v0.1.0
