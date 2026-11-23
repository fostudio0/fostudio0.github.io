"use client";

import { useEffect, useState } from "react";
import { LegalLayout, LEGAL_CHROME } from "@/components/LegalLayout";
import { useLocale } from "@/i18n/locale-context";
import { fetchLegalDocument, getFallbackLegalDocument, type LegalDocument } from "@/lib/legal";

type LegalDocumentViewProps = {
  slug: string;
};

export function LegalDocumentView({ slug }: LegalDocumentViewProps) {
  const { locale } = useLocale();
  const chrome = LEGAL_CHROME[locale];

  const [doc, setDoc] = useState<LegalDocument>(() => getFallbackLegalDocument(locale, slug));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const fallback = getFallbackLegalDocument(locale, slug);
    setDoc(fallback);
    setFailed(false);

    let cancelled = false;
    fetchLegalDocument(locale, slug)
      .then((next) => {
        if (!cancelled && next && next.html) {
          setDoc(next);
        }
      })
      .catch(() => {
        if (!cancelled && (!fallback || !fallback.html)) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale, slug]);

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
    <LegalLayout backHref="/legal-documents/" backLabel={chrome.backToMenu}>
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
          <button
            type="button"
            className="policy-retry"
            onClick={() => {
              setFailed(false);
              fetchLegalDocument(locale, slug)
                .then((next) => {
                  if (next && next.html) setDoc(next);
                })
                .catch(() => setFailed(true));
            }}
          >
            {locale === "tr" ? "Tekrar dene" : "Retry"}
          </button>
        </div>
      ) : (
        <div
          className="policy-document"
          dangerouslySetInnerHTML={{ __html: doc?.html ?? "" }}
        />
      )}
    </LegalLayout>
  );
}