# LiamTheMo Portfolio Revamp

## Goal

Rebuild liamthemo.com from a service-first landing page into a polished personal developer portfolio centered on Liam, his work, experience, technical skills, education, GitHub activity, personal interests, and contact paths.

The site should feel intentionally designed as one system. Typography, color, spacing, iconography, section widths, buttons, cards, borders, and motion should come from shared tokens/components instead of per-section improvisation.

## Portfolio Positioning

**Primary title: Fullstack Developer**

This foregrounds Liam's end-to-end web development work while leaving room for the broader portfolio of games, automation, tooling, and software projects.

Supporting specialties can appear in copy and project tags, for example:

- Full-stack development
- Game development
- Automation and tooling
- UI/UX implementation

## Homepage Order

1. Global navigation
2. Profile hero
   - profile photo
   - full name
   - GitHub / LinkedIn / contact icons
   - title: Fullstack Developer
   - short introduction/about copy
   - resume button
3. Featured Projects
   - exactly 3 featured projects
   - `View More` -> `/projects`
4. Experience
   - workplace-separated timelines
   - role dates, title, organization, location, summary
   - `View Details` -> `/experience`
5. Skills / Technology marquee
6. Education
7. GitHub Activity
   - live/recent public GitHub contribution/activity data
   - portfolio-themed contribution colors
   - link to GitHub profile
8. Outside the Tech
   - concise personal context
   - swipeable personal photo gallery
9. Work With Me
   - compact CTA into `/contact`
10. Footer
   - full name
   - Calgary, Alberta
   - social links
   - privacy-safe visitor statistic

## Public Routes

- `/` — homepage
- `/projects` — all projects
- `/projects/[slug]` — canonical project detail/case study
- `/experience` — expanded work/leadership experience
- `/about` — longer personal/context page
- `/contact` — contact and project/collaboration flow
- `/resume` — resume destination; held `noindex` until the final resume is supplied

Legacy `/portfolio` URLs permanently redirect to the matching `/projects` routes. The legacy React page implementations were removed during v2.10 so there is only one project UI to maintain.

## Phase Map

- [Phase 01 — Design System & Site Shell](./PHASE-01-DESIGN-SYSTEM.md)
- [Phase 02 — Hero, Identity & About](./PHASE-02-HERO-IDENTITY.md)
- [Phase 03 — Featured Projects & Projects Route](./PHASE-03-PROJECTS.md)
- [Phase 04 — Experience](./PHASE-04-EXPERIENCE.md)
- [Phase 05 — Skills Marquee](./PHASE-05-SKILLS-MARQUEE.md)
- [Phase 06 — Education & Outside the Tech](./PHASE-06-EDUCATION.md)
- [Phase 07 — GitHub Activity](./PHASE-07-GITHUB-ACTIVITY.md)
- [Phase 08 — Work With Me, Footer & Visitor Count](./PHASE-08-CTA-FOOTER.md)
- [Phase 09 — Polish, Accessibility, SEO & Launch](./PHASE-09-LAUNCH.md)

## Non-Negotiable Quality Rules

- Shared typography scale, spacing scale, container widths, colors, radii, and button styles.
- No one-off font sizes or text colors unless documented as a deliberate exception.
- Mobile-first behavior for every section.
- Motion must respect `prefers-reduced-motion`.
- Interactive elements need visible keyboard focus states.
- Icons must have accessible names or be correctly marked decorative.
- The portfolio must not depend on JavaScript for basic reading/navigation.
- External integrations must fail gracefully rather than leaving blank sections.
- No secret tokens may be exposed to client-side code.
- Project pages must not invent outcomes, features, metrics, or screenshots when typed project data does not provide them.

## Version milestones

- `v2.00` — immutable pre-revamp snapshot
- `v2.01`–`v2.09` — phased portfolio redesign
- `v2.10`–`v2.12` — secondary-page normalization, hardening, SEO launch, and pre-freeze cleanup
- `v3.00` — finalized portfolio baseline
- `v4.00` — planned passkey-protected visual CMS/editor; phase roadmap lives in `docs/v4.00/`

## Post-launch content inputs

The portfolio is approved for public search indexing. The following can still be supplied as content upgrades without blocking the launched site:

- Approved/final profile photo, if the current presentation changes.
- Current public resume PDF/content. Until supplied, `/resume` remains `noindex`.
- Additional approved personal photos and alt text for `Outside the Tech`.

LinkedIn, featured-project selection, experience, education, and the current production layout/functionality are already approved and should not be treated as launch blockers.
