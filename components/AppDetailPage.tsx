"use client";

import { useEffect, type CSSProperties } from "react";
import { FsFooter, FsHeader, PlayIcon } from "@/components/FoSite";
import { getAppPageBySlug } from "@/data/app-pages";
import { useLocale } from "@/i18n/locale-context";
import type { Screenshot } from "@/lib/screenshots";

type AppDetailPageProps = {
  slug: string;
  screenshots: Screenshot[];
};

export function AppDetailPage({ slug, screenshots }: AppDetailPageProps) {
  const { locale, messages } = useLocale();
  const page = getAppPageBySlug(slug);
  const app = messages.apps.items.find((item) => item.slug === slug);
  const copy = page?.copy[locale];
  const strings = messages.appPage;

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
  const accentStyle = { "--fs-accent": page.accent } as CSSProperties;

  const playButton = (
    <a
      className="fs-btn fs-btn-play fs-btn-lg"
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PlayIcon />
      {strings.download}
    </a>
  );

  return (
    <div className="fs" style={accentStyle}>
      <FsHeader />
      <main>
        <section className="fs-wrap fs-app-hero">
          <div>
            <a className="fs-back" href="/#apps">
              ← {strings.backHome}
            </a>
            <img className="fs-icon" src={app.icon} alt={app.alt} width={88} height={88} />
            <span className="fs-eyebrow">{copy.category}</span>
            <h1>{app.name}</h1>
            <p className="fs-tagline">{copy.tagline}</p>
            <p className="fs-intro">{copy.intro}</p>
            {playButton}
          </div>
          {heroShot ? (
            <img
              className="fs-hero-shot"
              src={heroShot.src}
              alt={`${app.name} ${strings.screenshotAlt}`}
              width={heroShot.width}
              height={heroShot.height}
            />
          ) : null}
        </section>

        <section className="fs-band">
          <div className="fs-wrap">
            <h2>{strings.featuresTitle}</h2>
            <div className="fs-features">
              {copy.features.map((feature) => (
                <div key={feature.title} className="fs-feature">
                  <div className="fs-dot" aria-hidden="true">
                    {feature.emoji}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {screenshots.length > 0 ? (
          <section className="fs-app-section">
            <div className="fs-wrap">
              <h2>{strings.screenshotsTitle}</h2>
              <div className="fs-shots">
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

        <section className="fs-app-section" style={{ paddingTop: 0 }}>
          <div className="fs-wrap">
            <h2>{strings.audienceTitle}</h2>
            <div className="fs-audience">
              {copy.audience.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="fs-wrap">
          <div className="fs-final-cta">
            <h2>
              {app.name} {strings.ctaTitle}
            </h2>
            <p>{copy.closing}</p>
            {playButton}
            <p className="fs-small">
              <a href="/legal-documents/">{strings.legalDocuments}</a>
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

          <h2 className="fs-section-title">{strings.otherAppsTitle}</h2>
          <div className="fs-other">
            {otherApps.map((item) => (
              <a key={item.appId} href={`/apps/${item.slug}/`}>
                <img src={item.icon} alt="" width={40} height={40} />
                {item.name}
              </a>
            ))}
          </div>
        </section>
      </main>
      <FsFooter />
    </div>
  );
}
