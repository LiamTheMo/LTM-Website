import assert from "node:assert/strict";
import test from "node:test";
import { parseContributionCalendar } from "../src/lib/github-contributions.ts";

test("reads table markup, tooltip text and an explicit annual total", () => {
  const html = `
    <h2>1,234 contributions in the last year</h2>
    <table><tr>
      <td id="day-a" data-date="2026-10-08" data-level="3"></td>
      <td id="day-b" data-date="2026-10-09" data-level="0"></td>
    </tr></table>
    <tool-tip for="day-a">4 contributions on Thursday, October 8, 2026</tool-tip>
    <tool-tip for="day-b">No contributions on Friday, October 9, 2026</tool-tip>
  `;
  const calendar = parseContributionCalendar(html);
  assert.equal(calendar.contributionCount, 1234);
  assert.deepEqual(calendar.contributionDays.map(({ date, count, level }) => ({ date, count, level })), [
    { date: "2026-10-08", count: 4, level: 3 },
    { date: "2026-10-09", count: 0, level: 0 },
  ]);
});

test("accepts SVG cells, single-quoted attributes and numeric data-count", () => {
  const html = "<svg><rect data-level='2' data-count='7' data-date='2026-10-10' aria-label='7 contributions on Saturday'/></svg>";
  const result = parseContributionCalendar(html);
  assert.equal(result.contributionDays.length, 1);
  assert.equal(result.contributionDays[0].count, 7);
  assert.equal(result.contributionCount, 7);
});

test("deduplicates dates and returns sorted days", () => {
  const html = `
    <td data-date="2026-10-11" data-level="0"></td>
    <rect id="better" data-date="2026-10-11" data-level="1"></rect>
    <tool-tip for="better">2 contributions on Sunday</tool-tip>
    <td data-date="2026-10-09" data-level="0" aria-label="No contributions on Friday"></td>
  `;
  const result = parseContributionCalendar(html);
  assert.equal(result.contributionDays.length, 2);
  assert.equal(result.contributionDays[0].date, "2026-10-09");
  assert.equal(result.contributionDays[1].count, 2);
  assert.equal(result.contributionCount, 2);
});

test("rejects unrelated or malformed calendar markup", () => {
  assert.deepEqual(parseContributionCalendar("<h1>GitHub has changed its format</h1>"), {
    contributionDays: [],
    contributionCount: null,
  });
  const html = '<rect data-date="not-a-date" data-level="3"/><td data-date="2026-10-11" data-level="9"></td>';
  assert.equal(parseContributionCalendar(html).contributionDays.length, 0);
});

test("does not invent unknown counts from heatmap colors", () => {
  const html = '<td data-date="2026-10-01" data-level="4"></td>';
  const result = parseContributionCalendar(html);
  assert.equal(result.contributionDays[0].count, null);
  assert.equal(result.contributionCount, null);
});
