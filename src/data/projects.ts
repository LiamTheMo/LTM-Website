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
    // Owner-supplied 2026-08-21, resolving the TODO that used to sit here.
    // Delivered as cover.png (1.6 MB); converted to WebP (the evidence-based content rules/the evidence-based content rules — every
    // other cover on the site is already .webp) at quality 85, which held up
    // visually on inspection and cut it to ~130 KB. Source PNG deleted rather
    // than kept alongside — no other project keeps an unconverted original.
    cover: {
      kind: "image",
      src: "/portfolio/this-website/cover.svg",
      alt: "Illustration of Liam’s current portfolio homepage with a Fullstack Developer heading and cards for LTM Todo, LTM Mail, and the website.",
    },
    summary:
      "A fullstack developer portfolio built to present Liam’s projects, technical range, and experience in one fast, data-driven site.",
    problem:
      "Project details, technical work, and experience needed a clear home that is easy to browse and maintain as the portfolio grows.",
    solution:
      "Built with Next.js (App Router) and TypeScript, with project content generated from typed data files and deployed to Cloudflare Workers. The site combines project case studies, experience, contact, and live public GitHub activity.",
    // overview/whatIBuilt/features/role/year: verbatim from
    // individual-project-page-mockup.png, which is owner-authored copy for
    // this specific project — not template filler (see the page's file
    // comment). Every other project below leaves these unset until the owner
    // writes real copy for it.
    overview:
      "This is my fullstack developer portfolio: a fast, data-driven site for exploring my projects, experience, and technical work, with direct links to public repositories and a contact path.",
    whatIBuilt: [
      "Fully custom Next.js site with App Router",
      "TypeScript for type safety and scalability",
      "Tailwind CSS for styling and responsive design",
      "Deployed on Cloudflare Workers for low-cost, high-performance hosting",
      "Data-driven project system from typed content files",
    ],
    features: [
      {
        icon: "bolt",
        title: "Fast & Lightweight",
        description:
          "Optimized for performance with minimal bundle size and edge deployment.",
      },
      {
        icon: "layers",
        title: "Scalable Content",
        description:
          "Projects and services are generated from typed data files for easy updates.",
      },
      {
        icon: "target",
        title: "Clear Project Stories",
        description:
          "Project pages and clear navigation help visitors explore the work and get in touch.",
      },
    ],
    role: "Design, Development, Deployment",
    year: "2025",
    // sourceUrl: omitted — the repo is private (see the root README's
    // license notice), so there's no public link to send "View Source" to.
    //
    // externalLink (doubles as the "Live Site" button on this template, and
    // feeds the sidebar's Link row) — the real domain, owner-confirmed
    // 2026-08-20, superseding the earlier note here about the mockup's
    // ephemeral Codespaces preview URL.
    externalLink: { href: "https://liamthemo.com", label: "Live Site" },
    //
    // result: intentionally omitted (the evidence-based content rules) — the site isn't launched with
    // real traffic yet, so there's no conversion number to report.
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
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
    cover: { kind: "tile" },
    summary:
      "An ad-free, installable personal productivity app with a first-party task and calendar model, designed for desktop, iPhone, and iPad.",
    problem:
      "A lightweight personal planner should make it quick to capture tasks and see the day’s schedule without depending on a third-party calendar or adding artificial limits.",
    solution:
      "The app combines fast task capture, chronological planning, due dates, and planned-work blocks. It stores data locally in the browser with IndexedDB; Web Push reminders use a per-browser queue. There are currently no accounts or cross-device task sync.",
    sourceUrl: "https://github.com/OrangeCheasy/LTM-Todo-App",
    stack: ["TypeScript", "Next.js", "React", "IndexedDB", "Cloudflare"],
    icon: "✓",
    featured: true,
  },
  {
    slug: "ltm-email-service",
    title: "LTM Email Service",
    services: [],
    skills: ["Fullstack Development", "Email Infrastructure"],
    cover: { kind: "tile" },
    summary:
      "A responsive webmail client and Cloudflare-backed email service with passkeys, mailbox search, attachments, and optional Gmail connections.",
    problem:
      "A private email product needs a polished client and a backend that can handle message metadata, raw email, attachments, and secure sign-in.",
    solution:
      "The source-visible project pairs a React and TypeScript webmail client with a Cloudflare Workers API, D1 metadata, and R2 storage for raw messages and attachments. Production mailboxes, credentials, stored email, connected accounts, and infrastructure remain private.",
    sourceUrl: "https://github.com/OrangeCheasy/LTM-Email-Service",
    stack: ["React", "TypeScript", "Cloudflare Workers", "D1", "R2"],
    icon: "✉",
    featured: true,
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
      "A Roblox game in active development, inspired by a Super Mario Bros. DS mini-game where players sort bob-ombs before they go off — reworked into its own standalone, round-based game.",
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
    stack: ["Luau"],
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
    cover: { kind: "tile" },
    summary:
      "A validation-first Roblox factory game about rolling for machines, building compact production lines, and discovering profitable combinations.",
    problem:
      "Factory games can lose their focus to oversized menus and unrelated progression systems. Tiny Factory is designed to make the production chain itself the main attraction.",
    solution:
      "The documented core loop is produce, process, sell, earn Coins, and use a free machine roll to decide how to rebuild and expand. The project is being developed in small validation-focused versions, so this case study describes its intended core loop rather than claiming every planned system is released.",
    sourceUrl: "https://github.com/OrangeCheasy/RBLX-Tiny-Factory",
    stack: ["Luau", "Roblox"],
    featured: false,
  },
  {
    slug: "lod-server-support",
    title: "LOD Server Support",
    services: [],
    skills: ["Minecraft Modding", "Java"],
    cover: { kind: "tile" },
    summary:
      "A multiplayer mod that lets Voxy clients view distant server terrain without exploring it first, with far-away players represented in LOD terrain.",
    problem:
      "Large multiplayer worlds are usually hidden beyond a player’s normal render distance, and joining late can mean exploring just to populate distant terrain.",
    solution:
      "The mod streams distant terrain to compatible clients and includes Far Players, which shows distant players with name tags, equipment, and mounts. The README documents Fabric, NeoForge, and Paper server support, plus an optional Xaero World Map bridge.",
    sourceUrl: "https://github.com/OrangeCheasy/MC-Voxy-Server-Port",
    stack: ["Java", "Fabric", "NeoForge", "Paper"],
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
      "A Python PDF parser that turns restaurant server-performance reports into structured summaries automatically.",
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
    // images: intentionally omitted — no photos on hand yet (the evidence-based content rules prefers a
    // real screenshot over no image; same applies to build photos).
    featured: false,
  },
  {
    slug: "echo-realms",
    title: "Echo Realms",
    // client: omitted — this is a personal project, not commissioned work.
    services: ["roblox"],
    // TODO(owner): one screenshot of a dungeon room or a boss encounter would
    // promote this to an image cover. The project is on hold, so this is low
    // priority — the tile is not blocking anything.
    cover: { kind: "tile" },
    summary:
      "A Roblox dungeon crawler built around reusable systems, readable enemy attacks, zone-based spawning, phased bosses, and per-item chance loot.",
    problem:
      "Wanted a dungeon crawler where the systems underneath — enemy AI, spawning, bosses, loot — are built to be reused and extended rather than one-off scripts per encounter, and where combat is readable: a player should be able to see an attack coming and react to it, not just get hit.",
    solution:
      "The codebase is modular so enemy behaviors, spawning, and loot logic can be reused across different enemies and areas rather than rewritten each time. Enemy AI telegraphs its attacks so players can read and react before they land. Enemies spawn based on the zone the player is in rather than flat random spawning, bosses are built as distinct phases rather than one flat health bar, and loot tables roll each item against its own configured chance.",
    // result / metrics: intentionally omitted (the evidence-based content rules) — personal project, no
    // client outcome. Technically playable, but light on content and
    // currently on hold — a game at this scope is hard to build solo. Do not
    // reword `solution` to imply it's a finished, content-complete game.
    stack: ["Luau"],
    // images: intentionally omitted — no screenshots yet.
    featured: false,
  },
];
