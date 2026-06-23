import { cache } from "react";

import { landingPage } from "./mock-data";
import type { LandingPage } from "./types";

const useMockData = process.env.USE_MOCK_DATA === "true";

export async function getLandingPage(): Promise<LandingPage> {
  if (useMockData) {
    return landingPage;
  }

  return landingPage;
}