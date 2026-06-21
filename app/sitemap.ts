import type { MetadataRoute } from "next";

import { getCanonicalSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getCanonicalSiteUrl();

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
