import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWorkersBuild = process.env.WORKERS_CI === "1";
const databaseId = process.env.VISITOR_DB_ID?.trim();
const databaseName = process.env.VISITOR_DB_NAME?.trim();

if (Boolean(databaseId) !== Boolean(databaseName)) {
  throw new Error(
    "Set both VISITOR_DB_ID (Cloudflare build secret) and VISITOR_DB_NAME (Cloudflare build variable).",
  );
}

if (isWorkersBuild && !databaseId) {
  throw new Error(
    "Cloudflare Workers Builds requires VISITOR_DB_ID and VISITOR_DB_NAME to configure the visitor counter D1 binding.",
  );
}

let configPath = path.join(projectRoot, "wrangler.jsonc");

if (databaseId && databaseName) {
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      databaseId,
    );

  if (!isUuid) {
    throw new Error("VISITOR_DB_ID must be the UUID of the Cloudflare D1 database.");
  }

  const baseConfig = JSON.parse(await readFile(configPath, "utf8"));
  const d1Databases = Array.isArray(baseConfig.d1_databases)
    ? baseConfig.d1_databases.filter(({ binding }) => binding !== "VISITOR_DB")
    : [];

  d1Databases.push({
    binding: "VISITOR_DB",
    database_name: databaseName,
    database_id: databaseId,
  });

  const generatedConfigPath = path.join(projectRoot, "wrangler.build.jsonc");
  await writeFile(
    generatedConfigPath,
    `${JSON.stringify({ ...baseConfig, d1_databases: d1Databases }, null, 2)}\n`,
    { mode: 0o600 },
  );
  configPath = generatedConfigPath;

  if (isWorkersBuild) {
    // Wrangler reads this generated config during Cloudflare's separate deploy step.
    const deployConfigPath = path.join(projectRoot, ".wrangler", "deploy", "config.json");
    await mkdir(path.dirname(deployConfigPath), { recursive: true });
    await writeFile(
      deployConfigPath,
      `${JSON.stringify({ configPath: "../../wrangler.build.jsonc" })}\n`,
      { mode: 0o600 },
    );
  }
}

const openNextCli = path.join(
  projectRoot,
  "node_modules",
  "@opennextjs",
  "cloudflare",
  "dist",
  "cli",
  "index.js",
);
const result = spawnSync(process.execPath, [openNextCli, "build", "--config", configPath], {
  cwd: projectRoot,
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exitCode = result.status ?? 1;
