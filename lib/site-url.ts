import { SITE_CONFIG } from "@/lib/site-config";

const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = SITE_CONFIG.productionSiteUrl;

function normalizeSiteUrl(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function isLocalHost(url: string) {
  const hostname = new URL(url).hostname;

  return hostname === "localhost" || hostname === "127.0.0.1";
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const normalizedConfiguredUrl = configuredUrl ? normalizeSiteUrl(configuredUrl) : null;
  const isProduction = process.env.VERCEL_ENV === "production";

  if (normalizedConfiguredUrl && (!isProduction || !isLocalHost(normalizedConfiguredUrl))) {
    return normalizedConfiguredUrl;
  }

  return isProduction ? PRODUCTION_SITE_URL : LOCAL_SITE_URL;
}

export function getCanonicalHost() {
  return new URL(PRODUCTION_SITE_URL).host;
}

export function getCanonicalSiteUrl() {
  return PRODUCTION_SITE_URL;
}
