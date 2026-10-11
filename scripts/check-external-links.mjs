/**
 * Opt-in external link checker. Does not need credentials, and never sends
 * user data. CI tests internal file/routes separately to avoid network flakiness.
 */
import { projects } from "../src/data/projects.ts";
import { socialLinks } from "../src/data/social.ts";

const urls = [...new Set([
  ...projects.flatMap((item) => [item.sourceUrl, item.externalLink?.href]),
  ...socialLinks.filter((item) => item.external).map((item) => item.href),
].filter(Boolean))];

let broken = 0;
let unverified = 0;
for (const url of urls) {
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
    if (response.status === 405) {
      response = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(8000) });
      await response.body?.cancel();
    }
    if (response.status === 404 || response.status === 410) {
      console.error(`BROKEN ${response.status} ${url}`);
      broken++;
    } else if (!response.ok) {
      console.warn(`UNVERIFIED ${response.status} ${url}`);
      unverified++;
    } else {
      console.log(`OK ${response.status} ${url}`);
    }
  } catch (error) {
    console.warn(`UNVERIFIED ${url}: ${error instanceof Error ? error.message : String(error)}`);
    unverified++;
  }
}
console.log(`Checked ${urls.length} links; ${broken} broken; ${unverified} unverified (network restrictions may apply)`);
if (broken) process.exitCode = 1;
