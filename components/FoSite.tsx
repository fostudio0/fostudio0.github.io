"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/i18n/locale-context";
import { getDeveloperUrl } from "@/lib/play-apps";

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.4-9.7L3.6 2.3zm10.5 10.8 2.6 2.7-11.6 6.6 9-9.3zm0-2.2-9-9.3 11.6 6.6-2.6 2.7zm3.9-2.1 3 1.7c.9.5.9 1.4 0 1.9l-3 1.7-2.9-2.6 2.9-2.7z" />
    </svg>
  );
}

export function FsHeader() {
  const { messages } = useLocale();
  return (
    <header className="fs-header">
      <div className="fs-wrap fs-nav">
        <a className="fs-logo" href="/">
          <span className="fs-mark">FO</span>FO Studio
        </a>
        <div className="fs-nav-right">
          <a
            className="fs-link fs-link-all"
            href={getDeveloperUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {messages.site.allOnPlay}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export function FsFooter() {
  const { messages } = useLocale();
  return (
    <footer className="fs-footer">
      <div className="fs-wrap">
        © {new Date().getFullYear()} FO Studio · {messages.site.footerPrefix}{" "}
        <a href={getDeveloperUrl()} target="_blank" rel="noopener noreferrer">
          Google Play
        </a>
        {messages.site.footerSuffix} ·{" "}
        <a href="/legal-documents/">{messages.footer.legalDocuments}</a>
      </div>
    </footer>
  );
}
