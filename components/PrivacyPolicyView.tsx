"use client";

import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "@/components/HeroSection";
import { useLocale } from "@/i18n/locale-context";
import { getMessages } from "@/i18n/messages";
import { fetchLegalDocument, type LegalDocument } from "@/lib/legal";

const CHROME: Record<"tr" | "en", { backHome: string; description: string }> = {
  tr: {
    backHome: "Ana sayfaya dön",
    description: "FO Studio Gizlilik Politikası",
  },
  en: {
    backHome: "Back to home",
    description: "FO Studio Privacy Policy",
  },
};

function LegalLoading() {
  return (
    <div className="policy-document policy-legal-loading" aria-live="polite">
      <p>…</p>
    </div>
  );
}

export function PrivacyPolicyView() {
  const { locale } = useLocale();
  const homeMessages = getMessages(locale);
  const chrome = CHROME[locale];

  const [doc, setDoc] = useState<LegalDocument | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    try {
      const next = await fetchLegalDocument(locale);
      setDoc(next);
    } catch {
      setFailed(true);
    }
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!doc) {
      return;
    }
    document.title = doc.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", chrome.description);
    }
  }, [chrome.description, doc]);

  const title = doc?.title ?? (locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy");

  return (
    <div className="page policy-page">
      <SiteHeader brand={homeMessages.header.brand} />
      <main className="policy-main page-shell">
        <div className="policy-toolbar">
          <a href="/" className="policy-back-link">
            ← {chrome.backHome}
          </a>
        </div>

        <h1 className="policy-page-title">{title}</h1>

        {failed ? (
          <div className="policy-document policy-legal-error">
            <p>
              {locale === "tr"
                ? "Belge yüklenemedi. Lütfen tekrar deneyin."
                : "The document could not be loaded. Please try again."}
            </p>
            <button type="button" className="policy-retry" onClick={load}>
              {locale === "tr" ? "Tekrar dene" : "Retry"}
            </button>
          </div>
        ) : doc ? (
          <div
            className="policy-document"
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        ) : (
          <LegalLoading />
        )}
      </main>

      <footer className="policy-footer">
        <div className="page-shell policy-footer-inner">
          <a href="/privacy-policy/" className="footer-link">
            {title}
          </a>
        </div>
      </footer>
    </div>
  );
}