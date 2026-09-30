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
    "I’m a fullstack developer focused on building useful, polished web applications and end-to-end software. My work also spans games, automation, and developer tools, and I enjoy taking projects from an early idea through implementation, deployment, and iteration.",
  image: { src: "/homepage/profile/profile-photo.avif", alt: "Portrait of Liam Mo" },
  resumeHref: "/resume",
};
