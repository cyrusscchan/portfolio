import { Contact } from "@/components/Contact";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PageEffects } from "@/components/PageEffects";
import { Projects } from "@/components/Projects";
import { EssayScorerDetail } from "@/components/projects/essay-scorer";
import { PublicationEntry } from "@/components/PublicationEntry";
import { Section } from "@/components/SectionTitle";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { SkillsList } from "@/components/SkillsList";
import { education, experience, profile, projects, publications, skills } from "@/lib/content";

const sections: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// Rich per-project detail, keyed by slug (components/projects/<slug>.tsx).
const richProjects = {
  "essay-scorer": <EssayScorerDetail />,
};

export default function Home() {
  const num = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  return (
    <div id="top">
      <a href="#main" className="pf-skip">
        Skip to content
      </a>
      <PageEffects />
      <SiteHeader
        name={`${profile.name[0]}${profile.surname[0]}`}
        label={`${profile.name} ${profile.surname}`}
        items={sections}
      />
      <main id="main" className="mx-auto max-w-wrap px-6 pb-24 md:px-12">
        <Hero profile={profile} />

        <Section id="about" num={num("about")} title="About">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="m-0 [&+&]:mt-4">
              {paragraph}
            </p>
          ))}
        </Section>

        <Section id="experience" num={num("experience")} title="Experience">
          {experience.map((entry, i) => (
            <ExperienceEntry key={i} entry={entry} />
          ))}
        </Section>

        <Section id="publications" num={num("publications")} title="Publications">
          {publications.map((pub, i) => (
            <PublicationEntry key={pub.id} pub={pub} index={publications.length - i} />
          ))}
        </Section>

        <Section id="projects" num={num("projects")} title="Projects">
          <Projects projects={projects} rich={richProjects} />
        </Section>

        <Section id="skills" num={num("skills")} title="Skills">
          <SkillsList skills={skills} />
        </Section>

        <Section id="education" num={num("education")} title="Education">
          {education.map((entry, i) => (
            <ExperienceEntry key={i} entry={entry} />
          ))}
        </Section>

        <Section id="contact" num={num("contact")} title="Contact">
          <Contact profile={profile} />
        </Section>
      </main>
      <Footer name={`${profile.name} ${profile.surname}`} />
    </div>
  );
}
