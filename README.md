# LiamTheMo Portfolio

Personal portfolio website for **Liam Mo**, built around software development, projects, experience, technical skills, education, GitHub activity, and ways to get in touch.

**Live site:** https://liamthemo.com

The former service-first site has been rebuilt as a personal developer portfolio. The primary positioning is **Software Developer**, with supporting work across full-stack development, game development, automation, tooling, and UI implementation. The v3.00 line is the finalized portfolio baseline, with only owner-supplied photos and the final resume still being added as content polish.

## Current development line

| Item | Value |
| --- | --- |
| Pre-revamp snapshot | `v2.00` |
| Current major branch | `v3.00` |
| Current phase | Final content polish — profile photos, Outside the Tech gallery, and final resume |
| Production domain | `liamthemo.com` |

`v2.00` is the preserved snapshot of the website before the portfolio revamp and should not be rewritten.

## Revamp roadmap

Each portfolio phase maps to a `v0.01` version increment:

| Phase | Major branch | Scope |
| --- | --- | --- |
| 1 | `v2.01` | Design system and site shell |
| 2 | `v2.02` | Hero, identity, about, social links, resume |
| 3 | `v2.03` | Featured projects and `/projects` migration |
| 4 | `v2.04` | Experience |
| 5 | `v2.05` | Skills and technology marquee |
| 6 | `v2.06` | Education and Outside the Tech |
| 7 | `v2.07` | GitHub activity integration |
| 8 | `v2.08` | Work With Me, footer, visitor statistic |
| 9 | `v2.09` | Accessibility, SEO, performance, launch audit |
| Hardening | `v2.10`–`v2.12` | Secondary-page normalization, repository/deployment hardening, SEO launch |
| Portfolio baseline | `v3.00` | Finalized revamp architecture and final owner-supplied content polish |
| Visual CMS/editor | `v4.00` | Passkey-protected editing system (planned) |

The completed redesign plan lives in [`docs/portfolio-revamp/`](./docs/portfolio-revamp/). The launch state is tracked in [`docs/portfolio-revamp/LAUNCH-AUDIT.md`](./docs/portfolio-revamp/LAUNCH-AUDIT.md), and the future v4.00 editor roadmap lives in [`docs/v4.00/`](./docs/v4.00/).

## Git workflow

This repository uses version branches as stable major branches.

- Major branches are `main` and branches matching `vX.XX`.
- Never implement work directly on a major branch.
- Create a minor working branch from the current major branch for every feature, fix, cleanup, or documentation task.
- Complete and validate the work on the minor branch, then merge it back into the same major branch.
- Minor branches must not introduce deployment triggers that can deploy from the minor branch.
- Production deployment is managed by Cloudflare's automatic Git integration from `main`; GitHub Actions must not deploy.
- When a phase is complete, the next phase begins from a new major branch with the version incremented by `0.01`.

Example:

```text
v3.00
  └─ docs/v3.00-readme-refresh
       └─ merge back into v3.00

v3.00 finalized
  └─ future major editor/CMS work begins on v4.00
```

## Stack

| Concern | Technology |
| --- | --- |
| Framework | Next.js 16, App Router |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Hosting | Cloudflare Workers |
| Adapter | `@opennextjs/cloudflare` |
| Worker tooling | Wrangler 4 |
| CI | GitHub Actions |
| Production deployment | GitHub Actions → Cloudflare Workers |
| Security scanning | CodeQL, npm audit, Dependabot |

## Local development

Node.js 22 or newer is recommended.

```bash
npm install
npm run dev
```

Useful validation commands:

```bash
npm run lint
npm run build
npx tsc --noEmit
npm run build:worker
```

`npm run build` must remain the normal Next.js production build (`next build`). OpenNext invokes that script internally when creating the Worker artifact.

`npm run build:worker` runs the OpenNext adapter and generates `.open-next/`, including `.open-next/worker.js` and `.open-next/assets`.

For a local Cloudflare/OpenNext preview:

```bash
npm run preview
```

## Visitor counter

The Phase 8 footer supports an anonymous unique-browser approximation using a Cloudflare D1 binding named `VISITOR_DB`.

