import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

console.log("[seed-landing-page] stub: mock-data mode, no database seeding performed.");
process.exit(0);
