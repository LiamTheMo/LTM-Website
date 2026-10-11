import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { projects } from "../src/data/projects.ts";
import { profileContent } from "../src/data/profile.ts";
import { socialLinks } from "../src/data/social.ts";

const root = process.cwd();
const asset = (value) => path.join(root, "public", value.replace(/^\//, ""));

test("all project slugs are safe, unique, and featured content exists", () => {
  assert.ok(projects.length > 0);
  const slugs = projects.map(({ slug }) => slug);
  assert.equal(new Set(slugs).size, slugs.length);
  slugs.forEach((slug) => assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  assert.ok(projects.some((project) => project.featured));
});

test("published media files exist and have useful alternative text", () => {
  for (const project of projects) {
    if (project.cover.kind === "image") {
      assert.ok(existsSync(asset(project.cover.src)), `Missing cover for ${project.slug}: ${project.cover.src}`);
      assert.ok(project.cover.alt.trim().length >= 12, `Missing cover description for ${project.slug}`);
    }
    if (project.avatar) {
      assert.ok(existsSync(asset(project.avatar.src)), `Missing avatar for ${project.slug}`);
    }
    for (const image of project.images ?? []) {
      assert.ok(existsSync(asset(image.src)), `Missing gallery image for ${project.slug}: ${image.src}`);
      assert.ok(image.alt.trim().length >= 12);
    }
    for (const pair of project.beforeAfter ?? []) {
      for (const image of [pair.before, pair.after]) {
        assert.ok(existsSync(asset(image.src)), `Missing comparison image for ${project.slug}: ${image.src}`);
      }
    }
  }
  if (profileContent.image) assert.ok(existsSync(asset(profileContent.image.src)));
});

test("GitHub links use current repository owner and valid HTTPS URLs", () => {
  const links = [
    ...projects.flatMap((project) => [project.sourceUrl, project.externalLink?.href]),
    ...socialLinks.filter((link) => link.external).map((link) => link.href),
  ].filter(Boolean);
  for (const href of links) {
    const url = new URL(href);
    assert.equal(url.protocol, "https:", `Insecure external link: ${href}`);
    if (url.hostname === "github.com") {
      assert.equal(url.pathname.split("/")[1], "LiamTheMo", `Outdated GitHub owner: ${href}`);
    }
  }
  assert.ok(links.length >= 5);
});

test("primary social and project links are not duplicated", () => {
  assert.equal(new Set(socialLinks.map((link) => link.kind)).size, socialLinks.length);
  assert.ok(projects.every((project) => project.summary?.trim().length > 20));
});
