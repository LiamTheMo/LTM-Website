import GitHubContributionGraph from "@/components/GitHubContributionGraph";
import { Card, LinkButton, Section, SectionHeader, Tag } from "@/components/ui";
import { getGitHubActivity } from "@/lib/github";

function formatRepositoryDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function RepositoryMark({ name }: { name: string }) {
  const mark =
    name === "LTM-Todo-App" ? "todo" : name === "LTM-Email-Service" ? "mail" : "web";

  return (
    <span
      aria-hidden="true"
      className="grid size-12 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent"
    >
      {mark === "todo" ? (
        <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="m8 12 2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : mark === "mail" ? (
        <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.7">
          <rect x="3.5" y="5" width="17" height="14" rx="3" />
          <path d="m5 7 7 5.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.7">
          <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 5l-4 14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

export default async function GitHubActivitySection() {
  const activity = await getGitHubActivity();

  return (
    <Section spacing="compact" aria-labelledby="github-activity-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          id="github-activity-heading"
          eyebrow="Open source"
          title="GitHub Activity"
          description="Public contribution activity and selected repositories, fetched server-side from GitHub."
        />
        <LinkButton
          href={activity.profileUrl}
          target="_blank"
          rel="noreferrer"
          variant="ghost"
          size="sm"
        >
          View GitHub
        </LinkButton>
      </div>

      {!activity.hasLiveData ? (
        <Card className="mt-8">
          <p className="text-card text-text">@{activity.username}</p>
          <p className="mt-2 max-w-2xl text-body-secondary text-text-muted">
            Live GitHub activity is temporarily unavailable. The profile link above still leads to
            the public source directly.
          </p>
        </Card>
      ) : (
        <div className="mt-8 space-y-5">
          <GitHubContributionGraph
            days={activity.contributionDays}
            contributionCount={activity.contributionCount}
          />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
            <Card>
              <p className="text-metadata font-medium text-accent">@{activity.username}</p>
              <h3 className="mt-1 text-card text-text">Public GitHub profile</h3>
              <p className="mt-2 text-body-secondary text-text-muted">
                Public profile totals and repository activity from GitHub.
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                <div>
                  <dt className="text-caption uppercase tracking-[0.12em] text-text-muted">
                    Public repos
                  </dt>
                  <dd className="mt-1 text-card text-text">
                    {activity.publicRepoCount ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-[0.12em] text-text-muted">
                    Followers
                  </dt>
                  <dd className="mt-1 text-card text-text">
                    {activity.followerCount ?? "—"}
                  </dd>
                </div>
              </dl>
            </Card>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-card text-text">Featured repositories</h3>
                <span className="text-caption text-text-muted">Selected projects</span>
              </div>

              {activity.featuredRepositories.length > 0 ? (
                <div className="mt-4 grid gap-3">
                  {activity.featuredRepositories.map((repository) => (
                    <a
                      key={repository.id}
                      href={repository.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[var(--radius-card)] border border-border bg-surface px-5 py-4 transition-colors hover:border-accent focus-visible:border-accent"
                    >
                      <div className="flex items-start gap-4">
                        <RepositoryMark name={repository.name} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                          <h4 className="text-body font-medium text-text group-hover:text-accent">
                            {repository.name}
                          </h4>
                          <p className="mt-1 line-clamp-2 text-body-secondary text-text-muted">
                            {repository.description ?? "Public repository on GitHub."}
                          </p>
                        </div>
                        {repository.language ? <Tag>{repository.language}</Tag> : null}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption text-text-muted">
                        <span>Updated {formatRepositoryDate(repository.pushedAt)}</span>
                        <span>{repository.stars} stars</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <Card className="mt-4">
                  <p className="text-body-secondary text-text-muted">
                    Featured repository details are temporarily unavailable. Visit the GitHub profile
                    for the current public repository list.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
