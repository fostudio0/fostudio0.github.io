"use client";

import { useEffect } from "react";
import { AppsSection } from "@/components/AppsSection";
import { HeroSection, type HeroStat, SiteHeader } from "@/components/HeroSection";
import { SiteFooter } from "@/components/SiteFooter";
import { useLocale } from "@/i18n/locale-context";
import type { PageMessages } from "@/i18n/messages";
import { getTotals } from "@/lib/play-apps";

function formatNumber(value: number, locale: string, fractionDigits = 0) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

function buildHeroStats(
  labels: PageMessages["hero"]["statsLabels"],
  totals: ReturnType<typeof getTotals>,
  locale: string,
): HeroStat[] {
  const stats: HeroStat[] = [
    { value: formatNumber(totals.apps, locale), label: labels.apps },
    {
      value: `${formatNumber(totals.totalDownloads, locale)}+`,
      label: labels.downloads,
    },
    {
      value: formatNumber(totals.totalRatings, locale),
      label: labels.ratings,
    },
  ];

  if (totals.avgScore != null) {
    stats.push({
      value: formatNumber(totals.avgScore, locale, 1),
      label: labels.score,
    });
  }

  return stats;
}

export function HomePage() {
  const { locale, messages } = useLocale();
  const totals = getTotals();

  useEffect(() => {
    document.title = messages.meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", messages.meta.description);
    }
  }, [messages.meta.description, messages.meta.title]);

  const stats = buildHeroStats(messages.hero.statsLabels, totals, locale);

  return (
    <div className="page">
      <SiteHeader brand={messages.header.brand} />
      <main>
        <HeroSection hero={messages.hero} stats={stats} apps={messages.apps.items} />
        <AppsSection apps={messages.apps} locale={locale} />
      </main>
      <SiteFooter footer={messages.footer} />
    </div>
  );
}