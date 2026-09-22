import type { MetadataRoute } from "next";

const SITE = "https://fostudio0.github.io";
const LAST = new Date("2026-09-22");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const documents = [
    "privacy-policy",
    "terms",
    "account-deletion",
    "cookies",
    "membership",
    "visitor",
    "commercial",
    "application",
  ];

  const documentEntries: MetadataRoute.Sitemap = documents.map((slug) => ({
    url: `${SITE}/${slug}/`,
    lastModified: LAST,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: `${SITE}/`,
      lastModified: LAST,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/legal-documents/`,
      lastModified: LAST,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...documentEntries,
  ];
}