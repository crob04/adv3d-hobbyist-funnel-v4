import type { Metadata } from "next";

import { PageRenderer } from "@/components/page-renderer";
import { getLandingPage } from "@/lib/payload";
import { SITE_CONFIG } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const landingPage = await getLandingPage();
  const siteUrl = SITE_CONFIG.productionSiteUrl;

  return {
    title: landingPage.seo.title,
    description: landingPage.seo.description,
    alternates: {
      canonical: siteUrl
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: landingPage.seo.ogTitle || landingPage.seo.title,
      description: landingPage.seo.ogDescription || landingPage.seo.description,
      url: siteUrl
    },
    twitter: {
      title: landingPage.seo.title,
      description: landingPage.seo.description
    }
  };
}

export default async function HomePage() {
  const landingPage = await getLandingPage();

  return <PageRenderer page={landingPage} />;
}