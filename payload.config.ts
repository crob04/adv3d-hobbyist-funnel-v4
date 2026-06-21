import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";

import { Users } from "./collections/Users.ts";
import { LandingPageGlobal } from "./globals/LandingPage.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const useMockData = process.env.USE_MOCK_DATA === "true";

function requireEnv(name: string) {
  const value = process.env[name]?.trim();

  if (value) {
    return value;
  }

  if (useMockData) {
    if (name === "DATABASE_URL") {
      return "postgresql://mock:mock@127.0.0.1:5432/mock";
    }

    if (name === "PAYLOAD_SECRET") {
      return "mock-payload-secret";
    }
  }

  throw new Error(
    `${name} is required. Add it to .env.local before running Payload, or set USE_MOCK_DATA=true only for explicit mock-only development.`
  );
}

const payloadSecret = requireEnv("PAYLOAD_SECRET");
const databaseUrl = requireEnv("DATABASE_URL");

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: dirname
    }
  },
  secret: payloadSecret,
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl
    },
    push: true
  }),
  collections: [Users],
  globals: [LandingPageGlobal],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  }
});
