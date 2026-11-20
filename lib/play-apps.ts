import type { Locale } from "@/i18n/config";
import playAppsData from "@/data/play-apps.json";
import { getAppPageByAppId } from "@/data/app-pages";

export type AppItem = {
  appId: string;
  slug: string | null;
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

export type PlayTotals = {
  apps: number;
  totalDownloads: number;
  totalRatings: number;
  avgScore: number | null;
};

export type PlayAppsCatalog = {
  fetchedAt: string;
  developerUrl: string;
  totals: PlayTotals;
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
  return catalog.apps.map((app) => {
    const page = getAppPageByAppId(app.appId);
    return {
      appId: app.appId,
      slug: page?.slug ?? null,
      name: app[locale].name,
      description: page?.copy[locale].short ?? app[locale].description,
      href: app.href,
      icon: app.icon,
      alt: app[locale].name,
      score: app[locale].score,
      scoreText: app[locale].scoreText,
      ratings: app[locale].ratings,
      installs: app[locale].installs,
    };
  });
}

export function getLocalizedApp(appId: string, locale: Locale): AppItem | undefined {
  return getLocalizedApps(locale).find((app) => app.appId === appId);
}

export function getAppCount(): number {
  return catalog.apps.length;
}

export function getTotals(): PlayTotals {
  return catalog.totals;
}
