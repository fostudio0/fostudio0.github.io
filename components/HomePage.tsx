"use client";

import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import { AppsSection, AppStats } from "@/components/AppsSection";
import { HeroSection, type HeroStat, SiteHeader } from "@/components/HeroSection";
import { InteractiveAppPrototype } from "@/components/InteractiveAppPrototypes";
import { SiteFooter } from "@/components/SiteFooter";
import { getAppPageByAppId } from "@/data/app-pages";
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

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="app-detail-play-icon">
      <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.4-9.7L3.6 2.3zm10.5 10.8 2.6 2.7-11.6 6.6 9-9.3zm0-2.2-9-9.3 11.6 6.6-2.6 2.7zm3.9-2.1 3 1.7c.9.5.9 1.4 0 1.9l-3 1.7-2.9-2.6 2.9-2.7z" />
    </svg>
  );
}

export function HomePage() {
  const { locale, messages } = useLocale();
  const totals = getTotals();
  const apps = messages.apps.items;
  const numberLocale = locale === "tr" ? "tr-TR" : "en-US";

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
        <HeroSection hero={messages.hero} stats={stats} apps={apps} />

        {/* Single-Page In-Depth App Showcases with Interactive Prototypes */}
        <div className="home-showcases-container">
          {apps.map((app, index) => {
            const page = getAppPageByAppId(app.appId);
            if (!page || !app.slug) return null;
            const copy = page.copy[locale];
            const accentStyle = { "--app-accent": page.accent } as CSSProperties;
            const isEven = index % 2 === 1;

            return (
              <section
                key={app.appId}
                id={app.slug}
                className={`home-app-showcase ${isEven ? "home-app-showcase-alt" : ""}`}
                style={accentStyle}
              >
                <div className={`page-shell home-app-grid ${isEven ? "home-app-grid-reversed" : ""}`}>
                  {/* Left Column: Info, Features & Actions */}
                  <div className="home-app-info">
                    <span className="app-detail-category">{copy.category}</span>
                    <div className="home-app-title-row">
                      <img
                        src={app.icon}
                        alt={app.alt}
                        className="home-app-icon"
                        width={80}
                        height={80}
                      />
                      <div>
                        <h2 className="home-app-title">{app.name}</h2>
                        <p className="home-app-tagline">{copy.tagline}</p>
                      </div>
                    </div>

                    <AppStats
                      app={app}
                      reviewsLabel={messages.apps.reviewsLabel}
                      downloadsLabel={messages.apps.downloadsLabel}
                      numberLocale={numberLocale}
                    />

                    <p className="home-app-intro">{copy.intro}</p>

                    <div className="home-app-features-mini">
                      {copy.features.slice(0, 3).map((f) => (
                        <div key={f.title} className="home-app-feature-pill">
                          <span className="home-feature-emoji">{f.emoji}</span>
                          <div>
                            <strong>{f.title}</strong>
                            <span> — {f.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="home-app-cta-row">
                      <a
                        href={app.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-detail-download"
                      >
                        <PlayIcon />
                        {messages.appPage.download}
                      </a>
                      <Link href={`/apps/${app.slug}/`} className="home-app-more-link">
                        {messages.apps.detailsLabel} →
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Realistic Hardware Mockup with Live Interactive Prototype */}
                  <div className="home-app-proto-col">
                    <div className="device-showcase-stage">
                      <div className="device-ambient-glow" />
                      <InteractiveAppPrototype slug={app.slug} app={app} locale={locale} />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Overview App Grid */}
        <AppsSection apps={messages.apps} locale={locale} />
      </main>
      <SiteFooter footer={messages.footer} />
    </div>
  );
}
