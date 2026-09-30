import type { Metadata } from "next";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import FeaturedWork from "@/components/FeaturedWork";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import OutsideTechSection from "@/components/OutsideTechSection";
import ProfileHero from "@/components/ProfileHero";
import SkillsSection from "@/components/SkillsSection";
import WorkWithMeSection from "@/components/WorkWithMeSection";
import { LinkButton, Section, SectionHeader } from "@/components/ui";
import { profileContent } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  description: profileContent.intro,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Liam Mo — Fullstack Developer",
    description: profileContent.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: "Liam Mo — Fullstack Developer",
    description: profileContent.intro,
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <>
      <ProfileHero />

      <Section spacing="compact" aria-labelledby="featured-work-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            id="featured-work-heading"
            eyebrow="Selected work"
            title="Featured Work"
            description="A selection of software, game, and development projects."
          />
          <LinkButton href="/projects" variant="ghost" size="sm">
            View More
          </LinkButton>
        </div>

        <div className="mt-8">
          <FeaturedWork projects={projects} />
        </div>
      </Section>

      <ExperienceSection />

      <SkillsSection />

      <EducationSection />

      <GitHubActivitySection />

      <OutsideTechSection />

      <WorkWithMeSection />
    </>
  );
}
