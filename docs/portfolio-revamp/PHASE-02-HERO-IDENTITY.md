# Phase 02 — Hero, Identity & About

## Objective

Make the first screen immediately answer: who is Liam, what does he do, where can a visitor find him, and how can they learn more?

The current illustrated/editor-style hero should be replaced with a personal identity-first hero.

## Homepage Content

### Profile photo

- Use a real profile photo as the primary visual.
- Serve an optimized WebP/AVIF derivative through `next/image`.
- Preserve a sensible crop on desktop and mobile.
- Give it descriptive alt text based on the final image.

Suggested asset path:

`public/profile/liam-profile.webp`

### Name

Primary hero name:

**Liam Mo**

The name should be the dominant text element rather than a sentence such as “Hi, I’m Liam.”

### Social/contact icon row

Directly below or beside the name:

- GitHub
- LinkedIn
- Email/contact

Optional later additions should use the same shared `IconLink` component.

Behavior:

- GitHub and LinkedIn open externally with safe `rel` values.
- Email should either open `/contact` or a `mailto:` link depending on the final preference.
- Every icon must have an accessible label and visible hover/focus state.

### Professional title

Use one primary title:

**Fullstack Developer**

This title foregrounds end-to-end web development while the portfolio also showcases games, automation, tooling, and other software projects.

### About copy

Keep this short enough to scan in a few seconds. It should mention the mix of work rather than generic claims like “problem solver.”

Draft content direction:

> I’m a fullstack developer focused on building useful, polished software across web applications, games, automation, and developer tools. I enjoy taking projects from an early idea through implementation, deployment, and iteration, with an emphasis on clean systems and practical user experience.

Final wording can be refined after the surrounding page is implemented.

### Resume action

Add a clear `View Resume` button under the about copy.

Preferred behavior:

- route to `/resume` if a dedicated resume page is built; or
- open a stable PDF asset in a new tab.

Suggested PDF path if using a direct file:

`public/resume/liam-mo-resume.pdf`

## Layout Direction

Desktop:

- two-column hero
- copy/socials on one side, portrait on the other
- generous but controlled whitespace

Mobile:

- portrait remains visible rather than being removed
- name/title/socials remain above the fold where practical
- no oversized decorative art between identity and content

## Acceptance Criteria

- A first-time visitor can identify Liam, his role, and primary links without scrolling.
- Profile image remains sharp and correctly cropped across breakpoints.
- Social links are keyboard accessible and have accessible names.
- `View Resume` is a clear primary or secondary action.
- Hero contains no generic virtue cards or decorative code-editor mockup.
- Final layout does not depend on fixed viewport heights.

## Manual Inputs

- Approved profile photo.
- Exact LinkedIn URL.
- Final resume asset/content.