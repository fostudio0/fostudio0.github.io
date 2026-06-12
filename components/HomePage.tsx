"use client";

import { useEffect } from "react";
import { AppsSection } from "@/components/AppsSection";
import { HeroSection, SiteHeader } from "@/components/HeroSection";
import { SiteFooter } from "@/components/SiteFooter";
import { useLocale } from "@/i18n/locale-context";

export function HomePage() {
  const { locale, messages } = useLocale();

  useEffect(() => {
    document.title = messages.meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", messages.meta.description);
    }
  }, [messages.meta.description, messages.meta.title]);

  return (
    <div className="page">
      <SiteHeader brand={messages.header.brand} />
      <main>
        <HeroSection hero={messages.hero} apps={messages.apps.items} />
        <AppsSection apps={messages.apps} locale={locale} />
      </main>
      <SiteFooter footer={messages.footer} />
    </div>
  );
}
