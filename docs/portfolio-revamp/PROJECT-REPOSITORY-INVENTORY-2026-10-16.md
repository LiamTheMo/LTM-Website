# Curated repository inventory — October 16, 2026

Source: authenticated GitHub repository listing and project README/config/asset review for `LiamTheMo`. This is a snapshot for portfolio content selection, not a claim that every deployment has been visually checked.

## Included repositories (9)

| Repository | Portfolio slug | Public source | Evidence / content policy |
| --- | --- | --- | --- |
| LTM-Website | this-website | Yes | Next.js 16, typed portfolio content, Cloudflare/OpenNext, existing WebP screenshots. |
| LTM-Todo-App | ltm-todo-app | Yes | Offline-first Next.js/React, IndexedDB, Cloudflare sync, import/review flows, existing WebP screenshot. |
| LTM-Email-Service | ltm-email-service | Yes (proprietary license) | React/Vite + Cloudflare mail services, passkey admin, native/Gmail inboxes, existing WebP screenshot. |
| HYSB-Bazaar-Tracker | hypixel-bazaar-tracker | Yes | React/Vite and Cloudflare analytics, verified screenshot from `shots/`; ingestion currently paused. |
| RBLX-Fuse-Factory | fuse-factory | No | In-development Luau game, existing owner-provided WebP thumbnail. |
| RBLX-Tiny-Factory | tiny-factory | Yes (proprietary) | Incomplete v1.00 MVP; lightweight vector illustration, not a gameplay capture. |
| RBLX-Tank-Blast | tank-blast | No | Phase 10 implemented, published-place validation open; vector illustration, not a gameplay capture. |
| RBLX-Echo-Realms | echo-realms | No | Early/inactive development, modular enemy/loot work; vector illustration, not a gameplay capture. |
| HN-ServerSales-Parser | restaurant-sales-parser | No | Existing anonymized PDF parser case study and WebP diagram. |

## Intentionally excluded repositories (10)

**School/coursework:** `COMP2631`, `COMP2655`, `COMP2659-Tank-Duels`.

**Minecraft mod ports:** `MC-Voxy-Port`, `MC-Voxy-Server-Port`, `MC-Carpet-Extra-Port`. Their source repositories remain untouched; they are not advertised in the portfolio.

**Not selected as major showcase projects:** `HYTL-SC`, `RBLX-ClickingSim`, `RBLX-100-Players-VS-One-Button`, `RBLX-Tiny-Tanks`. These can be revisited when a distinctive, verified case study and suitable media exist.

## Non-repository work retained

`orangecheasy-youtube` and `computer-builds-and-repairs` remain as independently documented personal/creative work, rather than forcing the Projects section to represent only GitHub repositories.

## Media and links

- Prefer existing real WebP assets, then actual project screenshots. Never call a conceptual illustration a gameplay screenshot.
- `Tank Blast`, `Tiny Factory`, and `Echo Realms` now have compact local SVG illustration covers.
- The Bazaar image is an authentic public-repository screenshot served via Next/Image with an exact GitHub path allowlist; the image optimizer can negotiate AVIF/WebP. It is not copied into the portfolio repository.
- `Computer Builds & Repairs` still needs a real owner-approved photo, rather than a fabricated image.
- Omit GitHub source links for private repositories. Public visibility alone does not imply an open-source license.
- Do not link unverified production domains for projects without a confirmed official site. Website and Todo URLs are owner-established; Email's sign-in domain is `email.liamthemo.com`.

## Outstanding verification

The current execution environment could inspect GitHub source and workflow results but could not open external project sites or control a browser tab. After promotion to main, independently inspect `liamthemo.com/projects`, every new detail page, the Bazaar remote image through Cloudflare image optimization, mobile layouts, and confirmed external links. Confirm Cloudflare's automatic main-branch deployment separately.
