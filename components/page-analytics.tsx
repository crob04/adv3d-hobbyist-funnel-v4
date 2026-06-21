"use client";

import { useScrollDepthTracking } from "@/lib/analytics";

export function PageAnalytics() {
  useScrollDepthTracking();

  return null;
}
