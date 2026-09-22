import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

const SITE = "https://fostudio0.github.io";

export const metadata: Metadata = {
  title: "FO Studio",
  description: "Independent studio designing and building Android applications.",
  keywords: [
    "FO Studio",
    "Android",
    "uygulama geliştirme",
    "QR kod",
    "zincir kırma",
    "spin coater",
    "mobil uygulama",
  ],
  alternates: {
    canonical: `${SITE}/`,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    siteName: "FO Studio",
    title: "FO Studio",
    description: "Independent studio designing and building Android applications.",
    url: `${SITE}/`,
    images: [
      {
        url: `${SITE}/og-banner.svg`,
        width: 1200,
        height: 630,
        alt: "FO Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FO Studio",
    description: "Independent studio designing and building Android applications.",
    images: [`${SITE}/og-banner.svg`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "FO Studio",
      url: `${SITE}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/icon.svg`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "FO Studio",
      publisher: {
        "@id": `${SITE}/#organization`,
      },
      inLanguage: "tr-TR",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}