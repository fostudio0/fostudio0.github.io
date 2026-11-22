"use client";

import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import { AppStats } from "@/components/AppsSection";
import { SiteHeader } from "@/components/HeroSection";
import { InteractiveAppPrototype } from "@/components/InteractiveAppPrototypes";
import { SiteFooter } from "@/components/SiteFooter";
import { getAppPageBySlug } from "@/data/app-pages";
import { useLocale } from "@/i18n/locale-context";
import type { Screenshot } from "@/lib/screenshots";

type AppDetailPageProps = {
  slug: string;
  screenshots: Screenshot[];
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="app-detail-play-icon">
      <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.4-9.7L3.6 2.3zm10.5 10.8 2.6 2.7-11.6 6.6 9-9.3zm0-2.2-9-9.3 11.6 6.6-2.6 2.7zm3.9-2.1 3 1.7c.9.5.9 1.4 0 1.9l-3 1.7-2.9-2.6 2.9-2.7z" />
    </svg>
  );
}

export function AppDetailPage({ slug, screenshots }: AppDetailPageProps) {
  const { locale, messages } = useLocale();
  const page = getAppPageBySlug(slug);
  const app = messages.apps.items.find((item) => item.slug === slug);
  const copy = page?.copy[locale];
  const strings = messages.appPage;
  const numberLocale = locale === "tr" ? "tr-TR" : "en-US";

  useEffect(() => {
    if (app && copy) {
      document.title = `${app.name} — FO Studio`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", copy.short);
    }
  }, [app, copy]);

  if (!page || !app || !copy) {
    return null;
  }

  const heroShot = screenshots.find((shot) => shot.height > shot.width);
  const otherApps = messages.apps.items.filter((item) => item.slug && item.slug !== slug);
  const accentStyle = { "--app-accent": page.accent } as CSSProperties;

  const downloadButton = (
    <a href={app.href} target="_blank" rel="noopener noreferrer" className="app-detail-download">
      <PlayIcon />
      {strings.download}
    </a>
  );

  return (
    <div className="page app-detail" style={accentStyle}>
      <SiteHeader brand={messages.header.brand} />
      <main>
        <section className="page-shell app-detail-hero">
          <div className="app-detail-hero-copy">
            <a href="/#apps" className="policy-back-link">
              ← {strings.backHome}
            </a>
            <img src={app.icon} alt={app.alt} className="app-detail-icon" width={96} height={96} />
            <span className="app-detail-category">{copy.category}</span>
            <h1 className="app-detail-title">{app.name}</h1>
            <AppStats
              app={app}
              reviewsLabel={messages.apps.reviewsLabel}
              downloadsLabel={messages.apps.downloadsLabel}
              numberLocale={numberLocale}
            />
            <p className="app-detail-tagline">{copy.tagline}</p>
            <p className="app-detail-intro">{copy.intro}</p>
            {downloadButton}
          </div>
          {heroShot ? (
            <img
              src={heroShot.src}
              alt={`${app.name} ${strings.screenshotAlt}`}
              width={heroShot.width}
              height={heroShot.height}
              className="app-detail-hero-shot"
            />
          ) : null}
        </section>

        {/* Live Interactive Prototype Showcase */}
        <section className="app-detail-prototype-section">
          <div className="page-shell">
            <div className="section-heading" style={{ marginBottom: "2rem" }}>
              <span className="app-detail-category" style={{ marginBottom: "0.5rem" }}>
                {locale === "tr" ? "Canlı Deneyim" : "Live Experience"}
              </span>
              <h2 className="section-title">
                {locale === "tr" ? "Uygulamayı Doğrudan Deneyin" : "Try the Interactive Prototype"}
              </h2>
              <p className="section-subtitle">
                {locale === "tr"
                  ? "Aşağıdaki interaktif prototip ile temel akışı hemen test edin, ardından Google Play'den indirin."
                  : "Test the core app workflow using the interactive prototype below, then download on Google Play."}
              </p>
            </div>

            <div className="app-detail-proto-wrapper">
              <InteractiveAppPrototype slug={slug} app={app} locale={locale} />
            </div>
          </div>
        </section>

        <section className="app-detail-band">
          <div className="page-shell">
            <h2 className="section-title app-detail-section-title">{strings.featuresTitle}</h2>
            <div className="app-detail-features">
              {copy.features.map((feature) => (
                <div key={feature.title} className="app-detail-feature">
                  <span className="app-detail-feature-icon" aria-hidden="true">
                    {feature.emoji}
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {screenshots.length > 0 ? (
          <section className="app-detail-section">
            <div className="page-shell">
              <h2 className="section-title app-detail-section-title">{strings.screenshotsTitle}</h2>
              <div className="app-detail-shots">
                {screenshots.map((shot, index) => (
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={`${app.name} ${strings.screenshotAlt} ${index + 1}`}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="app-detail-section">
          <div className="page-shell">
            <h2 className="section-title app-detail-section-title">{strings.audienceTitle}</h2>
            <div className="app-detail-audience">
              {copy.audience.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell">
          <div className="app-detail-cta">
            <h2>
              {app.name} {strings.ctaTitle}
            </h2>
            <p>{copy.closing}</p>
            {downloadButton}
            <p className="app-detail-cta-links">
              <Link href="/legal-documents/">{strings.legalDocuments}</Link>
              {page.website ? (
                <>
                  {" · "}
                  <a href={page.website} target="_blank" rel="noopener noreferrer">
                    {page.website.replace(/^https?:\/\//, "")}
                  </a>
                </>
              ) : null}
            </p>
          </div>

          <h2 className="section-title app-detail-section-title">{strings.otherAppsTitle}</h2>
          <div className="app-detail-others">
            {otherApps.map((item) => (
              <Link key={item.appId} href={`/apps/${item.slug}/`} className="app-detail-other">
                <img src={item.icon} alt="" width={44} height={44} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter footer={messages.footer} />
    </div>
  );
}
