export interface SiteNavigationItem {
  label: string;
  href: string;
  aliases?: readonly string[];
  emphasis?: boolean;
}

export const siteIdentity = {
  name: "Liam Mo",
  handle: "LiamTheMo",
  title: "Fullstack Developer",
  location: "Calgary, Alberta",
} as const;

export const mainNavigation: readonly SiteNavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects", aliases: ["/portfolio"] },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact", emphasis: true },
];
