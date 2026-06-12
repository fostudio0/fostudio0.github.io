import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HeroAnimatedTitle } from "@/components/HeroAnimatedTitle";
import { LogoMark } from "@/components/LogoMark";
import type { AppItem } from "@/lib/play-apps";
import type { Messages } from "@/i18n/messages";

type SiteHeaderProps = {
  brand: string;
};

export function SiteHeader({ brand }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="page-shell site-header-inner">
        <a href="/" className="brand">
          <LogoMark className="brand-mark" title={brand} />
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

type HeroSectionProps = {
  hero: Messages["hero"];
  apps: AppItem[];
};

export function HeroSection({ hero, apps }: HeroSectionProps) {
  const showcaseApps = apps.slice(0, 5);

  return (
    <section className="hero">
      <div className="page-shell hero-grid">
        <div className="hero-copy">
          <HeroAnimatedTitle titles={hero.titles} />
          <p className="hero-subtitle">{hero.subtitle}</p>
          <a href="#apps" className="hero-cta">
            {hero.cta}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-panel" aria-hidden="true">
          <div className="hero-panel-card">
            <div className="hero-showcase">
              <LogoMark className="hero-showcase-logo" decorative />
              <div className="hero-app-icons">
                {showcaseApps.map((app) => (
                  <div key={app.href} className="hero-app-icon">
                    <img src={app.icon} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-stat-grid">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
