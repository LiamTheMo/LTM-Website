import type { Project } from "@/lib/types";

/**
 * Canonical project/case-study data for the homepage, /projects, and
 * /projects/[slug]. Display order is intentional array order.
 *
 * Optional case-study fields remain unset until real owner-approved content
 * exists. The UI hides unsupported sections rather than inventing outcomes,
 * screenshots, metrics, or implementation claims.
 */
export const projects: Project[] = [
  {
    slug: "this-website",
    title: "This Website",
    // client: omitted — this is the owner's own business site.
    services: ["websites"],
    skills: ["Fullstack Development"],
    // Restored the original owner-uploaded portfolio cover image.
    cover: {
      kind: "image",
      src: "/portfolio/this-website/cover.webp",
      alt: "The orange-and-black portfolio cover artwork with a website mockup and featured work.",
    },
    summary:
      "A fullstack Next.js portfolio with typed project content, a serverless visitor-count API, and Cloudflare D1 database persistence.",
    problem:
      "Technical work needed a fast, accessible portfolio whose content, server-side features, and deployments can evolve without duplicating pages.",
    solution:
      "Built a fullstack Next.js 16 and TypeScript application with reusable React components and typed project models. A server-side API records an approximate, cookie-aware browser-visit aggregate in Cloudflare D1, with same-origin request validation and graceful failure handling. OpenNext deploys the site to Cloudflare Workers.",
    // overview/whatIBuilt/features/role/year: verbatim from
    // individual-project-page-mockup.png, which is owner-authored copy for
    // this specific project — not template filler (see the page's file
    // comment). Every other project below leaves these unset until the owner
    // writes real copy for it.
    overview:
      "A fullstack, data-driven portfolio combining responsive project case studies with server-side API logic and database-backed visitor analytics.",
    whatIBuilt: [
      "Reusable React components and Next.js App Router pages",
      "Type-safe TypeScript project models shared across portfolio routes",
      "Server-side visitor-count API with same-origin request validation",
      "Cloudflare D1 persistence for an approximate, cookie-aware browser count",
      "Responsive Tailwind CSS UI and OpenNext deployment to Cloudflare Workers",
    ],
    features: [
      {
        icon: "bolt",
        title: "Edge-Hosted Application",
        description:
          "Next.js renders the interface while OpenNext runs the server-side application on Cloudflare Workers.",
      },
      {
        icon: "layers",
        title: "Type-safe Content Architecture",
        description:
          "Reusable components and typed data models keep project cards, case studies, and metadata consistent.",
      },
      {
        icon: "target",
        title: "Database-backed Visitor API",
        description:
          "A serverless endpoint persists an approximate visitor aggregate to D1 and degrades safely if storage is unavailable.",
      },
    ],
    role: "Design, Development, Deployment",
    year: "2025",
    // The source repository is public but remains proprietary under the license.
    sourceUrl: "https://github.com/LiamTheMo/LTM-Website",
    //
    // externalLink (doubles as the "Live Site" button on this template, and
    // feeds the sidebar's Link row) — the real domain, owner-confirmed
    // 2026-08-20, superseding the earlier note here about the mockup's
    // ephemeral Codespaces preview URL.
    externalLink: { href: "https://liamthemo.com", label: "Live Site" },
    //
    // result: intentionally omitted (the evidence-based content rules) — the site isn't launched with
    // real traffic yet, so there's no conversion number to report.
    stack: ["Next.js", "TypeScript", "Cloudflare Workers", "Cloudflare D1", "React", "Tailwind CSS"],
    engineering: ["Fullstack Architecture","Serverless API","Database Persistence","Type-safe Data Models"],
    // Real captures, supplied 2026-08-21 as JPEG — resolves the TODO that
    // used to sit here. `beforeAfter`, not `images`: see the field's own
    // comment on why a flat carousel isn't the right fit for paired
    // before/after shots. Converted to WebP the same day (the evidence-based content rules/the evidence-based content rules — see the
    // `cover` note above); pixel dimensions are each file's real size
    // (Pillow), not guessed, and don't change across the JPEG->WebP swap.
    beforeAfter: [
      {
        label: "Homepage",
        before: {
          src: "/portfolio/this-website/homepage_before.webp",
          alt: "The liamthemo.com homepage before the dark/orange redesign.",
          width: 2732,
          height: 1980,
        },
        after: {
          src: "/portfolio/this-website/homepage_after.webp",
          alt: "The liamthemo.com homepage after the dark/orange redesign.",
          width: 2732,
          height: 1984,
        },
      },
      {
        label: "About",
        before: {
          src: "/portfolio/this-website/about_before.webp",
          alt: "The liamthemo.com About page before the dark/orange redesign.",
          width: 2732,
          height: 1977,
        },
        after: {
          src: "/portfolio/this-website/about_after.webp",
          alt: "The liamthemo.com About page after the dark/orange redesign.",
          width: 2732,
          height: 1958,
        },
      },
      {
        label: "Portfolio",
        before: {
          src: "/portfolio/this-website/portfolio_before.webp",
          alt: "The liamthemo.com Portfolio page before the dark/orange redesign.",
          width: 2729,
          height: 1985,
        },
        after: {
          src: "/portfolio/this-website/portfolio_after.webp",
          alt: "The liamthemo.com Portfolio page after the dark/orange redesign.",
          width: 2732,
          height: 1968,
        },
      },
    ],
    //
    // Featured homepage card alongside the two current LTM products.
    featured: true,
  },
  {
    slug: "ltm-todo-app",
    title: "LTM Todo App",
    services: [],
    skills: ["Fullstack Development", "Product Design"],
    cover: {
      kind: "image",
      src: "/portfolio/ltm-todo-app/dashboard.webp",
      alt: "Screenshot of the LTM Todo dashboard with day-by-day planning and calendar navigation.",
    },
    summary:
      "An offline-first fullstack planner with local persistence, cross-device synchronization, task workflows, and an integrated calendar.",
    problem:
      "A personal productivity app needs responsive task and calendar interactions that remain usable offline and synchronize reliably between devices.",
    solution:
      "Implemented task and calendar state management, recurrence, reminders, and a document-parsing review workflow for PDFs, DOCX, CSV, and text. IndexedDB stores offline changes; Cloudflare D1 and Durable Objects coordinate per-account synchronization, conflict resolution, and device sessions.",
    sourceUrl: "https://github.com/LiamTheMo/LTM-Todo-App",
    externalLink: { href: "https://todo.liamthemo.com", label: "Open LTM Todo" },
    stack: ["Next.js", "TypeScript", "IndexedDB", "Cloudflare D1", "Durable Objects", "React", "Web Push"],
    engineering: ["Offline-first Architecture","Cross-device Synchronization","Conflict Resolution","State Management"],
    icon: "✓",
    featured: true,
  },
  {
    slug: "ltm-email-service",
    title: "LTM Email Service",
    services: [],
    skills: ["Fullstack Development", "Email Infrastructure"],
    cover: {
      kind: "image",
      src: "/portfolio/ltm-email-service/mail-client.webp",
      alt: "Screenshot of LTM Mail’s inbox with mailbox folders, account switcher, and message view.",
    },
    summary:
      "A fullstack webmail application with authenticated inboxes, passkey-secured administration, Gmail OAuth, and message storage.",
    problem:
      "An email client needs authenticated APIs, reliable message storage, secure account isolation, and auditable administration.",
    solution:
      "Designed a React/TypeScript frontend and serverless Cloudflare Workers APIs. D1 manages mailbox metadata, authentication sessions, and audit logs; R2 stores raw messages and attachments. Native email routing and Gmail OAuth support multiple inboxes, while WebAuthn passkeys authorize sensitive admin actions.",
    sourceUrl: "https://github.com/LiamTheMo/LTM-Email-Service",
    externalLink: { href: "https://email.liamthemo.com", label: "Open Webmail" },
    stack: ["React", "TypeScript", "Cloudflare Workers", "Cloudflare D1", "R2", "WebAuthn", "Vite"],
    engineering: ["Authentication & Authorization","Serverless APIs","Audit Logging","Session Management"],
    icon: "✉",
    featured: true,
  },
  {
    slug: "hypixel-bazaar-tracker",
    title: "Hypixel Bazaar Tracker",
    services: [],
    skills: ["Fullstack Development", "Market Analytics"],
    cover: {
      kind: "image",
      // Genuine capture in the public tracker repository; Next/Image can serve AVIF/WebP.
      src: "https://raw.githubusercontent.com/LiamTheMo/HYSB-Bazaar-Tracker/main/shots/landing-1440.png",
      alt: "Screenshot of the Hypixel Bazaar Tracker market analytics dashboard.",
    },
    summary:
      "A fullstack market analytics dashboard with data-ingestion workflows, craft-profitability calculations, and price-history visualization.",
    problem:
      "Bazaar price differences can be misleading without accounting for recipe costs, order liquidity, and shifting demand.",
    solution:
      "Built a Vite/React dashboard and a Cloudflare Worker API with typed pricing calculations, scheduled ingestion, and D1/KV/R2 storage. The repository documents craft profitability, time-of-day price patterns, and volume-adjusted comparisons. Automated ingestion is currently paused to control D1 usage, so live-data freshness is not guaranteed.",
    sourceUrl: "https://github.com/LiamTheMo/HYSB-Bazaar-Tracker",
    stack: ["TypeScript", "React", "Cloudflare Workers", "Cloudflare D1", "KV", "R2", "Vite"],
    engineering: ["Data Ingestion Pipeline","Time-series Analytics","Domain Modeling"],
    featured: false,
  },
  {
    slug: "fuse-factory",
    title: "Fuse Factory",
    // client: omitted — this is a personal project, not commissioned work.
    services: ["roblox"],
    // The game's official Roblox thumbnail, not a gameplay screenshot. Used
    // as the cover because the evidence-based content rules prefers a real image over the fallback tile;
    // real gameplay screenshots are planned but not taken yet, and when they
    // arrive they belong in `images` rather than replacing this.
    cover: {
      kind: "image",
      src: "/portfolio/fuse-factory/thumbnail.webp",
      alt: "Fuse Factory game thumbnail: the game logo above three cube-shaped Boomie characters with lit fuses, in a factory setting with colored crates.",
    },
    summary:
      "An in-development Roblox arcade game using event-driven spawning, modular client/server systems, and weighted item drops.",
    problem:
      "The mini-game it's inspired by only exists as a few minutes inside a much bigger game. There's no standalone version of just that loop: things spawning faster and faster while you sort them correctly before time runs out.",
    solution:
      "The codebase is modular — spawning, movement, UI, and item drops are separate systems rather than one script — and runs on an event-driven architecture handled on both the server and the client. The UI is built in code rather than laid out in Studio's editor. Boomies spawn and currently move randomly rather than toward the player; pattern-based movement AI is planned but not built yet. Drops use a weighted system rather than flat odds, the spawn rate ramps up as each round progresses, and players earn coins for handling boomies correctly.",
    // result / metrics: intentionally omitted (the evidence-based content rules) — this is a passion
    // project, not a client engagement, so there's no client outcome to
    // report. Still in development; most of the basic gameplay above is
    // built, but the game isn't finished. Pattern-based movement AI for
    // boomies is explicitly a planned feature, not a built one — do not
    // reword `solution` to imply it already exists.
    stack: ["Luau", "Roblox"],
    engineering: ["Event-driven Architecture","Client–Server Systems","Weighted RNG"],
    // TODO(owner): confirm whether coins/progress persist via DataStore once
    // settled, and name any other tools/services worth calling out here.
    //
    // images: intentionally omitted. The store thumbnail is the `cover` above
    // and nothing else exists yet — repeating it under "See it in action"
    // would promise gameplay and deliver the same marketing art. Add real
    // gameplay screenshots here when they're taken; the cover stays as it is.
    // featured: true — one of the mockup's three home-page picks (the evidence-based content rules Phase 2).
    featured: false,
  },
  {
    slug: "tiny-factory",
    title: "Tiny Factory",
    services: ["roblox"],
    cover: {
      kind: "image",
      src: "/portfolio/tiny-factory/cover.svg",
      alt: "Illustration of droppers and processing machines connected by a conveyor belt.",
    },
    summary:
      "A Roblox factory simulation built around weighted randomization, persistent machine placement, and data-driven production chains.",
    problem:
      "Factory games can lose their focus to oversized menus and unrelated progression systems. Tiny Factory is designed to make the production chain itself the main attraction.",
    solution:
      "The Luau project centers on weighted machine rolls, placement, conveyors, droppers, upgraders, sellers, and factory persistence. Its v1.00 MVP remains incomplete; visuals, mobile usability, economy balance, and saving reliability still need validation.",
    sourceUrl: "https://github.com/LiamTheMo/RBLX-Tiny-Factory",
    stack: ["Luau", "Roblox"],
    engineering: ["Weighted Randomization","Game-state Persistence","Simulation Systems"],
    featured: false,
  },
  {
    slug: "tank-blast",
    title: "Tank Blast",
    services: ["roblox"],
    cover: {
      kind: "image",
      src: "/portfolio/tank-blast/cover.svg",
      alt: "Illustration of toy-like tanks and a ricocheting projectile from an elevated angle.",
    },
    summary:
      "A modular Roblox tank-combat roguelite with server-authoritative gameplay, client-side movement, ricochet systems, and persistent progression.",
    problem:
      "Arcade tank combat needs responsive controls and readable projectile bounces while supporting progression beyond individual matches.",
    solution:
      "Built modular, server-authoritative combat systems with responsive client movement, an elevated follow camera, room-based levels, tank collection, equipment, and run upgrades. World 1 content and a six-station lobby are implemented; published-place device, multiplayer, and lobby validation remains open.",
    stack: ["Luau", "Roblox", "Rojo"],
    engineering: ["Server-authoritative Combat","Client–Server Architecture","Modular Game Systems"],
    featured: false,
  },
  {
    slug: "orangecheasy-youtube",
    title: "OrangeCheasy (YouTube)",
    // client: omitted — the owner's own channel, not a client engagement.
    // services: intentionally empty — video editing and channel growth
    // aren't sellable service lines here, so this doesn't get a service chip
    // (§ notes in src/lib/types.ts on `services`/`skills`).
    services: [],
    skills: ["Video Editing", "Social Media Growth"],
    summary:
      "Video editing and channel growth for the OrangeCheasy YouTube channel — grew from 300 to 2,000 subscribers in 3 months.",
    problem:
      "The channel had a small, stagnant subscriber base and needed a consistent stream of well-edited video content to grow.",
    solution:
      "Edited and published videos using DaVinci Resolve and CapCut on a consistent upload schedule.",
    result: "Grew from 300 to 2,000 subscribers in 3 months.",
    metrics: [
      { label: "Subscribers (start)", value: "300" },
      { label: "Subscribers (3 months)", value: "2,000" },
    ],
    stack: ["DaVinci Resolve", "CapCut"],
    externalLink: {
      href: "https://youtube.com/orangecheasy",
      label: "Watch the channel",
    },
    icon: "🎬",
    // avatar sits next to the title instead of in the gallery below.
    avatar: {
      src: "/portfolio/youtube/profile.webp",
      alt: "OrangeCheasy YouTube channel profile picture, a cartoon wedge of cheese.",
    },
    // The channel banner. Already a 1536x1024 (3:2) crop matching the
    // studio-standard size, so it needs no width/height override and no
    // non-default `fit`.
    cover: {
      kind: "image",
      src: "/portfolio/youtube/banner.webp",
      alt: "OrangeCheasy YouTube channel banner artwork: pixel-art logo text over a sunset city skyline with cartoon cheese wedges scattered across it.",
    },
    // The gallery no longer repeats the banner — that's the cover now. What's
    // left is the one image that shows something the cover doesn't: the real
    // channel page and its subscriber count, which is the proof behind
    // `result`.
    //
    // width/height are the asset's true dimensions. They previously read
    // 2244x1984 against a real 2732x1934 source, which stretched the image on
    // the page; the file has since been re-encoded to 1600x1133 (it was a
    // JPEG misnamed .webp) and these match it.
    images: [
      {
        src: "/portfolio/youtube/channel.webp",
        alt: "The OrangeCheasy YouTube channel page, showing 2.06k subscribers and the video grid.",
        width: 1600,
        height: 1133,
      },
    ],
    // featured: true — one of the mockup's three home-page picks (the evidence-based content rules Phase 2).
    featured: false,
  },
  {
    slug: "restaurant-sales-parser",
    title: "Restaurant Sales Parser",
    // client: omitted. No restaurant name has been cleared for public use.
    services: ["automation", "excel-data"],
    summary:
      "A Python reporting automation pipeline that extracts PDF performance data, transforms it, and generates structured summaries.",
    problem:
      "Server-performance reporting arrives as long PDF documents, making it difficult to review and compare the information efficiently.",
    // TODO(owner): sharpen this once confirmed — what system the raw export
    // actually comes from (POS export? spreadsheet download?), and what the
    // manual process looked like before: which numbers got retyped where, into
    // what, and by whom.
    solution:
      "A Python parser extracts server-performance information from the PDF report and organizes it into a readable summary. No unsupported time-saved or accuracy figures are claimed.",
    // TODO(owner): name the actual report(s) it produces once confirmed.
    //
    // TODO(owner): REAL BEFORE/AFTER METRICS — the retired pre-revamp specification
    // still open. This is the flagship case study (the evidence-based content rules: "lead with time saved
    // per week"), and it is the one project on the site whose result section
    // is missing the number that would sell it.
    //
    // `result` and `metrics` are both omitted rather than estimated. the evidence-based content rules
    // forbids inventing a result, and a plausible-sounding figure is the
    // failure mode that rule exists to prevent: "cuts a two-hour job to five
    // minutes" reads as fact, cannot be verified by the reader, and is the
    // fastest way to lose a client who asks about it. An absent section
    // costs less than a fabricated one.
    //
    // The page renders "The result" only when `result` is set, so filling
    // these two fields is the whole change — no component edit. What's needed:
    //   result:  one sentence, the outcome in the owner's words.
    //   metrics: the before/after pair, e.g.
    //            { label: "Time per week (before)", value: "..." }
    //            { label: "Time per week (after)",  value: "..." }
    stack: ["Python"],
    engineering: ["Data Extraction","ETL Workflow","Report Automation"],
    // TODO(owner): confirm the rest of the stack (e.g. the library used to read
    // the export, the input file format — .csv vs .xlsx — and what generates
    // the final report).
    // Dark-only site — dark.webp is the sole image, so it serves as both the
    // card cover and the case study's one gallery figure. The retired
    // light.webp variant has been deleted.
    cover: {
      kind: "image",
      src: "/portfolio/restaurant-sales-parser/dark.webp",
      alt: "Diagram showing a PDF server-performance report being parsed into a structured summary.",
    },
    // images: intentionally omitted. The cover above is the only asset, and
    // the case study renders the cover as its lead image — repeating it in
    // the gallery below would show the same diagram twice on one page.
    //
    // featured: false — owner call, 2026-08-21, swapped out of the home
    // page's three-card grid in favour of This Website (see that entry
    // above). Still the flagship case study on /portfolio (the retired pre-revamp specification
    // still `services: ["automation", "excel-data"]`'s proof project — this
    // only changes which three cards the home page shows.
    featured: false,
  },
  {
    slug: "computer-builds-and-repairs",
    title: "Computer Builds & Repairs",
    // client: omitted — many different people over time, not one client.
    services: ["local-tech-help"],
    // TODO(owner): a photo of a finished build would be the single highest-value
    // image on the site — this is the only proof Local Tech Help has, and it's
    // the service most likely to be found by a local search. A phone photo of
    // one completed machine is enough; it does not need to be studio work.
    cover: { kind: "tile" },
    summary:
      "11 custom-built desktops and a running list of hardware and software repairs for friends, family, and paying clients.",
    problem:
      "People kept showing up with computers that had died, slowed down for no obvious reason, or needed a machine built for what they actually do — repairs not worth a shop's time, and off-the-shelf builds that didn't fit their budget or workload.",
    solution:
      "Built desktops from parts chosen for each person's budget and workload, and diagnosed and fixed a steady stream of hardware and software faults: failed components, boot failures, unexplained slowdowns, and the usual list of things that go wrong with a computer over a few years. Some of this was paid work, some was for friends and family.",
    // result: a real, owner-confirmed count rather than an invented outcome
    // (the evidence-based content rules) — there's no single client story here, just a running total.
    result:
      "11 desktops built to date, plus an ongoing stream of repairs and upgrades.",
    metrics: [{ label: "Computers built", value: "11" }],
    stack: ["PC hardware", "BIOS configuration", "Software", "Windows troubleshooting"],
    engineering: ["Hardware Diagnostics","System Integration"],
    // images: intentionally omitted — no photos on hand yet (the evidence-based content rules prefers a
    // real screenshot over no image; same applies to build photos).
    featured: false,
  },
  {
    slug: "echo-realms",
    title: "Echo Realms",
    // client: omitted — this is a personal project, not commissioned work.
    services: ["roblox"],
    // Concept illustration, not a gameplay screenshot. Replace it with a real
    // dungeon capture once there is suitable owner-approved gameplay footage.
    cover: {
      kind: "image",
      src: "/portfolio/echo-realms/cover.svg",
      alt: "Illustrated violet crystal representing the fantasy setting of Echo Realms.",
    },
    summary:
      "A modular Roblox dungeon crawler with state-driven enemy AI, telegraphed attacks, zone-based spawning, and probability-based loot.",
    problem:
      "Wanted a dungeon crawler where the systems underneath — enemy AI, spawning, bosses, loot — are built to be reused and extended rather than one-off scripts per encounter, and where combat is readable: a player should be able to see an attack coming and react to it, not just get hit.",
    solution:
      "The codebase is modular so enemy behaviors, spawning, and loot logic can be reused across different enemies and areas rather than rewritten each time. Enemy AI telegraphs its attacks so players can read and react before they land. Enemies spawn based on the zone the player is in rather than flat random spawning, bosses are built as distinct phases rather than one flat health bar, and loot tables roll each item against its own configured chance.",
    // result / metrics: intentionally omitted (the evidence-based content rules) — personal project, no
    // client outcome. Technically playable, but light on content and
    // currently on hold — a game at this scope is hard to build solo. Do not
    // reword `solution` to imply it's a finished, content-complete game.
    stack: ["Luau"],
    engineering: ["Modular AI Systems","Combat State Machines","Loot Probability"],
    // images: intentionally omitted — no screenshots yet.
    featured: false,
  },
];
