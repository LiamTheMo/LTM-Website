# Portfolio Revamp — Launch Audit

This document tracks the release state of the portfolio redesign. `v2.12` is the SEO launch pass after production visual and functional approval.

## Code-complete launch work

- Shared site metadata is aligned to `Liam Mo — Fullstack Developer`.
- Canonical URLs are defined for the homepage and primary public routes.
- Open Graph/Twitter metadata uses the personal developer portfolio positioning.
- Person + WebSite structured data is emitted server-side.
- A keyboard-visible skip link targets the main content region.
- A portfolio-styled 404 page is present.
- `/projects` and `/projects/[slug]` are the only project UI implementations.
- `/portfolio` and `/portfolio/:slug` permanently redirect to the matching project routes; the now-dead legacy React pages were removed in v2.10.
- Legacy `/services/:slug` URLs permanently redirect into `/contact?topic=:slug`.
- Sitemap output uses canonical project URLs and excludes intentionally `noindex` placeholder routes.
- `robots.txt` allows public routes while excluding `/api/`.
- GitHub activity has a text equivalent, graceful failure state, and contribution colors themed to the portfolio design system.
- The technology marquee hides its duplicate visual track from assistive technology and respects reduced motion.
- The visitor counter fails gracefully and does not block page rendering.
- GitHub, LinkedIn, and contact destinations share the central social-link data source.
- Contact copy/metadata is aligned to collaboration and portfolio language.
- Favicon/icon route assets are present under `src/app`.
- Education content is confirmed and published.
- Experience content is confirmed and grouped into separate workplace timelines.
- `/projects`, `/projects/[slug]`, `/contact`, and `/about` were redesigned in v2.10 around the shared semantic spacing, surface, border, type, button, and focus systems.
- The homepage Outside the Tech gallery exposes a stable `#outside-tech` anchor so About can link to it without duplicating the gallery.

## v2.10 page architecture cleanup

- `/projects/[slug]` now owns the case-study implementation directly instead of importing the legacy `/portfolio/[slug]` page.
- Case studies render only evidence present in typed project data: metrics, features, screenshots, and before/after sections disappear when not supplied rather than being filled with placeholder claims.
- Project detail pages now have canonical metadata, responsive hero art, challenge/approach/outcome structure, project facts, technology tags, optional implementation/media sections, and previous/next project navigation.
- The Projects index has a responsive portfolio summary, featured case study, and remaining-work grid.
- Contact now has canonical metadata, direct email/social destinations, progressive form context, and a clearer two-column desktop layout that collapses naturally on smaller screens.
- About now derives current work, education, location, and skills from shared data sources rather than duplicating those facts in page-local copy.

## Search indexing state

The homepage is intentionally **indexable** as of the v2.12 SEO launch pass. The owner has completed production visual and functional inspection and approved the public portfolio for search indexing.

- Homepage: `index, follow`
- Public portfolio routes: indexable through their route metadata and canonical URLs
- Sitemap: includes the homepage, public route indexes, and canonical project detail routes
- Resume: remains `noindex, follow` because the route still contains placeholder content and no final public resume asset

Future profile, resume, or personal-gallery content can be added as post-launch content improvements without holding the rest of the portfolio out of search.

## Automated validation

Every implementation PR must pass the repository CI loop before it is merged into its active version branch:

- dependency installation
- production dependency audit
- ESLint
- Cloudflare type generation
- OpenNext worker build
- TypeScript typecheck

No minor version branch should deploy to production. Production deployment remains a `main`-only action.

## Manual production validation

Production visual and functional inspection was completed and approved by the owner before the v2.12 SEO launch pass. Responsive layout, interaction behavior, navigation, public routes, and deployed functionality are therefore treated as manually validated for this release.

The placeholder `/resume` route remains intentionally excluded from indexing until real resume content is supplied.

## Final pre-v3.00 repository cleanup

The v2.12 pre-freeze cleanup removes obsolete implementation paths and aligns repository metadata with the launched portfolio:

- removed the unreachable `/services/[slug]` React/OG implementation because `next.config.ts` permanently redirects those URLs into the contact flow
- removed the old homepage Services/Hero components and their now-unused service-art helpers/types
- removed the obsolete Cloudflare Pages `public/_redirects` file
- kept the service-domain taxonomy used by project category labels, cover fallbacks, and contact routing
- renamed the private package identity from `liamthemo-freelance-website` to `liamthemo-portfolio`
- updated repository/agent deployment documentation to GitHub Actions → Cloudflare Workers
- removed active-code references to retired pre-revamp specifications and deleted components

The resulting v2.12 line is intended to be the clean source for the final `v3.00` portfolio freeze.

## Repository / deployment follow-up

- Keep GitHub Actions as the only production deployment path and keep the retired Cloudflare Git build integration disconnected.
- `main` is currently not protected by branch protection. A GitHub ruleset requiring pull requests and CI remains optional defense-in-depth repository administration.
- Continue using minor branches for implementation and merge completed work into the active version branch before any release PR to `main`.

## Launch rule

The homepage indexing hold has been removed for v2.12. Keep intentionally incomplete or placeholder routes such as `/resume` out of search until their real public content is ready.
