import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HeroAnimatedTitle } from "@/components/HeroAnimatedTitle";
import { HeroStatGrid } from "@/components/HeroStatGrid";
import { LogoMark } from "@/components/LogoMark";
import type { AppItem } from "@/lib/play-apps";
import type { Messages } from "@/i18n/messages";

type SiteHeaderProps = {
  brand?: string;
  wordmark?: string;
};

export function SiteHeader({ brand, wordmark }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="page-shell site-header-inner">
        {wordmark ? (
          <Link href="/" className="brand brand-text">
            {wordmark}
          </Link>
        ) : (
          <Link href="/" className="brand">
            <LogoMark className="brand-mark" title={brand} />
          </Link>
        )}
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export type HeroStat = {
  value: string;
  label: string;
};

type HeroSectionProps = {
  hero: Messages["hero"];
  stats: HeroStat[];
  apps: AppItem[];
};

export function HeroSection({ hero, stats, apps }: HeroSectionProps) {
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

        <div className="hero-panel">
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
            <HeroStatGrid stats={stats} />
          </div>
        </div>
      </div>
    </section>
  );
}
