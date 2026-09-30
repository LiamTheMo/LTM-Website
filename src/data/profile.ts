export interface ProfileImage {
  src: string;
  alt: string;
}

export interface ProfileContent {
  intro: string;
  image: ProfileImage | null;
  resumeHref: string;
}

export const profileContent: ProfileContent = {
  intro:
    "I’m a fullstack developer focused on building useful, polished software across web applications, games, automation, and developer tools. I enjoy taking projects from an early idea through implementation, deployment, and iteration, with an emphasis on clean systems and practical user experience.",
  image: { src: "/homepage/profile/profile-photo.avif", alt: "Portrait of Liam Mo" },
  resumeHref: "/resume",
};
