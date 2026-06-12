import type { Locale } from "@/i18n/config";
import playAppsData from "@/data/play-apps.json";

export type AppItem = {
  name: string;
  description: string;
  href: string;
  icon: string;
  alt: string;
  score: number | null;
  scoreText: string | null;
  ratings: number | null;
  installs: string | null;
};

type LocaleAppData = {
  name: string;
  description: string;
  score: number | null;
  scoreText: string | null;
  ratings: number | null;
  installs: string | null;
};

export type PlayAppsCatalog = {
  fetchedAt: string;
  developerUrl: string;
  apps: Array<{
    appId: string;
    href: string;
    icon: string;
    alt: string;
    en: LocaleAppData;
    tr: LocaleAppData;
  }>;
};

const catalog = playAppsData as PlayAppsCatalog;

export function getDeveloperUrl(): string {
  return catalog.developerUrl;
}

export function getLocalizedApps(locale: Locale): AppItem[] {
  return catalog.apps.map((app) => ({
    name: app[locale].name,
    description: app[locale].description,
    href: app.href,
    icon: app.icon,
    alt: app[locale].name,
    score: app[locale].score,
    scoreText: app[locale].scoreText,
    ratings: app[locale].ratings,
    installs: app[locale].installs,
  }));
}

export function getAppCount(): number {
  return catalog.apps.length;
}
