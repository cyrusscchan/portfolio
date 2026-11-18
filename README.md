# portfolio

A single-page, text-first portfolio site. Minimal, greyscale and monospace, in a "paper print meets terminal" style.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, static export via `output: "export"`)
- React 19, TypeScript
- Tailwind CSS 4
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark themes
- [Zod](https://zod.dev) for build-time content validation

## Features

- One route (`/`) with anchored sections: about, experience, publications, projects, skills, education, contact
- "Paper" (light) and "Terminal" (dark) themes, toggled from the header or with the `t` key
- Projects expand inline, can be filtered by tag and deep-linked via `/#<slug>`, and include metrics tables
- Citation-style publication entries with a copy-BibTeX button
- Print stylesheet so the page prints as a clean resume; collapsed sections open automatically when printing
- Subtle animations that respect `prefers-reduced-motion`
- Generated OG image, sitemap, `robots.txt`, favicons and web manifest

## Project structure

```
app/                  # layout, page, metadata routes (OG image, sitemap, robots), icons
components/           # UI components
components/projects/  # optional rich detail per project, one file per slug
content/              # site content as JSON
types/content.ts      # Zod schemas and inferred types for content/
lib/content.ts        # loads and validates content/ at build time
```

## Editing content

All copy lives in `content/*.json`. Each file is validated against its schema in `types/content.ts` when the site builds, and invalid content fails `next build` with a readable error.

To give a project a richer expanded view, add `components/projects/<slug>.tsx` and register it in `richProjects` in `app/page.tsx`.

## Development

Requires Node.js 22.

```sh
npm install
npm run dev        # dev server at http://localhost:3000
npm run lint
npm run typecheck
npm run build      # static export to out/
npm start          # serve out/ locally
```

## Configuration

| Variable               | Purpose                                                                 | Default               |
| ---------------------- | ----------------------------------------------------------------------- | --------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in the sitemap, `robots.txt` and OG metadata. Read at build time. | `https://example.com` |

## Deployment

The Docker image builds the static export and serves it with nginx on port 3000. `compose.yml` binds it to `127.0.0.1:3000` and `[::1]:3000` only, so it is meant to sit behind a reverse proxy on the host.

```sh
cp .env.example .env   # then set NEXT_PUBLIC_SITE_URL to your domain
docker compose up -d --build
```

Compose reads `NEXT_PUBLIC_SITE_URL` from `.env` (git-ignored) or the shell, and the build fails if it is missing.

## License

© 2026 Cyrus Chan. All rights reserved. The code and content in this repository may not be reused without permission.
