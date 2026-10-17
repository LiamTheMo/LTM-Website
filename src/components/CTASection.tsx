import ArrowUpRightIcon from "@/components/ArrowUpRightIcon";
import { LinkButton, Section } from "@/components/ui";
import { CTA } from "@/lib/nav";
import type { ServiceSlug } from "@/lib/types";

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  secondary?: { href: string; label: string };
  topic?: ServiceSlug;
}

/**
 * Secondary-page closing CTA. Keep its layout in step with the homepage's
 * Work With Me section rather than isolating it in a separate glowing card.
 */
export default function CTASection({
  title = "Tell me what you're trying to get done",
  description = "Describe the problem in plain words. I'll reply within one business day with what it would take.",
  ctaLabel,
  secondary,
  topic,
}: CTASectionProps) {
  const ctaHref = topic ? `${CTA.href}?topic=${topic}` : CTA.href;

  return (
    <Section
      spacing="compact"
      aria-labelledby="cta-heading"
      className="border-t border-border/70"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <div className="min-w-0 max-w-2xl">
          <p className="text-metadata font-medium text-accent">Collaboration</p>
          <h2 id="cta-heading" className="mt-2 text-section text-text">
            {title}
          </h2>
          <p className="mt-3 whitespace-pre-line text-body-secondary text-text-muted">
            {description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:shrink-0 sm:items-end">
          <LinkButton
            href={ctaHref}
            variant="primary"
            size="lg"
            className="group w-full sm:w-auto"
          >
            {ctaLabel ?? CTA.label}
            <ArrowUpRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </LinkButton>

          {secondary ? (
            <LinkButton
              href={secondary.href}
              variant="ghost"
              size="sm"
              className="w-full sm:w-auto"
            >
              {secondary.label}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
