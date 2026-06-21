import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const frontendRoot = path.resolve(dirname, "..");

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const contents = fs.readFileSync(filePath, "utf8");

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(frontendRoot, ".env"));
loadEnvFile(path.join(frontendRoot, ".env.local"));

if (process.env.USE_MOCK_DATA === "true") {
  console.log("USE_MOCK_DATA=true, skipping Payload import-map generation.");
  process.exit(0);
}

const missing = ["DATABASE_URL", "PAYLOAD_SECRET"].filter((name) => !process.env[name]?.trim());

if (missing.length) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}. Add them to .env.local before running the app, or set USE_MOCK_DATA=true only for explicit mock-only development.`
  );
  process.exit(1);
}

execFileSync(process.execPath, ["./node_modules/payload/dist/bin/index.js", "generate:importmap"], {
  cwd: frontendRoot,
  stdio: "inherit",
  env: process.env
});
