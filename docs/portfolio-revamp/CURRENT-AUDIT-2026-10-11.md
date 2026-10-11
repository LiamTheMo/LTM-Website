# Portfolio Completion Audit — 2026-10-11

This is the current implementation audit for the `v3.03` maintenance line. It supersedes older launch-only to-do inventories. The passkey editor/CMS is separately scoped to `v4.00`.

## Completed / Passed (source-level implementation)

- Canonical GitHub account, public repository source links and Todo account-sync descriptions corrected in the previous audit release.
- Portfolio homepage's primary CTA no longer points to the unfinished public resume PDF.
- Featured project selection fails gracefully instead of throwing when the featured count changes.
- Responsive gallery supports larger touch targets, keyboard arrow navigation, reduced-motion scrolling, and correct scroll-container geometry; pagination no longer wraps across several rows on narrow phones.
- Project cards and buttons have more visible focus/hover states that respect reduced motion; hero portrait sizing and warm ambient framing improved.
- Screenshot carousel has 44-pixel button controls and reduced-motion scrolling.
- GitHub contribution parsing has unit coverage. Server-side GitHub requests now have bounded timeouts and safe unavailable states.
- Anonymous visitor counter has an idempotent D1 schema migration, no per-request DDL, accurate approximate-browser wording, and a read-only `GET /api/visitors` verification endpoint.
- Contact email drafting has retry/copy fallbacks if the visitor has no mail client.
- Repository tests validate internal navigation routes, project slugs, asset existence, alt-text presence, and GitHub owner URLs.
- An opt-in HTTPS external-link check is available via `npm run check:links:remote`.
- A pinned Chromium smoke job builds the site and tests mobile/tablet/desktop routes, navigation, form validation, gallery controls, page JavaScript errors and viewport overflow. It uploads full-page screenshots plus local navigation/FCP timing baselines for inspection.
- Sitemap no longer invents `lastModified` dates for all URLs on every request.
- GitHub Actions remains validation-only for version PRs; production deployment remains a Cloudflare integration from `main` only.

## Requires Manual Validation

- **Cloudflare production deployment:** verify the latest `main` commit in Workers & Pages / Workers Builds, including deployment success, route availability and production binding names. This repository's GitHub checks cannot prove a Cloudflare deployment has completed.
- **Visitor D1 database:** verify `VISITOR_DB_ID` and `VISITOR_DB_NAME` in Cloudflare build settings and that `GET https://liamthemo.com/api/visitors` returns a numeric count. Apply `migrations/visitor-counter/0001_init.sql` to a new database when necessary, without resetting a live count. Once verified, remove the temporary Worker-isolate schema fallback on another minor branch.
- **Live visual and functional inspection:** review the production website using a real browser on iPhone, tablet and desktop. CI screenshots depict the locally built version, not Cloudflare production. Review spacing, gallery photos/crops, touch/keyboard behavior and email handling.
- **Production performance:** measure Core Web Vitals for the actual domain with real browsing/field data. CI's `timings.json` is a local Chromium baseline, not real-world LCP/CLS/INP.
- **External links:** run the opt-in remote link check in an internet-enabled environment; HTTP 403/429/timeout results should be investigated manually rather than called broken.

## Incomplete / Needs Work (owner input or external access)

- **Resume PDF:** the final owner-approved file has not been provided. `/resume` intentionally remains `noindex`; do not fabricate a resume.
- **Gallery photo descriptions:** photos 4–10 still require owner confirmation of subjects before writing specific alt text. Generic fallback descriptions should not be passed off as actual descriptions.
- **Authentic project images:** several project cards intentionally use a neutral cover tile until actual screenshots are supplied or captured from an approved running instance.
- **Updated before/after comparisons:** archived screenshots under `public/portfolio/this-website/` represent an earlier design. Replace with owner-approved same-viewport captures of current before and after states, not re-labelled old images.
- **Case-study outcomes:** quantitative results and proprietary/client details require supporting evidence and permission before publication.
- **Visual CMS:** deferred to separately planned `v4.00`; not part of v3.03 remediation.

## Developer validation

```bash
npm ci
npm audit --omit=dev --audit-level=high
npm run lint
npm run test:unit
npm run cf-typegen
npm run build:worker
npx tsc --noEmit
```

For a local Chromium review after `npm run build`:

```bash
npm install --no-save --package-lock=false playwright@1.56.1
npx playwright install chromium
npm run smoke:browser
```

The smoke script starts the local production Next.js server, shuts it down afterwards, and writes screenshots/metrics to `artifacts/browser-smoke/`. GitHub CI archives them for 14 days. Do not commit test outputs or install Playwright into application runtime dependencies.

Review and apply valid findings, merge into `v3.03`, then release that checkpoint to `main` only. No version or minor branch may deploy.
