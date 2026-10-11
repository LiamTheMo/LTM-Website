import { parseContributionCalendar, type GitHubContributionDay } from "@/lib/github-contributions";
export type { GitHubContributionDay } from "@/lib/github-contributions";

const GITHUB_USERNAME = "LiamTheMo";
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;
const GITHUB_REVALIDATE_SECONDS = 60 * 60;
const FEATURED_REPOSITORY_NAMES = [
  "LTM-Todo-App",
  "LTM-Email-Service",
  "LTM-Website",
] as const;
const FEATURED_REPOSITORY_NAME_SET = new Set<string>(FEATURED_REPOSITORY_NAMES);

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

    const parsed = parseContributionCalendar(await response.text());
    return parsed.contributionDays.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivityData> {
  const [profile, repositories, calendar] = await Promise.all([
    fetchGitHub<GitHubProfileResponse>(`/users/${GITHUB_USERNAME}`),
    fetchGitHub<GitHubRepositoryResponse[]>(
      `/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`,
    ),
    fetchContributionCalendar(),
  ]);

  const featuredRepositories = (repositories ?? [])
    .filter((repository) => FEATURED_REPOSITORY_NAME_SET.has(repository.name))
    .filter((repository) => !repository.archived)
    .map((repository) => ({
      id: repository.id,
      name: repository.name,
      url: repository.html_url,
      description:
        repository.name === "LTM-Website"
          ? "Fullstack developer portfolio for Liam Mo — selected projects, experience, and technical work."
          : repository.description,
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
