import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { SITE_CONFIG } from "@/lib/site-config";
import "../globals.css";

const siteUrl = SITE_CONFIG.productionSiteUrl;

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Send a file. Hold the part this week. | Adv3D",
    template: "%s | Adv3D"
  },
  description:
    "Adv3D prints one-offs and short runs in FDM, resin, SLS, and TPU. Quote in 24 hours, production in 3 to 5 business days, no minimum order.",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Send a file. Hold the part this week. | Adv3D",
    description:
      "Adv3D prints one-offs and short runs in FDM, resin, SLS, and TPU. Quote in 24 hours, production in 3 to 5 business days.",
    url: siteUrl,
    siteName: "Adv3D",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Send a file. Hold the part this week. | Adv3D",
    description:
      "Adv3D prints one-offs and short runs in FDM, resin, SLS, and TPU. Quote in 24 hours, production in 3 to 5 business days."
  }
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-brand-bg font-body text-brand-text antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}