import type { GitHubContributionDay } from "@/lib/github";

interface GitHubContributionGraphProps {
  days: readonly GitHubContributionDay[];
  contributionCount: number | null;
}

interface CalendarWeek {
  start: Date;
  days: readonly (GitHubContributionDay | null)[];
}

const contributionColors = {
  0: "var(--color-surface-2)",
  1: "color-mix(in srgb, var(--color-accent) 22%, var(--color-surface-2))",
  2: "color-mix(in srgb, var(--color-accent) 42%, var(--color-surface-2))",
  3: "color-mix(in srgb, var(--color-accent) 68%, var(--color-surface-2))",
  4: "var(--color-accent)",
} as const;

const contributionCellBorder =
  "inset 0 0 0 1px color-mix(in srgb, var(--color-text) 5%, transparent)";

const CELL_SIZE = 10;
const CELL_GAP = 3;

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + amount);
  return next;
}

function buildWeeks(days: readonly GitHubContributionDay[]): CalendarWeek[] {
  if (days.length === 0) return [];

  const byDate = new Map(days.map((day) => [day.date, day]));
  const first = parseDate(days[0].date);
  const last = parseDate(days[days.length - 1].date);
  const start = addDays(first, -first.getUTCDay());
  const end = addDays(last, 6 - last.getUTCDay());
  const weeks: CalendarWeek[] = [];

  for (let weekStart = start; weekStart <= end; weekStart = addDays(weekStart, 7)) {
    weeks.push({
      start: weekStart,
      days: Array.from({ length: 7 }, (_, dayIndex) => {
        const date = addDays(weekStart, dayIndex);
        return byDate.get(dateKey(date)) ?? null;
      }),
    });
  }

  return weeks;
}

function buildMonthLabels(weeks: readonly CalendarWeek[]) {
  const labels: { label: string; weekIndex: number }[] = [];
  let lastMonth = "";

  weeks.forEach((week, weekIndex) => {
    const firstVisibleDay = week.days.find((day) => day !== null);
    if (!firstVisibleDay) return;

    const firstOfMonth = week.days.find((day) => {
      if (!day) return false;
      return parseDate(day.date).getUTCDate() === 1;
    });
    const date = firstOfMonth ? parseDate(firstOfMonth.date) : parseDate(firstVisibleDay.date);
    const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;

    if (monthKey === lastMonth) return;

    labels.push({
      label: new Intl.DateTimeFormat("en-US", {
        month: "short",
        timeZone: "UTC",
      }).format(date),
      weekIndex,
    });
    lastMonth = monthKey;
  });

  return labels;
}

export default function GitHubContributionGraph({
  days,
  contributionCount,
}: GitHubContributionGraphProps) {
  const weeks = buildWeeks(days);
  const monthLabels = buildMonthLabels(weeks);
  const calendarWidth = weeks.length * CELL_SIZE + Math.max(0, weeks.length - 1) * CELL_GAP;
  const summary =
    contributionCount === null
      ? "GitHub contributions in the last year"
      : `${contributionCount.toLocaleString("en-US")} contributions in the last year`;

  if (weeks.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-border bg-surface px-4 py-5 text-sm text-text-muted">
        Contribution calendar is temporarily unavailable.
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 text-text">
      <p className="mb-3 text-[16px] font-normal leading-6">{summary}</p>

      <div className="no-scrollbar overflow-x-auto pb-1">
        <div className="w-max min-w-full">
          <div
            className="relative ml-8 h-[18px] text-[12px] leading-[18px] text-text-muted"
            style={{ width: calendarWidth }}
            aria-hidden="true"
          >
            {monthLabels.map((month) => (
              <span
                key={`${month.label}-${month.weekIndex}`}
                className="absolute top-0 whitespace-nowrap"
                style={{ left: month.weekIndex * (CELL_SIZE + CELL_GAP) }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div className="mt-1 flex" role="img" aria-label={summary}>
            <div
              className="mr-1 grid w-7 shrink-0 text-[12px] leading-[10px] text-text-muted"
              style={{
                gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
                rowGap: `${CELL_GAP}px`,
              }}
              aria-hidden="true"
            >
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            <div className="flex" style={{ columnGap: `${CELL_GAP}px` }} aria-hidden="true">
              {weeks.map((week) => (
                <div
                  key={dateKey(week.start)}
                  className="flex flex-col"
                  style={{ rowGap: `${CELL_GAP}px` }}
                >
                  {week.days.map((day, dayIndex) =>
                    day ? (
                      <span
                        key={day.date}
                        title={day.description}
                        className="block rounded-[2px]"
                        style={{
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          backgroundColor: contributionColors[day.level],
                          boxShadow: contributionCellBorder,
                        }}
                      />
                    ) : (
                      <span
                        key={`${dateKey(week.start)}-${dayIndex}`}
                        className="block"
                        style={{ width: CELL_SIZE, height: CELL_SIZE }}
                      />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[12px] text-text-muted">
        <a
          href="https://docs.github.com/en/account-and-profile/concepts/contributions-on-your-profile"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent hover:underline"
        >
          Learn how we count contributions
        </a>

        <div className="flex items-center gap-1" aria-label="Contribution activity scale from less to more">
          <span className="mr-1">Less</span>
          {(Object.keys(contributionColors) as unknown as Array<keyof typeof contributionColors>).map(
            (level) => (
              <span
                key={level}
                className="block rounded-[2px]"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: contributionColors[level],
                  boxShadow: contributionCellBorder,
                }}
                aria-hidden="true"
              />
            ),
          )}
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  );
}
