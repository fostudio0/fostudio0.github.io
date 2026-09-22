"use client";

import { useCallback, useEffect, useState } from "react";
import { LegalLayout, LEGAL_CHROME } from "@/components/LegalLayout";
import { DocumentShimmer } from "@/components/LegalShimmer";
import { useLocale } from "@/i18n/locale-context";
import { fetchLegalIndex, type LegalIndex } from "@/lib/legal";

export function LegalMenuView() {
  const { locale } = useLocale();
  const chrome = LEGAL_CHROME[locale];

  const [index, setIndex] = useState<LegalIndex | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    try {
      const next = await fetchLegalIndex(locale);
      setIndex(next);
    } catch {
      setFailed(true);
    }
  }, [locale]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    document.title = chrome.menuTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", chrome.description);
    }
  }, [chrome.description, chrome.menuTitle]);

  return (
    <LegalLayout backHref="/" backLabel={chrome.backHome}>
      <h1 className="policy-page-title">{chrome.menuTitle}</h1>

      {failed ? (
        <div className="policy-document policy-legal-error">
          <p>
            {locale === "tr"
              ? "Belgeler yüklenemedi. Lütfen tekrar deneyin."
              : "The documents could not be loaded. Please try again."}
          </p>
          <button type="button" className="policy-retry" onClick={load}>
            {locale === "tr" ? "Tekrar dene" : "Retry"}
          </button>
        </div>
      ) : index ? (
        <nav className="legal-menu" aria-label={chrome.menuTitle}>
          {index.documents.map((item) => (
            <a
              key={item.slug}
              href={`/privacy-policy/${item.slug}/`}
              className="legal-menu-item"
            >
              <span className="legal-menu-title">{item.title}</span>
              <span className="legal-menu-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
      ) : (
        <DocumentShimmer />
      )}
    </LegalLayout>
  );
}