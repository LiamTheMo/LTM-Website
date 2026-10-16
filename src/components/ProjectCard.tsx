import Link from "next/link";
import CoverArt from "@/components/CoverArt";
import { Tag } from "@/components/ui";
import { projectCardTags, projectCategoryLabel } from "@/lib/project-display";
import type { Project } from "@/lib/types";

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const category = projectCategoryLabel(project);
  const tags = projectCardTags(project);

  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_16px_48px_-24px_var(--color-accent-dim)] focus-visible:border-accent motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-border bg-surface-2">
          <CoverArt
            project={project}
            priority={priority}
            decorative
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            imageClassName="transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>

        <div className="flex flex-1 flex-col p-[var(--space-card)]">
          {category ? (
            <p className="text-metadata font-medium text-accent">{category}</p>
          ) : null}

          <h3 className="mt-3 text-card text-text">{project.title}</h3>
          <p className="mt-2 flex-1 text-body-secondary text-text-muted">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center text-caption font-semibold text-accent">
            View project
            <span
              aria-hidden="true"
              className="ml-1 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}
