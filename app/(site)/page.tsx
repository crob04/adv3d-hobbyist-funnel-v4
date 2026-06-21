import type { Metadata } from "next";
import { PageRenderer } from "@/components/page-renderer";
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  BUSINESS_PHONE_E164
} from "@/lib/business-contact";
import { getSiteUrl } from "@/lib/site-url";
import { SITE_CONFIG } from "@/lib/site-config";
import { getLandingPage } from "@/lib/payload";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const landingPage = await getLandingPage();
  const siteUrl = getSiteUrl();

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
      description: landingPage.seo.description,
      images: [`${siteUrl}/brand/advanced3d-logo.jpg`]
    }
  };
}

export default async function HomePage() {
  const landingPage = await getLandingPage();
  const siteUrl = getSiteUrl();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: siteUrl,
    logo: `${siteUrl}/brand/advanced3d-logo.jpg`,
    telephone: BUSINESS_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE_E164,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "en",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: BUSINESS_HOURS.dayOfWeek,
          opens: BUSINESS_HOURS.opens,
          closes: BUSINESS_HOURS.closes
        }
      }
    ],
    description: `${SITE_CONFIG.siteName} ${SITE_CONFIG.funnelName}`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <PageRenderer page={landingPage} />
    </>
  );
}