The counter stores only one aggregate integer. A first-party HttpOnly cookie prevents the same browser from incrementing the total again for approximately one year; no IP address, email, device fingerprint, or visitor identifier is stored in D1. The increment is a single atomic SQLite upsert, and the API disables caching so the stat remains current even when the homepage itself is cached.

To enable the counter in production without exposing the D1 resource ID in this public repository, configure the GitHub `production` environment secrets `CLOUDFLARE_VISITOR_DB_NAME` and `CLOUDFLARE_VISITOR_DB_ID`. Configure the binding in the Cloudflare build environment when needed. If both secrets are omitted, the site deploys without the optional binding and the footer degrades to `Visitor count unavailable`.

## Project structure

```text
src/app/                  Next.js routes and route-level metadata
src/components/           Shared UI components
src/data/                 Structured portfolio, project, and site content
src/lib/                  Shared utilities, types, navigation, and server logic
public/                    Static assets
docs/portfolio-revamp/    Completed redesign specification, audits, and phase documents
.github/workflows/         PR validation, production deployment, security scanning
```

## Portfolio revamp documents

Start with:

- [`docs/portfolio-revamp/README.md`](./docs/portfolio-revamp/README.md) — master redesign plan and homepage order
- [`docs/portfolio-revamp/CURRENT-STATE-AUDIT.md`](./docs/portfolio-revamp/CURRENT-STATE-AUDIT.md) — current-site audit
- [`docs/portfolio-revamp/LAUNCH-AUDIT.md`](./docs/portfolio-revamp/LAUNCH-AUDIT.md) — current launch/indexing state
- `docs/portfolio-revamp/PHASE-XX-*.md` — phase-specific scope, implementation guidance, and acceptance criteria

Legacy mockups and the old `CLAUDE.md`, `DEPLOYMENT.md`, and `TODO.md` documents have intentionally been removed. Do not use or recreate them as project specifications.

## Deployment

Production deployment is managed by Cloudflare's automatic Git integration from `main`.

### Deployment workflow

Cloudflare's automatic Git integration is the only production deployment path. Keep GitHub Actions deployment workflows removed. GitHub Actions must never deploy or publish production.

### Pull-request validation

`.github/workflows/ci.yml` runs for pull requests targeting permanent version branches matching `vX.XX` only. It installs dependencies, runs a production dependency audit, lints, generates Cloudflare types, builds the OpenNext Worker, and typechecks. It never runs on `main` or deploys.

### Version branches

Branches such as `v2.01`, `v2.12`, `v3.00`, and later versions are permanent development/release milestones. They do not automatically deploy to production. Production changes are released only when intentionally merged/pushed to `main`.

### Manual deployment

For an explicitly requested local manual deployment:

```bash
npm run deploy
```

Use the same narrowly scoped Cloudflare credentials and ensure any required production resource bindings are present before deploying.

## Public-repository security

This repository is intentionally public, so source code must never be treated as a secret boundary.

- `.env*`, `.dev.vars*`, private keys, Wrangler local state, and build output are ignored by Git.
- Cloudflare credentials and private D1 identifiers are supplied through GitHub/Cloudflare secrets, not committed files.
- `wrangler.jsonc` declares required secret names without storing values and preserves dashboard-managed non-secret variables during deployments.
- GitHub Actions validation workflows use explicit least-privilege permissions and immutable action SHAs.
- CodeQL scans only permanent version branches; it never runs on `main`.
- Dependabot checks npm and GitHub Actions dependencies weekly.
- CI blocks pull requests with high/critical production dependency audit findings.
- Public POST endpoints validate origin/request shape, and the quote webhook code avoids logging secret-bearing network errors.
- Baseline browser security headers are applied globally through Next.js.
- See [`SECURITY.md`](./SECURITY.md) for private vulnerability-reporting guidance.

Repository-level branch rules, secret scanning/push protection, private vulnerability reporting, and GitHub Actions allow-list policies are defense-in-depth settings that should also be enabled in GitHub where available.

## License

Copyright © 2026 Liam Mo. All rights reserved.

This repository and its contents are proprietary. Unauthorized copying, modification, distribution, or use of this source code is prohibited.
