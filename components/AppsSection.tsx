import type { AppItem } from "@/lib/play-apps";
import type { PageMessages } from "@/i18n/messages";

type AppStatsProps = {
  app: AppItem;
  reviewsLabel: string;
  downloadsLabel: string;
  numberLocale: string;
};

function formatCount(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

export function AppStats({
  app,
  reviewsLabel,
  downloadsLabel,
  numberLocale,
}: AppStatsProps) {
  const hasRating =
    app.scoreText != null && app.score != null && app.score > 0;
  const hasReviews = app.ratings != null && app.ratings > 0;
  const hasInstalls = app.installs != null && app.installs.length > 0;

  if (!hasRating && !hasReviews && !hasInstalls) {
    return null;
  }

  return (
    <div className="app-meta">
      {hasRating ? (
        <span className="app-meta-item app-meta-rating">
          <span className="app-meta-star" aria-hidden="true">
            ★
          </span>
          <span>{app.scoreText}</span>
        </span>
      ) : null}
      {hasReviews ? (
        <span className="app-meta-item">
          {formatCount(app.ratings ?? 0, numberLocale)} {reviewsLabel}
        </span>
      ) : null}
      {hasInstalls ? (
        <span className="app-meta-item">
          {app.installs} {downloadsLabel}
        </span>
      ) : null}
    </div>
  );
}

type AppsSectionProps = {
  apps: PageMessages["apps"];
  locale: "tr" | "en";
};

export function AppsSection({ apps, locale }: AppsSectionProps) {
  const numberLocale = locale === "tr" ? "tr-TR" : "en-US";

  return (
    <section id="apps" className="apps-section">
      <div className="page-shell">
        <div className="section-heading">
          <h2 className="section-title">{apps.title}</h2>
          <p className="section-subtitle">{apps.subtitle}</p>
        </div>

        <div className="apps-list">
          {apps.items.map((app) => (
            <a
              key={app.href}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="app-card"
            >
              <img src={app.icon} alt={app.alt} className="app-icon" />
              <div className="app-copy">
                <h3 className="app-name">{app.name}</h3>
                <AppStats
                  app={app}
                  reviewsLabel={apps.reviewsLabel}
                  downloadsLabel={apps.downloadsLabel}
                  numberLocale={numberLocale}
                />
                <p className="app-description">{app.description}</p>
              </div>
              <span className="app-action">{apps.storeLabel} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
