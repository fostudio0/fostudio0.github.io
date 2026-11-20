"use client";

import { useEffect, type CSSProperties } from "react";
import { FsFooter, FsHeader } from "@/components/FoSite";
import { getAppPageByAppId } from "@/data/app-pages";
import { useLocale } from "@/i18n/locale-context";

export function HomePage() {
  const { locale, messages } = useLocale();
  const site = messages.site;
  const apps = messages.apps.items;

  useEffect(() => {
    document.title = messages.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", messages.meta.description);
  }, [messages.meta.description, messages.meta.title]);

  const categories = new Set(
    apps.map((app) => getAppPageByAppId(app.appId)?.copy[locale].category ?? app.appId),
  ).size;

  return (
    <div className="fs">
      <FsHeader />
      <main className="fs-wrap">
        <section className="fs-hero">
          <span className="fs-eyebrow">{site.eyebrow}</span>
          <h1>{site.title}</h1>
          <p>{site.subtitle}</p>
          <div className="fs-stats">
            <div>
              <b>{apps.length}</b>
              {site.appsStat}
            </div>
            <div>
              <b>{categories}</b>
              {site.categoriesStat}
            </div>
            <div>
              <b>100%</b>Google Play
            </div>
          </div>
        </section>

        <h2 id="apps" className="fs-section-title">
          {site.sectionTitle}
        </h2>
        <div className="fs-grid">
          {apps.map((app) => {
            const page = getAppPageByAppId(app.appId);
            const style = { "--fs-accent": page?.accent } as CSSProperties;
            return (
              <a
                key={app.appId}
                className="fs-card"
                href={app.slug ? `/apps/${app.slug}/` : app.href}
                target={app.slug ? undefined : "_blank"}
                rel={app.slug ? undefined : "noopener noreferrer"}
                style={style}
              >
                <div className="fs-card-top">
                  <img className="fs-icon" src={app.icon} alt="" width={60} height={60} />
                  <div>
                    {page ? <div className="fs-tag">{page.copy[locale].category}</div> : null}
                    <h3>{app.name}</h3>
                  </div>
                </div>
                <p>{app.description}</p>
                <span className="fs-more">
                  {app.slug ? messages.apps.detailsLabel : messages.apps.storeLabel} →
                </span>
              </a>
            );
          })}
        </div>
      </main>
      <FsFooter />
    </div>
  );
}
