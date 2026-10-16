import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfterCompare from "@/components/BeforeAfterCompare";
import CTASection from "@/components/CTASection";
import CoverArt from "@/components/CoverArt";
import PageHero from "@/components/PageHero";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import { Card, LinkButton, Section, SectionHeader, Tag } from "@/components/ui";
import { projects } from "@/data/projects";
import { projectCategoryLabel, projectTags } from "@/lib/project-display";
import type { ProjectFeature } from "@/lib/types";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

function FeatureIcon({ icon }: { icon: ProjectFeature["icon"] }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {icon === "bolt" ? <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /> : null}
      {icon === "layers" ? (
        <>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </>
      ) : null}
      {icon === "target" ? (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.5" />
        </>
      ) : null}
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${project.title} — Liam Mo`,
      description: project.summary,
      ...(project.cover.kind === "image" ? { images: [project.cover.src] } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const category = projectCategoryLabel(project);
  const tags = projectTags(project);
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <>
      <PageHero
        id="project-heading"
        eyebrow={category || "Project"}
        title={
          <span className="inline-flex items-center gap-3">
            {project.avatar ? (
              <Image
                src={project.avatar.src}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full border border-border object-cover"
              />
            ) : null}
            <span>{project.title}</span>
          </span>
        }
        description={project.summary}
        backLink={{ href: "/projects", label: "All projects" }}
        asideSize="wide"
        actions={
          project.externalLink || project.sourceUrl ? (
            <>
              {project.externalLink ? (
                <LinkButton
                  href={project.externalLink.href}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  {project.externalLink.label}
                  <span aria-hidden="true">↗</span>
                </LinkButton>
              ) : null}
              {project.sourceUrl ? (
                <LinkButton
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  View source
                  <span aria-hidden="true">↗</span>
                </LinkButton>
              ) : null}
            </>
          ) : undefined
        }
        aside={
          <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
            <CoverArt
              project={project}
              priority={project.cover.kind === "image"}
              decorative
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        }
      />

      <Section spacing="compact" aria-labelledby="case-study-heading">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
          <div className="min-w-0">
            <SectionHeader
              id="case-study-heading"
              eyebrow="Case study"
              title="The work behind the result"
              description="The challenge, the implementation approach, and the parts of the system that are useful to inspect in more detail."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card>
                <p className="text-metadata font-semibold text-accent">Challenge</p>
                <p className="mt-3 text-body-secondary text-text-muted">{project.problem}</p>
              </Card>
              <Card>
                <p className="text-metadata font-semibold text-accent">Approach</p>
                <p className="mt-3 text-body-secondary text-text-muted">{project.solution}</p>
              </Card>
            </div>

            {project.result ? (
              <div className="mt-4 rounded-[var(--radius-card)] border border-accent/40 bg-accent-dim p-[var(--space-card)]">
                <p className="text-metadata font-semibold text-accent">Outcome</p>
                <p className="mt-3 text-body text-text">{project.result}</p>
              </div>
            ) : null}

            {project.metrics && project.metrics.length > 0 ? (
              <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[var(--radius-control)] border border-border bg-surface p-4">
                    <dt className="text-caption uppercase tracking-[0.1em] text-text-muted">{metric.label}</dt>
                    <dd className="mt-2 text-card text-text">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <aside className="h-fit rounded-[var(--radius-card)] border border-border bg-surface p-[var(--space-card)] lg:sticky lg:top-24">
            <h2 className="text-card text-text">Project details</h2>
            <dl className="mt-5 space-y-4">
              {category ? (
                <div>
                  <dt className="text-caption uppercase tracking-[0.1em] text-text-muted">Category</dt>
                  <dd className="mt-1 text-body-secondary text-text">{category}</dd>
                </div>
              ) : null}
              {project.role ? (
                <div>
                  <dt className="text-caption uppercase tracking-[0.1em] text-text-muted">Role</dt>
                  <dd className="mt-1 text-body-secondary text-text">{project.role}</dd>
                </div>
              ) : null}
              {project.year ? (
                <div>
                  <dt className="text-caption uppercase tracking-[0.1em] text-text-muted">Year</dt>
                  <dd className="mt-1 text-body-secondary text-text">{project.year}</dd>
                </div>
              ) : null}
              {project.client ? (
                <div>
                  <dt className="text-caption uppercase tracking-[0.1em] text-text-muted">Client</dt>
                  <dd className="mt-1 text-body-secondary text-text">{project.client}</dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-caption uppercase tracking-[0.1em] text-text-muted">Technology & engineering</p>
              <div className="mt-3 flex flex-wrap gap-2" aria-label="Project tags">
                {tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {project.whatIBuilt?.length || project.features?.length ? (
        <Section
          spacing="compact"
          aria-labelledby="build-details-heading"
          tone="surface"
          className="border-y border-border/70"
        >
          <SectionHeader
            id="build-details-heading"
            eyebrow="Implementation"
            title="What went into the build"
            description="Concrete pieces of the project, shown only where the project data has confirmed details to support them."
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {project.whatIBuilt?.length ? (
              <div>
                <h3 className="text-card text-text">What I built</h3>
                <ul className="mt-4 space-y-3">
                  {project.whatIBuilt.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body-secondary text-text-muted">
                      <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.features?.length ? (
              <div>
                <h3 className="text-card text-text">Key features</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature.title} className="rounded-[var(--radius-control)] border border-border bg-bg p-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-dim text-accent">
                        <FeatureIcon icon={feature.icon} />
                      </span>
                      <h4 className="mt-4 text-body font-semibold text-text">{feature.title}</h4>
                      <p className="mt-2 text-body-secondary text-text-muted">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {project.images?.length ? (
        <Section spacing="compact" aria-labelledby="screenshots-heading">
          <SectionHeader
            id="screenshots-heading"
            eyebrow="Screenshots"
            title="See it in context"
            description="Real captures from the project where supporting visuals are available."
          />
          <ScreenshotCarousel images={project.images} className="mt-8" />
        </Section>
      ) : null}

      {project.beforeAfter?.length ? (
        <Section
          spacing="compact"
          aria-labelledby="before-after-heading"
          className={project.images?.length ? "border-t border-border/70" : undefined}
        >
          <SectionHeader
            id="before-after-heading"
            eyebrow="Before / After"
            title="A visible look at the redesign"
            description="Paired captures keep the original and revised versions next to each other for a direct comparison."
          />
          <BeforeAfterCompare pairs={project.beforeAfter} className="mt-8" />
        </Section>
      ) : null}

      {previousProject || nextProject ? (
        <Section spacing="compact" aria-labelledby="project-navigation-heading" className="border-t border-border/70">
          <h2 id="project-navigation-heading" className="sr-only">More projects</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-colors hover:border-accent"
              >
                <span className="text-caption uppercase tracking-[0.1em] text-text-muted">← Previous project</span>
                <span className="mt-2 block text-card text-text group-hover:text-accent">{previousProject.title}</span>
              </Link>
            ) : <span />}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group rounded-[var(--radius-card)] border border-border bg-surface p-5 text-left transition-colors hover:border-accent sm:text-right"
              >
                <span className="text-caption uppercase tracking-[0.1em] text-text-muted">Next project →</span>
                <span className="mt-2 block text-card text-text group-hover:text-accent">{nextProject.title}</span>
              </Link>
            ) : null}
          </div>
        </Section>
      ) : null}

      <CTASection
        title="Want to talk through something similar?"
        description="Share the goal, the current state, and the constraints you already know. I can start from there."
        ctaLabel="Get in touch"
        secondary={{ href: "/projects", label: "All projects" }}
      />
    </>
  );
}
