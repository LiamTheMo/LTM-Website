/**
 * Shared content shapes for the live portfolio.
 *
 * Keep these models evidence-based: optional project fields should stay unset
 * until real content exists rather than being filled with inferred copy.
 */

export type ServiceSlug =
  | "automation"
  | "excel-data"
  | "websites"
  | "local-tech-help"
  | "roblox";

export type ProjectCover =
  | {
      kind: "image";
      src: string;
      alt: string;
      /**
       * Real pixel dimensions of the asset, same contract as `images` below.
       * Both default to 1536x1024 (3:2) — the studio-standard crop the
       * existing covers use — so this is only needed for a real, uncropped
       * asset with a different shape.
       */
      width?: number;
      height?: number;
      /**
       * How the image fits the 3:2 card box. Defaults to `"cover"` — fill it,
       * cropping evenly. `"contain"` letterboxes instead, for a source whose
       * aspect ratio is too extreme to crop into 3:2 without losing the point
       * of the image (e.g. a wide banner would lose its logo text).
       */
      fit?: "cover" | "contain";
    }
  | {
      /**
       * The designed fallback: the project's first service hue as a tint wash
       * behind that service's icon. A project with no service line at all
       * falls back further to a neutral tile and `Project.icon`.
       */
      kind: "tile";
    };

/**
 * One "Key Features" card on the case study page. `icon` is a closed set
 * rather than a free string so the page can map it to a hand-drawn SVG
 * (`FeatureIcon` in the case study template) instead of storing markup in a
 * data file — add a key here and a matching case there together.
 */
export interface ProjectFeature {
  icon: "bolt" | "layers" | "target";
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  client?: string; // omit or anonymize if not cleared
  /**
   * Classifies the project using the service-domain taxonomy shared by project
   * category labels and the contact flow. Empty for portfolio-only work that
   * does not map to one of those domains; use `skills` instead.
   */
  services: ServiceSlug[];
  /**
   * Project discipline labels. For a service-backed project, these may add
   * a distinct engineering discipline (e.g. Fullstack Development) without
   * changing its service classification. Plain, non-colour labels.
   */
  skills?: string[];
  /** Verified software-engineering approaches used by this project, distinct from technology stack names. */
  engineering?: string[];
  /** Emoji for a `kind: "tile"` cover when `services` is empty, so there is no service colour or icon to build the tile from. Ignored otherwise. */
  icon?: string;
  /** An off-site destination for the work itself (e.g. a YouTube channel) — rendered as a link on the case study page. */
  externalLink?: { href: string; label: string };
  /** A small identity image (e.g. a channel/profile picture) shown next to the title on the case study page — separate from the `images` gallery below the fold. */
  avatar?: { src: string; alt: string };
  /**
   * Required. The card grid is the visual centrepiece of both /projects
   * and the home page, and a card with no thumbnail collapses the row — so
   * every project declares one, either a real image or the designed tile.
   * See `ProjectCover`.
   *
   * Separate from `images` below on purpose: `cover` is the card face,
   * `images` is the case study gallery. A project can have a cover and no
   * gallery (nothing to show in detail yet), or a cover that also appears in
   * the gallery — that duplication is intentional and cheap, since next/image
   * serves the same asset at two sizes from one source.
   */
  cover: ProjectCover;
  summary: string; // one sentence, outcome-focused
  problem: string;
  solution: string;
  /**
   * The case study page's "Overview" paragraph. Optional: falls back to
   * `problem` + `solution` (already-approved copy) rather than leaving the
   * section empty, so a project doesn't need bespoke overview copy on day
   * one to render the individual-project-page template correctly.
   */
  overview?: string;
  /** "What I Built" checklist. Omit rather than derive-and-reword `solution` — see §11 on inventing copy. */
  whatIBuilt?: string[];
  /** "Key Features" cards. Omit entirely (the section hides) until real, owner-written feature copy exists. */
  features?: ProjectFeature[];
  /** e.g. "Design, Development, Deployment". Omit rather than guess from `stack`/`skills`. */
  role?: string;
  /** e.g. "2025". Omit rather than guess. */
  year?: string;
  /** GitHub repo (or other source) link, rendered as the "View Source" button. Omit if the source isn't public. */
  sourceUrl?: string;
  /**
   * Quantified outcome — hours saved, errors removed, etc. Optional because a
   * project without an owner-confirmed result has none to show. The case
   * study page renders the result section only when this is present.
   */
  result?: string;
  /** Structured before/after stat callouts, once known. */
  metrics?: { label: string; value: string }[];
  stack: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
    /**
     * Real pixel dimensions of the asset. Both default to 1536x1024 (3:2) —
     * the studio-standard crop used by the existing case study screenshots —
     * so this is only needed when a real, uncropped asset (e.g. a YouTube
     * banner) has a different shape. The case study gallery uses these to
     * size the image box, so a mismatched value here will visibly stretch
     * the image.
     */
    width?: number;
    height?: number;
    // `fit` used to live here, back when images[0] doubled as the card
    // thumbnail. It moved to `ProjectCover` with that job — a gallery figure
    // is never cropped to a fixed box, it sizes itself from width/height
    // above, so there was nothing left for the option to do.
  }[];
  /**
   * Paired redesign screenshots (e.g. old homepage vs new homepage), rendered
   * by `BeforeAfterCompare` as its own "Before / After" section — separate
   * from `images`/`ScreenshotCarousel` because a flat filmstrip has no way to
   * keep a before next to its matching after once there are more than a
   * handful of images (three-per-row wraps a pair across scroll pages). Full,
   * uncropped screenshots, so both carry their real pixel dimensions rather
   * than defaulting to the 3:2 `images` crop.
   */
  beforeAfter?: {
    label: string;
    before: { src: string; alt: string; width: number; height: number };
    after: { src: string; alt: string; width: number; height: number };
  }[];
  featured: boolean;
}

/**
 * Display metadata for the service-domain taxonomy used by project category
 * labels, contact routing, and project cover fallbacks.
 *
 * `chipHex` mirrors the corresponding CSS token because generated Open Graph
 * images render through satori and cannot read Tailwind/CSS custom properties.
 * Keep the literal values synchronized with `--color-service-*` in globals.css.
 */
export const SERVICE_META: Record<
  ServiceSlug,
  { title: string; chipClass: string; chipHex: string; icon: string }
> = {
  automation: {
    title: "Automation & Python",
    chipClass: "bg-service-automation",
    chipHex: "#fcc4bf",
    icon: "🔄",
  },
  "excel-data": {
    title: "Excel & Data",
    chipClass: "bg-service-excel",
    chipHex: "#e1d4a4",
    icon: "📊",
  },
  websites: {
    title: "Websites",
    chipClass: "bg-service-websites",
    chipHex: "#ade2ca",
    icon: "🌐",
  },
  "local-tech-help": {
    title: "Local Tech Help",
    chipClass: "bg-service-local",
    chipHex: "#b8d7ff",
    icon: "🖥️",
  },
  roblox: {
    title: "Roblox Development",
    chipClass: "bg-service-roblox",
    chipHex: "#ebc6ec",
    icon: "🎮",
  },
};
