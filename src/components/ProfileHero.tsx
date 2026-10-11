import Image from "next/image";
import SocialIcon from "@/components/SocialIcon";
import { Container, IconLink, LinkButton } from "@/components/ui";
import { profileContent } from "@/data/profile";
import { siteIdentity } from "@/data/site";
import { socialLinks } from "@/data/social";

function ProfileAvatar() {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-surface sm:h-20 sm:w-20">
      {profileContent.image ? (
        <Image
          src={profileContent.image.src}
          alt={profileContent.image.alt}
          fill
          priority
          sizes="(min-width: 640px) 5rem, 4rem"
          className="object-cover"
        />
      ) : (
        <div
          aria-label="Profile photo pending final asset"
          className="absolute inset-0 flex items-center justify-center bg-surface-2 font-display text-body text-accent sm:text-card"
        >
          LM
        </div>
      )}
    </div>
  );
}

export default function ProfileHero() {
  return (
    <section aria-labelledby="profile-hero-title" className="border-b border-border/70">
      <Container className="py-[var(--space-section-compact)]">
        <div className="max-w-[var(--layout-reading)]">
          <div className="flex items-center gap-4 sm:gap-5">
            <ProfileAvatar />
            <div className="min-w-0">
              <h1 id="profile-hero-title" className="text-display text-text">
                {siteIdentity.name}
              </h1>
              <p className="mt-1 text-metadata font-medium text-accent">{siteIdentity.location}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2" aria-label="Social and contact links">
            {socialLinks.map((link) => (
              <IconLink
                key={link.kind}
                href={link.href}
                label={link.label}
                external={link.external}
              >
                <SocialIcon kind={link.kind} />
              </IconLink>
            ))}
          </div>

          <p className="mt-7 text-section text-text-secondary">{siteIdentity.title}</p>
          <p className="mt-[var(--space-heading-body)] text-body text-text-muted">
            {profileContent.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/projects" variant="primary" size="lg">
              View Projects
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="lg">
              Contact Me
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
