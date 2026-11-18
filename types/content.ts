import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string(),
  surname: z.string(),
  location: z.string(),
  tagline: z.string(),
  description: z.string(),
  about: z.array(z.string()).min(1),
  links: z.object({
    github: z.object({ label: z.string(), url: z.string() }),
    scholar: z.object({ label: z.string(), url: z.string() }).optional(),
    linkedin: z.object({ label: z.string(), url: z.string() }),
    cv: z.string().optional(),
  }),
});

export const EntrySchema = z.object({
  start: z.string(),
  end: z.string(),
  title: z.string(),
  org: z.string(),
  detail: z.string().optional(),
  bullets: z.array(z.string()).max(4).default([]),
  open: z.boolean().default(false),
});

export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.object({ name: z.string(), me: z.boolean().default(false) })).min(1),
  venue: z.string(),
  year: z.string(),
  pages: z.string().optional(),
  links: z
    .object({ pdf: z.string().optional(), doi: z.string().optional(), code: z.string().optional() })
    .default({}),
  bibtex: z.string(),
});

export const MetricsSchema = z.object({
  caption: z.string(),
  columns: z.array(z.string()).min(2).max(5),
  rows: z.array(z.array(z.string())).max(6),
  best: z.number().int().nonnegative().optional(),
});

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  tags: z.array(z.string().regex(/^[a-z0-9 ]+$/)).min(1).max(4),
  blurb: z.string(),
  summary: z.string().optional(),
  pipeline: z.object({ ascii: z.string(), label: z.string() }).optional(),
  metrics: MetricsSchema.optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  open: z.boolean().default(false),
});

export const SkillsSchema = z.record(z.string(), z.array(z.string()).min(1));

export type Profile = z.infer<typeof ProfileSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Metrics = z.infer<typeof MetricsSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Skills = z.infer<typeof SkillsSchema>;
