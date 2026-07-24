import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";

// Self-hosted via next/font (spec §18.5). One sans for UI/body, one display face.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "AZMERYHOME | Houston Residential Real Estate Investment Company",
    template: "%s | AZMERYHOME",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Houston real estate investment company",
    "sell house Houston",
    "renovated homes for sale Houston",
    "Houston fix and flip",
    "Greater Houston real estate investor",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
  },
  // PLACEHOLDER: add Google Search Console / Bing verification after launch (spec §15).
  // verification: { google: "...", other: { "msvalidate.01": "..." } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
