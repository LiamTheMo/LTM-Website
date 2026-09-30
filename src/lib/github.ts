const GITHUB_USERNAME = "OrangeCheasy";
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;
const GITHUB_REVALIDATE_SECONDS = 60 * 60;
const FEATURED_REPOSITORY_NAMES = [
  "LTM-Todo-App",
  "LTM-Email-Service",
  "LTM-Website",
] as const;

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "liamthemo-portfolio",
} as const;

interface GitHubProfileResponse {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

interface GitHubRepositoryResponse {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

export interface GitHubContributionDay {
  date: string;
  count: number | null;
  level: 0 | 1 | 2 | 3 | 4;
  description: string;
}

export interface GitHubPublicRepository {
  id: number;
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
}

export interface GitHubActivityData {
  username: string;
  profileUrl: string;
  publicRepoCount: number | null;
  followerCount: number | null;
  contributionCount: number | null;
  contributionDays: readonly GitHubContributionDay[];
  featuredRepositories: readonly GitHubPublicRepository[];
  hasLiveData: boolean;
}

async function fetchGitHub<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers: githubHeaders,
      next: { revalidate: GITHUB_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function textContent(value: string) {
  return decodeHtml(value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

function attribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return match?.[1] ?? null;
}

function countFromDescription(description: string) {
  if (/^no contributions?/i.test(description)) {
    return 0;
  }

  const match = description.match(/^([\d,]+)\s+contributions?/i);
  return match ? Number(match[1].replaceAll(",", "")) : null;
}

function parseContributionCalendar(html: string) {
  const descriptions = new Map<string, string>();
  const tooltipPattern = /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi;

  for (const match of html.matchAll(tooltipPattern)) {
    const tooltipTag = match[1] ?? "";
    const target = attribute(tooltipTag, "for");
    if (!target) continue;
    descriptions.set(target, textContent(match[2] ?? ""));
  }

  const contributionDays: GitHubContributionDay[] = [];
  const dayPattern = /<(?:td|rect)\b[^>]*\bdata-date=["']\d{4}-\d{2}-\d{2}["'][^>]*>/gi;

  for (const match of html.matchAll(dayPattern)) {
    const tag = match[0];
    const date = attribute(tag, "data-date");
    const rawLevel = Number(attribute(tag, "data-level"));
    const id = attribute(tag, "id");

    if (!date || !Number.isInteger(rawLevel) || rawLevel < 0 || rawLevel > 4) {
      continue;
    }

    const description =
      (id ? descriptions.get(id) : null) ??
      `${rawLevel === 0 ? "No" : "Public"} contributions on ${date}`;

    contributionDays.push({
      date,
      count: countFromDescription(description),
      level: rawLevel as 0 | 1 | 2 | 3 | 4,
      description,
    });
  }

  contributionDays.sort((a, b) => a.date.localeCompare(b.date));

  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+(?:in the last year|in \d{4})/i);
  const parsedTotal = totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : null;
  const knownCounts = contributionDays.map((day) => day.count).filter((count) => count !== null);
  const summedTotal =
    knownCounts.length === contributionDays.length && contributionDays.length > 0
      ? knownCounts.reduce<number>((total, count) => total + (count ?? 0), 0)
      : null;

  return {
    contributionDays,
    contributionCount: parsedTotal ?? summedTotal,
  };
}

async function fetchContributionCalendar() {
  try {
    const response = await fetch(GITHUB_CONTRIBUTIONS_URL, {
      headers: {
        Accept: "text/html",
        "User-Agent": "liamthemo-portfolio",
      },
      next: { revalidate: GITHUB_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    return parseContributionCalendar(await response.text());
  } catch {
    return null;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivityData> {
  const [profile, repositoryResults, calendar] = await Promise.all([
    fetchGitHub<GitHubProfileResponse>(`/users/${GITHUB_USERNAME}`),
    Promise.all(
      FEATURED_REPOSITORY_NAMES.map((repositoryName) =>
        fetchGitHub<GitHubRepositoryResponse>(`/repos/${GITHUB_USERNAME}/${repositoryName}`),
      ),
    ),
    fetchContributionCalendar(),
  ]);

  const featuredRepositories = repositoryResults
    .filter((repository): repository is GitHubRepositoryResponse => Boolean(repository))
    .filter((repository) => !repository.archived)
    .map((repository) => ({
      id: repository.id,
      name: repository.name,
      url: repository.html_url,
      description: repository.description,
      language: repository.language,
      stars: repository.stargazers_count,
      pushedAt: repository.pushed_at,
    }));

  return {
    username: profile?.login ?? GITHUB_USERNAME,
    profileUrl: profile?.html_url ?? GITHUB_PROFILE_URL,
    publicRepoCount: profile?.public_repos ?? null,
    followerCount: profile?.followers ?? null,
    contributionCount: calendar?.contributionCount ?? null,
    contributionDays: calendar?.contributionDays ?? [],
    featuredRepositories,
    hasLiveData: Boolean(profile || featuredRepositories.length || calendar?.contributionDays.length),
  };
}
