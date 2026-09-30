# Current-State Audit — Before Portfolio Revamp

Date: 2026-09-16

## Live Website

The current homepage is structurally a service/design landing page rather than a personal developer portfolio.

Current visible flow:

1. “Hi, I’m Liam” hero
2. decorative code-editor artwork
3. Featured Work
4. About Me
5. generic virtue blocks (`Clean Code`, `Thoughtful Design`, `Problem Solver`)
6. large “Let’s Work Together” CTA
7. services/problem-selection section
8. footer

This does not match the new intended narrative, which should center on Liam’s identity, projects, experience, technical stack, education, GitHub activity, and contact options.

## Repository / Stack

Current stack is suitable for the redesign and does not require a framework rewrite:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- OpenNext for Cloudflare
- Cloudflare Workers deployment

The redesign should build on the existing stack rather than migrate frameworks.

## Existing Strengths to Keep

### Centralized theme tokens

`src/app/globals.css` already defines shared colors, fonts, type sizes, focus states, and reduced-motion behavior. This is a good foundation.

### Existing project content model/components

The site already has project-related components/data that can be migrated into the new `/projects` information architecture rather than thrown away.

### Existing contact route and deployment pipeline

The contact flow and Cloudflare deployment setup provide useful infrastructure for the final Work With Me CTA and future server-side integrations.

## Main Problems to Correct

### 1. Identity mismatch

The first impression is “designer/developer services site,” not “Liam Mo’s fullstack developer portfolio.”

### 2. Inconsistent visual rhythm

Although global tokens exist, many sections still make local choices for margins, widths, font roles, and utility classes. The redesign needs stricter shared layout primitives.

### 3. Homepage information architecture

The current services and generic virtue content occupies space that should instead show:

- profile/photo/socials
- professional title
- concise about/resume
- projects
- experience
- technical stack
- education
- GitHub activity

### 4. Route naming

The current project index is `/portfolio`, while the new site language should consistently use `Projects`. The redesign should move the public destination to `/projects` and redirect `/portfolio`.

### 5. Personal proof is missing

The homepage needs direct evidence of work and activity: experience, education, technical tools, GitHub activity, and a current resume.

### 6. Current homepage is intentionally non-indexable

The current homepage metadata contains `robots: { index: false, follow: false }`. This must be revisited as part of the final production launch rather than accidentally carrying into the finished portfolio.

## Recommended Positioning

Primary title: **Fullstack Developer**

Reasoning: it foregrounds Liam's end-to-end web development focus while still representing the wider portfolio—games, automation, tooling, and software projects.

## Target Outcome

The redesigned site should feel like one coherent personal portfolio system rather than a collection of independently styled sections. A visitor should be able to answer these questions quickly:

1. Who is Liam?
2. What kind of developer is he?
3. What has he built?
4. Where has he worked / what responsibility has he held?
5. What technologies does he use?
6. What is he studying?
7. Is he actively building?
8. How can I contact or work with him?