/**
 * Chromium smoke tests for the actual Next.js server.
 * Usage: npm ci; npm install --no-save --package-lock=false playwright@1.56.1;
 * npx playwright install chromium; npm run build; npm run smoke:browser
 *
 * Screenshots are saved as workflow artifacts to support visual review.
 * No credentials or data are sent to the public site: this runs locally.
 */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const ORIGIN = "http://127.0.0.1:3000";
const screenshots = "artifacts/browser-smoke";
const measurements = [];
const accessibilityResults = [];
const accessibilityFailures = [];
const routes = [
  "/",
  "/projects",
  "/about",
  "/experience",
  "/contact",
  "/projects/this-website",
  "/projects/ltm-todo-app",
  "/projects/ltm-email-service",
  "/projects/hypixel-bazaar-tracker",
  "/projects/tiny-factory",
  "/projects/tank-blast",
  "/projects/echo-realms",
];

async function ready() {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      const response = await fetch(ORIGIN);
      if (response.ok) return;
    } catch { /* waiting for the local Next.js server */ }
    await wait(350);
  }
  throw Error("Next.js did not start on " + ORIGIN);
}

const server = spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
  stdio: "inherit",
  detached: process.platform !== "win32",
  env: { ...process.env, NODE_ENV: "production" },
});
let browser;

try {
  await ready();
  await mkdir(screenshots, { recursive: true });
  browser = await chromium.launch({ headless: true });
  for (const [name, viewport] of Object.entries({
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
  })) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    // These are editorially curated case studies, not an automatic ranking.
    // Their software engineering tags must remain visible across breakpoints.
    await page.goto(ORIGIN, { waitUntil: "domcontentloaded" });
    const featuredSection = page.locator('section[aria-labelledby="featured-work-heading"]');
    const featuredCards = featuredSection.locator("li");
    assert.equal(await featuredCards.count(), 3, `${name}: featured selection changed`);
    for (const [title, practice] of [
      ["This Website", "Fullstack Architecture"],
      ["LTM Todo App", "Offline-first Architecture"],
      ["LTM Email Service", "Authentication & Authorization"],
    ]) {
      const card = featuredCards.filter({ has: page.getByRole("heading", { name: title, exact: true }) });
      assert.equal(await card.count(), 1, `${name}: missing featured project ${title}`);
      assert.ok((await card.innerText()).includes(practice), `${name}: missing engineering tag ${practice}`);
    }

    for (const route of routes) {
      const response = await page.goto(ORIGIN + route, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.locator("h1").waitFor({ state: "visible", timeout: 15000 });
      assert.equal(response?.status(), 200, `${name} ${route} returned ${response?.status()}`);
      assert.equal(await page.locator("h1").count(), 1, `${name} ${route} does not have one h1`);
      const viewportOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > innerWidth + 2,
      );
      assert.equal(viewportOverflow, false, `${name} ${route} has horizontal document overflow`);
      measurements.push(await page.evaluate(({ device, route }) => {
        const nav = performance.getEntriesByType("navigation")[0];
        const fcp = performance.getEntriesByName("first-contentful-paint")[0];
        return {
          device,
          route,
          note: "local CI Chromium timing, not real-user Core Web Vitals",
          ttfbMs: nav ? Math.round(nav.responseStart - nav.requestStart) : null,
          dclMs: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : null,
          fcpMs: fcp ? Math.round(fcp.startTime) : null,
        };
      }, { device: name, route }));
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const findings = axe.violations.map(({ id, impact, description, nodes }) => ({
        id, impact, description, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
      }));
      accessibilityResults.push({ device: name, route, violations: findings });
      if (findings.length) accessibilityFailures.push({ device: name, route, findings });
      await page.screenshot({
        path: `${screenshots}/${name}-${route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-/, "")}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }

    await page.goto(ORIGIN, { waitUntil: "domcontentloaded" });
    const gallery = page.getByRole("region", { name: "Outside the Tech photo gallery" });
    await gallery.scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Show photo 2", exact: true }).click();
    await page.getByText("Photo 2 of 10").waitFor({ state: "visible", timeout: 10000 });
    const pageTwo = await page.getByRole("button", { name: "Show photo 2", exact: true }).boundingBox();
    assert.ok(pageTwo && pageTwo.height >= 44 && pageTwo.width >= 44, "Gallery tap target smaller than 44px");

    if (name === "mobile") {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();
      await page.waitForURL("**/projects", { timeout: 15000 });
      assert.equal(new URL(page.url()).pathname, "/projects", "Mobile navigation failed");
    }

    await page.goto(ORIGIN + "/contact", { waitUntil: "domcontentloaded" });
    await page.getByLabel("What's this about?").selectOption("other");
    await page.getByRole("button", { name: "Prepare email draft" }).click();
    await page.locator('form [role="alert"]').waitFor({ state: "visible" });

    assert.deepEqual(errors, [], `${name} browser errors: ${errors.join("; ")}`);
    await context.close();
    console.log(`PASS ${name}: ${routes.length} routes, navigation/gallery/form smoke`);
  }
  await writeFile(`${screenshots}/timings.json`, JSON.stringify(measurements, null, 2) + "\n");
  await writeFile(`${screenshots}/accessibility.json`, JSON.stringify(accessibilityResults, null, 2) + "\n");
  assert.equal(accessibilityFailures.length, 0, `WCAG violations: ${JSON.stringify(accessibilityFailures).slice(0, 12000)}`);
} finally {
  if (browser) await browser.close();
  if (server.pid) {
    if (process.platform === "win32") server.kill();
    else {
      try { process.kill(-server.pid, "SIGTERM"); }
      catch { server.kill(); }
    }
  }
}
