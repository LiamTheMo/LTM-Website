# Phase 09 — Polish, Accessibility, SEO & Launch

## Objective

Treat the completed redesign as a product release rather than stopping when the homepage looks finished.

## 1. Visual consistency audit

Review every public route for:

- typography role consistency
- text colors
- section spacing
- page gutters/max widths
- button styles
- border/radius treatment
- icon sizing
- hover/focus behavior
- mobile spacing

Any exception to the shared system should be deliberate and documented.

`v2.10` applies this pass to `/projects`, `/projects/[slug]`, `/contact`, and `/about`, replacing older page-local layouts with the shared semantic design tokens and components.

## 2. Responsive validation

Manually validate at minimum:

- narrow phone
- modern phone
- tablet portrait
- tablet landscape
- laptop
- wide desktop

Check long project names, long role names, animation overflow, image cropping, horizontal galleries, and form controls—not only ideal demo content.

## 3. Accessibility

Validate:

- semantic heading order
- keyboard navigation
- visible `:focus-visible`
- link/button naming
- portrait/project image alt text
- sufficient text contrast
- reduced-motion behavior
- marquee duplicate content hidden from assistive technology
- GitHub visualizations have text equivalents
- scrollable galleries can receive keyboard focus

## 4. Performance

Target a fast static-first experience.

Review:

- image sizes/formats
- font loading
- unused client components
- unnecessary hydration
- GitHub API caching
- visitor counter request cost
- CLS from images/icons

Prefer server components and static rendering wherever live data is not required.

## 5. SEO / metadata

Current state: the homepage is intentionally indexable after owner-approved production visual and functional validation. Canonical URLs, sitemap output, Open Graph metadata, favicon/app icons, and Person + WebSite structured data are in place. The placeholder resume route remains `noindex, follow` until a final public resume is supplied.

Launch tasks:

- homepage index/follow enabled intentionally in v2.12
- canonical URLs correct
- sitemap uses `/projects` rather than `/portfolio`
- legacy `/portfolio` redirects verified
- page titles/descriptions use personal portfolio positioning
- Open Graph content updated
- favicon/app icons verified
- Person + WebSite structured data present

## 6. Content audit

Remove or rewrite stale service-first language that conflicts with the portfolio identity.

Confirm:

- title is `Fullstack Developer`
- homepage section order matches the master plan
- placeholder resume remains excluded from indexing until final content is supplied
- experience/education dates are current
- project links are valid
- social links are valid
- contact flow works end to end
- optional case-study claims appear only when supported by typed project data

## 7. Production verification

Production verification requirements:

- lint passes
- TypeScript passes
- production/OpenNext build passes
- internal links checked
- 404 behavior checked
- contact form tested
- GitHub fallback tested
- visitor-counter fallback tested
- mobile navigation tested
- deployment from `main` verified

## Acceptance Criteria

The phase is complete when the site is visually consistent, usable by keyboard/touch, responsive, build-clean, production-tested, and intentionally indexable. Owner production QA is approved; v2.12 completes the homepage indexing portion while the placeholder resume remains intentionally excluded.
