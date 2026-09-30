<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# LTM-Website Agent Rules

These instructions apply to all automated coding work in this repository.

## 1. Project purpose

`LTM-Website` is Liam Mo's personal portfolio at `liamthemo.com`.

The launched site is a personal **Software Developer** portfolio centered on:

- profile identity and contact links
- featured software/game/automation projects
- professional experience
- tools, languages, and technologies
- education
- interests outside technology
- GitHub activity
- a concise Work With Me/contact area

The redesign specification lives in `docs/portfolio-revamp/`.

## 2. Source-of-truth order

When instructions conflict, follow this order:

1. The user's current explicit request.
2. The phase document for the phase being implemented.
3. `docs/portfolio-revamp/README.md`.
4. `README.md`.
5. Existing implementation patterns where they do not conflict with the above.

`CLAUDE.md`, `DEPLOYMENT.md`, `TODO.md`, and old `*-mockup.png` files are intentionally retired and must not be recreated or treated as specifications. The future passkey-protected visual CMS/editor roadmap lives under `docs/v4.00/` and becomes authoritative only when v4.00 work begins.

## 3. Branching and versioning — mandatory

Major branches are only:

- `main`
- version branches matching `vX.XX`, such as `v2.01`

Never implement work directly on a major branch.

For every feature, fix, cleanup, refactor, or documentation task:

1. Identify the current major branch.
2. Create a new minor working branch from that exact major branch.
3. Make all changes on the minor branch.
4. Validate the work.
5. Open a pull request back into the same major branch.
6. Merge only after the requested work is complete.

Use clear minor branch names such as:

- `feat/v2.01-design-system`
- `fix/v2.01-mobile-nav`
- `chore/v2.01-repository-cleanup`
- `docs/v2.01-content-update`

Do not implement phase work directly on `main`. After a change is complete, validated, and merged into the active version branch, release that version branch to `main` for production visual verification unless the user explicitly says not to release it.

### Phase version mapping

`v2.00` is the immutable pre-revamp snapshot.

Each redesign phase increments the version by `0.01`:

- Phase 1 → `v2.01`
- Phase 2 → `v2.02`
- Phase 3 → `v2.03`
- Phase 4 → `v2.04`
- Phase 5 → `v2.05`
- Phase 6 → `v2.06`
- Phase 7 → `v2.07`
- Phase 8 → `v2.08`
- Phase 9 → `v2.09`
- Launch/page hardening → `v2.10`–`v2.12`

`v2.00` remains immutable. The completed portfolio revamp is intended to be frozen as `v3.00`; the passkey-protected visual CMS/editor is planned for `v4.00`. New work must still use a minor branch from the active version branch before merge.

## 4. Deployment ownership — mandatory

Production deployment is owned by Cloudflare's automatic Git integration.

### Production deployment

- Cloudflare's automatic Git integration deploys production from `main`.
- GitHub Actions must not deploy, publish, or otherwise update production.
- Keep deployment credentials out of GitHub Actions because Actions has no deployment role.

### Pull-request validation

`.github/workflows/ci.yml` validates pull requests targeting permanent version branches matching `vX.XX` only. It must never run for `main` or deploy.

### Version and minor branches

- Minor branches never deploy.
- Version branches are permanent development/release milestones and do not automatically deploy.
- After validated work is merged into the active version branch, merge the version branch into `main` to let Cloudflare's Git integration deploy it for visual verification.
- Treat this main release as the default final step for every completed change unless Liam explicitly says to keep the change off production.
- Production changes only when completed version work is intentionally released to `main`.

### Manual deployment

Production deployment is managed by Cloudflare's automatic Git integration. Do not add GitHub Actions deployment steps.

## 5. Phase workflow

Before implementing a phase:

