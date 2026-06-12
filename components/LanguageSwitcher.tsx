"use client";

import { locales } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <nav className="lang-switcher" aria-label="Language">
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          className={`lang-switcher-link${locale === item ? " active" : ""}`}
          aria-pressed={locale === item}
          onClick={() => setLocale(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
