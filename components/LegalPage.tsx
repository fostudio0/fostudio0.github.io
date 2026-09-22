"use client";

import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "@/components/HeroSection";
import { useLocale } from "@/i18n/locale-context";
import { getMessages } from "@/i18n/messages";
import {
  fetchLegalDocument,
  fetchLegalIndex,
  type LegalDocument,
  type LegalIndex,
} from "@/lib/legal";

const CHROME: Record<"tr" | "en", { menuTitle: string; backHome: string; description: string }> = {
  tr: {
    menuTitle: "Yasal Belgeler",
    backHome: "Ana sayfaya dön",
    description: "Yasal belgeler",
  },
  en: {
    menuTitle: "Legal Documents",
    backHome: "Back to home",
    description: "Legal documents",
  },
};

function ShimmerBlock({ height }: { height: number }) {
  return (
    <div
      className="legal-shimmer"
      style={{ height: `${height}px`, width: "100%" }}
    />
  );
}

function DocumentShimmer() {
  return (
    <div className="policy-document policy-document-loading" aria-live="polite">
      <ShimmerBlock height={32} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={24} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={16} />
    </div>
  );
}

function parseHashSlug(index: LegalIndex | null, hash: string): string | null {
  const raw = hash.replace(/^#/, "").trim().toLowerCase();
  if (!raw || !index) {
    return null;
  }
  const known = index.documents.some((doc) => doc.slug === raw);
  return known ? raw : null;
}

export function LegalPage() {
  const { locale } = useLocale();
  const homeMessages = getMessages(locale);
  const chrome = CHROME[locale];

  const [index, setIndex] = useState<LegalIndex | null>(null);
  const [indexFailed, setIndexFailed] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const [doc, setDoc] = useState<LegalDocument | null>(null);
  const [docFailed, setDocFailed] = useState(false);

  const loadIndex = useCallback(async () => {
    setIndexFailed(false);
    try {
      const next = await fetchLegalIndex(locale);
      setIndex(next);
    } catch {
      setIndexFailed(true);
    }
  }, [locale]);

  const loadDocument = useCallback(
    async (slug: string) => {
      setDocFailed(false);
      setDoc(null);
      try {
        const next = await fetchLegalDocument(locale, slug);
        setDoc(next);
      } catch {
        setDocFailed(true);
      }
    },
    [locale],
  );

  useEffect(() => {
    loadIndex();
  }, [loadIndex]);

  useEffect(() => {
    const syncFromHash = () => {
      setActiveSlug(parseHashSlug(index, window.location.hash));
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [index]);

  useEffect(() => {
    if (activeSlug) {
      loadDocument(activeSlug);
    } else {
      setDoc(null);
      setDocFailed(false);
    }
  }, [activeSlug, loadDocument]);

  const activeDoc = index?.documents.find((item) => item.slug === activeSlug) ?? null;

  useEffect(() => {
    document.title = activeSlug && activeDoc ? activeDoc.title : chrome.menuTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", chrome.description);
    }
  }, [activeDoc, activeSlug, chrome.description, chrome.menuTitle]);

  const selectSlug = (slug: string) => {
    window.location.hash = slug;
  };

  const backToMenu = () => {
    window.location.hash = "";
    setActiveSlug(null);
  };

  return (
    <div className="page policy-page">
      <SiteHeader brand={homeMessages.header.brand} />
      <main className="policy-main page-shell">
        <div className="policy-toolbar">
          <a
            href={activeSlug ? "/privacy-policy/" : "/"}
            className="policy-back-link"
            onClick={(event) => {
              if (activeSlug) {
                event.preventDefault();
                backToMenu();
              }
            }}
          >
            ← {activeSlug ? chrome.backHome : chrome.menuTitle}
          </a>
        </div>

        {activeSlug ? (
          <>
            {docFailed ? (
              <div className="policy-document policy-legal-error">
                <p>
                  {locale === "tr"
                    ? "Belge yüklenemedi. Lütfen tekrar deneyin."
                    : "The document could not be loaded. Please try again."}
                </p>
                <button
                  type="button"
                  className="policy-retry"
                  onClick={() => activeSlug && loadDocument(activeSlug)}
                >
                  {locale === "tr" ? "Tekrar dene" : "Retry"}
                </button>
              </div>
            ) : doc ? (
              <>
                <h1 className="policy-page-title">{doc.title}</h1>
                <div
                  className="policy-document"
                  dangerouslySetInnerHTML={{ __html: doc.html }}
                />
              </>
            ) : (
              <>
                <h1 className="policy-page-title">
                  {activeDoc?.title ?? (locale === "tr" ? "Belge" : "Document")}
                </h1>
                <DocumentShimmer />
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="policy-page-title">{chrome.menuTitle}</h1>

            {indexFailed ? (
              <div className="policy-document policy-legal-error">
                <p>
                  {locale === "tr"
                    ? "Belgeler yüklenemedi. Lütfen tekrar deneyin."
                    : "The documents could not be loaded. Please try again."}
                </p>
                <button type="button" className="policy-retry" onClick={loadIndex}>
                  {locale === "tr" ? "Tekrar dene" : "Retry"}
                </button>
              </div>
            ) : index ? (
              <nav className="legal-menu" aria-label={chrome.menuTitle}>
                {index.documents.map((item) => (
                  <a
                    key={item.slug}
                    href={`#${item.slug}`}
                    className="legal-menu-item"
                    onClick={() => selectSlug(item.slug)}
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
          </>
        )}
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