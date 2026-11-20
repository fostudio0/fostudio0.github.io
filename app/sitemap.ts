import type { MetadataRoute } from "next";
import { APP_PAGES } from "@/data/app-pages";
import { getLocalizedApp } from "@/lib/play-apps";

const SITE = "https://fostudio0.github.io";
const LAST = new Date("2026-11-20");

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

  const appEntries: MetadataRoute.Sitemap = APP_PAGES.filter((page) =>
    getLocalizedApp(page.appId, "tr"),
  ).map((page) => ({
    url: `${SITE}/apps/${page.slug}/`,
    lastModified: LAST,
    changeFrequency: "monthly",
    priority: 0.9,
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
    ...appEntries,
    ...documentEntries,
  ];
}