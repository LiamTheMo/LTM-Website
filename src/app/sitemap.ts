import type { MetadataRoute } from "next";
import { orderedExperience } from "@/data/experience";
import { projects } from "@/data/projects";

const BASE_URL = "https://liamthemo.com";

/*
  Keep the sitemap focused on routes that are intentionally indexable. The
  homepage is public and indexable; the placeholder resume remains omitted
  until a final public resume is supplied. Experience is included only after
  real public entries exist.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/projects",
    "/about",
    "/contact",
    ...(orderedExperience.length > 0 ? ["/experience"] : []),
  ];
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  // Omit lastModified until real content/update timestamps are tracked.
  // Claiming every page changed at request time produces misleading crawl hints.
  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));
}