1. Read `docs/portfolio-revamp/README.md`.
2. Read the matching `PHASE-XX-*.md` document.
3. Audit the current code against that phase's requirements.
4. Implement in small, modular pieces.
5. Run an audit → implement/fix → validate loop until automated checks pass and only genuinely manual validation remains.
6. Report what is complete, what still requires manual validation, and what is not implemented.

Do not silently expand a phase into future-phase scope unless required to keep the codebase coherent.

## 6. Architecture and code quality

Prefer modular code that is:

- readable
- reusable
- easy to extend
- data-driven where practical

Keep route files focused on composition and route concerns. Reusable UI belongs in `src/components/`; structured portfolio content belongs in `src/data/`; shared logic belongs in `src/lib/`.

Avoid duplicating project, experience, skill, or education content directly across multiple pages when one shared data source can serve them.

Use TypeScript types for shared content models and API boundaries.

## 7. Design-system rules

Phase 1 establishes the visual foundation for the entire redesign. After that foundation exists, do not bypass it with one-off styling.

- Reuse shared typography, color, spacing, radius, border, and layout tokens.
- Avoid arbitrary hard-coded colors when a design token exists.
- Keep section widths and vertical rhythm consistent.
- Reuse button/link/card primitives instead of recreating visually similar controls per section.
- Keep icon sizing and alignment consistent.
- Maintain responsive behavior from mobile through desktop.
- Respect `prefers-reduced-motion` for non-essential animation.

The homepage should read as one cohesive portfolio, not a collection of independently styled sections.

## 8. Accessibility

Every phase must preserve or improve accessibility.

At minimum:

- semantic heading order
- keyboard-operable interactive elements
- visible focus states
- meaningful accessible names for icon-only links
- sufficient text/background contrast
- decorative graphics hidden from assistive technology where appropriate
- reduced-motion alternatives for continuous or decorative animation
- no interaction that depends only on hover

## 9. Next.js and rendering

This project uses Next.js 16 App Router and React 19.

Follow the Next.js rules at the top of this file and verify unfamiliar APIs against the installed Next.js documentation before changing routing, metadata, caching, server/client component boundaries, or request APIs.

Prefer Server Components by default. Add `"use client"` only when browser state, effects, event handlers, or client-only APIs are actually required.

Keep secrets and authenticated external API access server-side.

## 10. Cloudflare/OpenNext constraints

The deployment stack is:

- Next.js 16
- `@opennextjs/cloudflare`
- Cloudflare Workers
- Wrangler 4

Important commands:

```bash
npm run build
npm run build:worker
npm run preview
npx opennextjs-cloudflare deploy
```

Cloudflare Workers Builds must use `npm run build:worker` as its build command and `npx opennextjs-cloudflare deploy` as its deploy command. The build must produce `.open-next/worker.js` and `.open-next/assets` before deployment. Do not run a plain `next build` followed by `wrangler deploy`.

Do not expose Cloudflare secrets or GitHub tokens through `NEXT_PUBLIC_*` variables or client bundles.

## 11. Validation before merge

For code-bearing changes, run or verify the equivalent of:

```bash
npm ci
npm audit --omit=dev --audit-level=high
npm run lint
npm run cf-typegen
npm run build:worker
npx tsc --noEmit
```

The OpenNext build is the preferred CI build because it validates the Worker artifact Cloudflare will deploy. Typecheck should run after the build so generated Next.js route types exist.

Also manually review, when relevant:

- mobile layout
- desktop layout
- keyboard navigation
- focus states
- reduced motion
- external links
- route redirects
- images and alt text
- live data fallbacks

Do not describe a phase as fully complete when manual validation remains; list it explicitly.

## 12. Repository hygiene

Keep the repository focused on production code, active assets, and current specifications.

- Do not commit temporary mockups to the repository root.
- Do not re-add retired planning documents.
- Remove obsolete assets when their final replacements are established.
- Keep generated build output such as `.next/` and `.open-next/` out of source control unless the repository explicitly changes that policy.
- Avoid unrelated formatting churn in task-focused changes.
