/**
 * Extract the public contribution calendar from GitHub's HTML endpoint.
 * GitHub does not expose this calendar in its unauthenticated REST API.
 * Keep this parser isolated and covered by markup fixtures.
 */
export interface GitHubContributionDay {
  date: string;
  count: number | null;
  level: 0 | 1 | 2 | 3 | 4;
  description: string;
}

export interface ParsedContributionCalendar {
  contributionDays: GitHubContributionDay[];
  contributionCount: number | null;
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&(?:amp|quot|apos|lt|gt|nbsp);/g, (entity) =>
      ({ "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&nbsp;": " " })[entity] ?? entity,
    );
}

function plainText(value: string): string {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function attr(tag: string, name: string): string | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(new RegExp("(?:^|\\s)" + escaped + "\\s*=\\s*([\\\"])(.*?)\\1", "i"));
  return match?.[2] ?? null;
}

function countFromDescription(description: string): number | null {
  if (/^no contributions?\b/i.test(description)) return 0;
  const match = description.match(/^(\d[\d,]*)\s+contributions?\b/i);
  return match ? Number(match[1].replaceAll(",", "")) : null;
}

export function parseContributionCalendar(html: string): ParsedContributionCalendar {
  const descriptions = new Map<string, string>();
  for (const match of html.matchAll(/<tool-tip\b[^>]*>[\s\S]*?<\/tool-tip>/gi)) {
    const tag = match[0];
    const openTag = tag.slice(0, tag.indexOf(">") + 1);
    const target = attr(openTag, "for");
    if (target) descriptions.set(target, plainText(tag.slice(openTag.length, -"</tool-tip>".length)));
  }

  const byDate = new Map<string, GitHubContributionDay>();
  for (const match of html.matchAll(/<(?:td|rect)\b[^>]*>/gi)) {
    const tag = match[0];
    const date = attr(tag, "data-date");
    const levelText = attr(tag, "data-level");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || levelText === null) continue;
    const level = Number(levelText);
    if (!Number.isInteger(level) || level < 0 || level > 4 || Number.isNaN(Date.parse(date))) continue;

    const tooltip = descriptions.get(attr(tag, "id") ?? "");
    const description = tooltip ?? attr(tag, "aria-label") ?? attr(tag, "data-tooltip-content") ??
      `${level === 0 ? "No" : "Public"} contributions on ${date}`;
    const explicitCount = attr(tag, "data-count");
    const count = explicitCount && /^\d+$/.test(explicitCount)
      ? Number(explicitCount)
      : countFromDescription(description);

    // Keep the most informative representation when both table and SVG cells appear.
    const existing = byDate.get(date);
    if (!existing || (existing.count === null && count !== null)) {
      byDate.set(date, { date, count, level: level as 0 | 1 | 2 | 3 | 4, description });
    }
  }

  const contributionDays = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const totalMatch = plainText(html).match(/(\d[\d,]*)\s+contributions?\s+(?:in the last year|in \d{4})/i);
  const summedTotal = contributionDays.length > 0 && contributionDays.every((day) => day.count !== null)
    ? contributionDays.reduce((sum, day) => sum + (day.count ?? 0), 0)
    : null;

  return {
    contributionDays,
    contributionCount: totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : summedTotal,
  };
}
