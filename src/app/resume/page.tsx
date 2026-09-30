import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Card, LinkButton, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and professional background for Liam Mo.",
  alternates: { canonical: "/resume" },
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  return (
    <>
      <PageHero
        id="resume-heading"
        eyebrow="Resume"
        title="Liam Mo — Fullstack Developer"
        description="The public resume file is being finalized. This route is stable so the homepage action and future PDF can keep the same destination."
        actions={
          <>
            <LinkButton href="/projects" variant="primary">
              View projects
            </LinkButton>
            <LinkButton href="/contact" variant="secondary">
              Contact me
            </LinkButton>
          </>
        }
      />

      <Section spacing="compact" containerSize="narrow" aria-labelledby="resume-status-heading">
        <Card>
          <h2 id="resume-status-heading" className="text-card text-text">Resume asset pending</h2>
          <p className="mt-3 text-body-secondary text-text-muted">
            The final PDF has not been added to the repository yet. In the meantime, the projects and experience pages contain the current public detail.
          </p>
        </Card>
      </Section>
    </>
  );
}
