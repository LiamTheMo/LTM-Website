import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import { LinkButton, Section, SectionHeader, Tag } from "@/components/ui";
import { sortedEducation } from "@/data/education";
import { orderedExperience } from "@/data/experience";
import { profileContent } from "@/data/profile";
import { siteIdentity } from "@/data/site";
import { featuredSkills } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "More about Liam Mo, a fullstack developer and computer science student in Calgary building web applications, games, automation, and developer tools.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About — Liam Mo",
    description:
      "More about Liam Mo, a fullstack developer and computer science student in Calgary building web applications, games, automation, and developer tools.",
  },
};

const principles = [
  {
    title: "Build the complete system",
    description:
      "I enjoy the full path from an early idea through implementation, deployment, and the iteration that follows once something is actually being used.",
  },
  {
    title: "Keep the structure understandable",
    description:
      "I prefer modular, reusable code and clear boundaries between systems so a project stays easier to extend instead of getting harder with every feature.",
  },
  {
    title: "Solve the practical problem",
    description:
      "Architecture matters, but the end result still has to be useful. I try to keep the user experience and the real goal of the project visible while I build.",
  },
] as const;

export default function AboutPage() {
  const currentRoles = orderedExperience.filter((entry) => !entry.endDate);
  const primaryEducation = sortedEducation[0];

  return (
    <>
      <PageHero
        id="about-heading"
        eyebrow="About me"
        title="I like building the whole thing"
        description={profileContent.intro}
        actions={
          <>
            <LinkButton href="/projects" variant="primary">
              See my work
            </LinkButton>
            <LinkButton href="/experience" variant="secondary">
              Experience
            </LinkButton>
          </>
        }
        aside={
          <dl className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
            <div className="p-5">
              <dt className="text-caption uppercase tracking-[0.12em] text-text-muted">Based in</dt>
              <dd className="mt-2 text-body font-medium text-text">{siteIdentity.location}</dd>
            </div>
            {primaryEducation ? (
              <div className="border-t border-border p-5">
                <dt className="text-caption uppercase tracking-[0.12em] text-text-muted">Studying</dt>
                <dd className="mt-2 text-body font-medium text-text">{primaryEducation.institution}</dd>
                <dd className="mt-1 text-body-secondary text-text-muted">{primaryEducation.program}</dd>
              </div>
            ) : null}
            <div className="border-t border-border p-5">
              <dt className="text-caption uppercase tracking-[0.12em] text-text-muted">Current roles</dt>
              <dd className="mt-2 text-body font-medium text-text">{currentRoles.length}</dd>
            </div>
          </dl>
        }
      />

      <Section spacing="compact" aria-labelledby="principles-heading">
        <SectionHeader
          id="principles-heading"
          eyebrow="How I work"
          title="A few things I care about while building"
          description="These show up across the web, game, automation, and technical projects I work on."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="rounded-[var(--radius-card)] border border-border bg-surface p-[var(--space-card)]"
            >
              <span className="text-metadata font-semibold text-accent">0{index + 1}</span>
              <h3 className="mt-4 text-card text-text">{principle.title}</h3>
              <p className="mt-3 text-body-secondary text-text-muted">{principle.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        spacing="compact"
        aria-labelledby="current-heading"
        tone="surface"
        className="border-y border-border/70"
      >
        <SectionHeader
          id="current-heading"
          eyebrow="Right now"
          title="Work, school, and the tools around them"
          description="My portfolio sits at the overlap of software development, computer science, game development, and hands-on technical work."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-card text-text">Current work</h3>
              <Link href="/experience" className="text-caption font-medium text-accent hover:text-accent-hover">
                Full experience →
              </Link>
            </div>
            <div className="mt-4 divide-y divide-border rounded-[var(--radius-card)] border border-border bg-bg">
              {currentRoles.map((entry) => (
                <div key={entry.id} className="p-4 sm:p-5">
                  <p className="text-body font-medium text-text">{entry.role}</p>
                  <p className="mt-1 text-body-secondary text-text-muted">
                    {entry.organization} · {entry.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-card text-text">Technologies & tools</h3>
            <p className="mt-2 max-w-[58ch] text-body-secondary text-text-muted">
              The shared skills list stays limited to technologies supported by work, education, or project evidence elsewhere on the site.
            </p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Technologies and tools">
              {featuredSkills.map((skill) => (
                <Tag key={skill.name}>{skill.name}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="compact" aria-labelledby="outside-heading">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-[var(--space-card)] sm:p-8">
          <SectionHeader
            id="outside-heading"
            eyebrow="Outside the tech"
            title="There is more to me than the projects"
            description="Away from a computer, I spend time powerlifting, fishing, hiking or camping around Alberta, and looking for good food. The homepage has a small swipeable gallery from that side of life."
          />
          <LinkButton href="/#outside-tech" variant="secondary" size="sm" className="mt-6">
            See the gallery
            <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </Section>

      <CTASection
        title="Want to talk about a project, role, or idea?"
        description="If something in my work lines up with what you’re building, send me a message and some context."
        ctaLabel="Contact me"
        secondary={{ href: "/projects", label: "Browse projects" }}
      />
    </>
  );
}
