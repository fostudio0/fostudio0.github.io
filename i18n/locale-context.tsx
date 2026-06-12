"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getLocalizedApps } from "@/lib/play-apps";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getMessages, type PageMessages } from "@/i18n/messages";

const STORAGE_KEY = "fo-studio-locale";

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isLocale(stored)) {
    return stored;
  }

  const browserLang = navigator.language.toLowerCase().split("-")[0];
  return browserLang === "tr" ? "tr" : "en";
}

function buildPageMessages(locale: Locale): PageMessages {
  const base = getMessages(locale);
  const items = getLocalizedApps(locale);

  return {
    ...base,
    hero: {
      ...base.hero,
      stats: base.hero.stats.map((stat, index) =>
        index === 0 ? { ...stat, value: String(items.length) } : stat,
      ),
    },
    apps: {
      ...base.apps,
      items,
    },
  };
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: PageMessages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: ReactNode;
};

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocaleState(resolveInitialLocale());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages: buildPageMessages(locale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
