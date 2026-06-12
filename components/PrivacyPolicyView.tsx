"use client";

import { useEffect } from "react";
import { PolicyDocument } from "@/components/PolicyDocument";
import { SiteHeader } from "@/components/HeroSection";
import { getPrivacyPolicyContent } from "@/i18n/privacy-policy";
import { useLocale } from "@/i18n/locale-context";
import { getMessages } from "@/i18n/messages";

export function PrivacyPolicyView() {
  const { locale } = useLocale();
  const content = getPrivacyPolicyContent(locale);
  const homeMessages = getMessages(locale);

  useEffect(() => {
    document.title = content.meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", content.meta.description);
    }
  }, [content.meta.description, content.meta.title]);

  return (
    <div className="page policy-page">
      <SiteHeader brand={homeMessages.header.brand} />
      <main className="policy-main page-shell">
        <div className="policy-toolbar">
          <a href="/" className="policy-back-link">
            ← {content.backHome}
          </a>
        </div>

        <h1 className="policy-page-title">{content.pageTitle}</h1>
        <PolicyDocument sections={content.sections} />
      </main>

      <footer className="policy-footer">
        <div className="page-shell policy-footer-inner">
          <a href="/privacy-policy/" className="footer-link">
            {content.pageTitle}
          </a>
        </div>
      </footer>
    </div>
  );
}
