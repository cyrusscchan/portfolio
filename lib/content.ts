import { z } from "zod";
import profileJson from "@/content/profile.json";
import experienceJson from "@/content/experience.json";
import educationJson from "@/content/education.json";
import publicationsJson from "@/content/publications.json";
import projectsJson from "@/content/projects.json";
import skillsJson from "@/content/skills.json";
import {
  EntrySchema,
  ProfileSchema,
  ProjectSchema,
  PublicationSchema,
  SkillsSchema,
} from "@/types/content";

// Parsed at build time: invalid content fails `next build`.
function parse<T extends z.ZodType>(schema: T, data: unknown, file: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`content/${file} is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const profile = parse(ProfileSchema, profileJson, "profile.json");
export const experience = parse(z.array(EntrySchema), experienceJson, "experience.json");
export const education = parse(z.array(EntrySchema), educationJson, "education.json");
export const publications = parse(z.array(PublicationSchema), publicationsJson, "publications.json");
export const projects = parse(z.array(ProjectSchema), projectsJson, "projects.json");
export const skills = parse(SkillsSchema, skillsJson, "skills.json");

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
