import type { Metadata } from "next";
import Script from "next/script";
import { Open_Sans, Oswald } from "next/font/google";

import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const siteUrl = getSiteUrl();
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const defaultDescription =
  "Advanc3D designs, engineers, and manufactures advanced O&P components — strong 3D sockets, lightweight flexible liners, and Nitro socket systems. Get a fabrication quote today.";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body"
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prosthetic & Orthotic Fabrication | Advanc3D",
    template: "%s | Advanc3D"
  },
  description: defaultDescription,
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Prosthetic & Orthotic Fabrication | Advanc3D",
    description: defaultDescription,
    url: siteUrl,
    siteName: "Advanc3D",
    type: "website",
    images: [
      {
        url: "/brand/advanced3d-logo.jpg",
        alt: "Advanc3D logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Prosthetic & Orthotic Fabrication | Advanc3D",
    description: defaultDescription,
    images: ["/brand/advanced3d-logo.jpg"]
  }
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${oswald.variable}`} suppressHydrationWarning>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
