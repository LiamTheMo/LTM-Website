import { SERVICE_META, type Project } from "@/lib/types";

const PROJECT_TAG_ALIASES: Readonly<Record<string, string>> = {
  "PC hardware": "PC Hardware",
  "BIOS configuration": "BIOS Configuration",
  Software: "Software Troubleshooting",
  "Windows troubleshooting": "Windows Troubleshooting",
};

/** One category shared by the homepage, projects index and case studies.
 * Show a project\'s discipline before its service type: Fullstack Development • Websites.
 */
export function projectCategoryLabel(project: Project): string {
  const services = project.services.map((slug) => SERVICE_META[slug].title);
  const skills = project.skills ?? [];
  return Array.from(new Set([...skills, ...services])).join(" • ");
}

/**
 * Canonical display tags for project cards and case studies.
 *
 * `Project.stack` lists technologies. `Project.engineering` lists verified
 * implementation concepts, not marketing buzzwords. Preserve the owner's
 * intentional order while normalizing established labels and removing repeats.
 */
export function projectTags(project: Project): string[] {
  const normalized = [...project.stack, ...(project.engineering ?? [])]
    .map((tag) => PROJECT_TAG_ALIASES[tag] ?? tag.trim())
    .filter(Boolean);

  return Array.from(new Set(normalized));
}

/** Compact card tags: show technologies plus one actual engineering practice. */
export function projectCardTags(project: Project): string[] {
  const technologies = project.stack.map((tag) => PROJECT_TAG_ALIASES[tag] ?? tag.trim()).filter(Boolean);
  const practice = project.engineering?.find((tag) => tag.trim() && !technologies.includes(tag.trim()));
  return Array.from(new Set([...technologies.slice(0, practice ? 3 : 4), ...(practice ? [practice.trim()] : [])]));
}

export function countProjectTags(items: readonly Project[]): number {
  return new Set(items.flatMap(projectTags)).size;
}
