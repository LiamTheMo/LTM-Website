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

const ORIGIN = "http://127.0.0.1:3000";
const screenshots = "artifacts/browser-smoke";
const measurements = [];
const routes = ["/", "/projects", "/about", "/experience", "/contact", "/projects/this-website", "/projects/ltm-todo-app"];

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

    for (const route of routes) {
      const response = await page.goto(ORIGIN + route, { waitUntil: "networkidle", timeout: 30000 });
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
      await page.screenshot({
        path: `${screenshots}/${name}-${route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-/, "")}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }

    await page.goto(ORIGIN, { waitUntil: "networkidle" });
    const gallery = page.getByRole("region", { name: "Outside the Tech photo gallery" });
    await gallery.scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Show photo 2", exact: true }).click();
    await page.getByText("Photo 2 of 10").waitFor({ state: "visible", timeout: 10000 });
    const pageTwo = await page.getByRole("button", { name: "Show photo 2", exact: true }).boundingBox();
    assert.ok(pageTwo && pageTwo.height >= 44 && pageTwo.width >= 44, "Gallery tap target smaller than 44px");

    if (name === "mobile") {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();
      assert.equal(new URL(page.url()).pathname, "/projects", "Mobile navigation failed");
    }

    await page.goto(ORIGIN + "/contact", { waitUntil: "networkidle" });
    await page.getByLabel("What's this about?").selectOption("other");
    await page.getByRole("button", { name: "Prepare email draft" }).click();
    await page.getByRole("alert").waitFor({ state: "visible" });

    assert.deepEqual(errors, [], `${name} browser errors: ${errors.join("; ")}`);
    await context.close();
    console.log(`PASS ${name}: ${routes.length} routes, navigation/gallery/form smoke`);
  }
  await writeFile(`${screenshots}/timings.json`, JSON.stringify(measurements, null, 2) + "\\n");
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
