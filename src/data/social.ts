export type SocialKind = "github" | "linkedin" | "contact";

export interface SocialLink {
  kind: SocialKind;
  label: string;
  href: string;
  external?: boolean;
}

export const socialLinks: readonly SocialLink[] = [
  {
    kind: "github",
    label: "GitHub",
    href: "https://github.com/LiamTheMo",
    external: true,
  },
  {
    kind: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/liamthemo",
    external: true,
  },
  {
    kind: "contact",
    label: "Contact",
    href: "/contact",
  },
];
