"use client";

import { useCallback, useEffect, useState } from "react";
import { LegalLayout, LEGAL_CHROME } from "@/components/LegalLayout";
import { DocumentShimmer } from "@/components/LegalShimmer";
import { useLocale } from "@/i18n/locale-context";
import { fetchLegalDocument, type LegalDocument } from "@/lib/legal";

type LegalDocumentViewProps = {
  slug: string;
};

export function LegalDocumentView({ slug }: LegalDocumentViewProps) {
  const { locale } = useLocale();
  const chrome = LEGAL_CHROME[locale];

  const [doc, setDoc] = useState<LegalDocument | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    setDoc(null);
    try {
      const next = await fetchLegalDocument(locale, slug);
      setDoc(next);
    } catch {
      setFailed(true);
    }
  }, [locale, slug]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (doc) {
      document.title = doc.title;
    }

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", chrome.description);
    }
  }, [chrome.description, doc]);

  return (
    <LegalLayout backHref="/yasal-belgeler/" backLabel={chrome.backToMenu}>
      <h1 className="policy-page-title">
        {doc?.title ?? chrome.fallbackTitle}
      </h1>

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
        <DocumentShimmer />
      )}
    </LegalLayout>
  );
}