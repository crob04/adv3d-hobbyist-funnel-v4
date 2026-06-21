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

async function seedLandingPage() {
  loadEnvFile(path.join(frontendRoot, ".env"));
  loadEnvFile(path.join(frontendRoot, ".env.local"));

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local before seeding.");
  }

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is not set. Add it to .env.local before seeding.");
  }

  const [{ default: config }, { getPayload }, { toPayloadLandingPageSeed }] = await Promise.all([
    import("../payload.config.ts"),
    import("payload"),
    import("../lib/payload-seed.ts")
  ]);

  const payload = await getPayload({ config });
  const seed = toPayloadLandingPageSeed();

  await payload.updateGlobal({
    slug: "landing-page",
    data: seed as never,
    depth: 0,
    overrideAccess: true
  });

  payload.logger.info("Seeded landing-page global from lib/mock-data.ts");
  await payload.destroy();
}

seedLandingPage().catch((error) => {
  console.error(error);
  process.exit(1);
});
