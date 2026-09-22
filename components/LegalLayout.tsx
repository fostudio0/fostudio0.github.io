"use client";

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/HeroSection";
import { useLocale } from "@/i18n/locale-context";
import { getMessages } from "@/i18n/messages";

export const LEGAL_CHROME: Record<
  "tr" | "en",
  {
    menuTitle: string;
    backHome: string;
    backToMenu: string;
    fallbackTitle: string;
    description: string;
  }
> = {
  tr: {
    menuTitle: "Yasal Belgeler",
    backHome: "Ana sayfaya dön",
    backToMenu: "Yasal Belgeler'e dön",
    fallbackTitle: "Belge",
    description: "Yasal belgeler",
  },
  en: {
    menuTitle: "Legal Documents",
    backHome: "Back to home",
    backToMenu: "Back to legal documents",
    fallbackTitle: "Document",
    description: "Legal documents",
  },
};

type LegalLayoutProps = {
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

export function LegalLayout({ backHref, backLabel, children }: LegalLayoutProps) {
  const { locale } = useLocale();
  const homeMessages = getMessages(locale);
  const chrome = LEGAL_CHROME[locale];

  return (
    <div className="page policy-page">
      <SiteHeader brand={homeMessages.header.brand} />
      <main className="policy-main page-shell">
        <div className="policy-toolbar">
          <a href={backHref} className="policy-back-link">
            ← {backLabel}
          </a>
        </div>
        {children}
      </main>

      <footer className="policy-footer">
        <div className="page-shell policy-footer-inner">
          <a href="/privacy-policy/" className="footer-link">
            {chrome.menuTitle}
          </a>
        </div>
      </footer>
    </div>
  );
}