import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  // Avoid a homepage error if the curated selection changes during updates.
  const featured = projects.filter((project) => project.featured);
  const selection = [...featured, ...projects.filter((project) => !project.featured)].slice(0, 3);

  return (
    <ul className="grid gap-[var(--space-grid)] md:grid-cols-3">
      {selection.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </ul>
  );
}
