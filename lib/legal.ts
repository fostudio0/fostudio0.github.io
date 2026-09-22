export type LegalDocument = {
  slug: string;
  type: string;
  lang: string;
  title: string;
  html: string;
  updatedAt: string | null;
};

const LEGAL_ORIGIN = "https://jcqkznspriizdmsbjvvj.supabase.co";
const LEGAL_PACKAGE = "fostudio0.github.io";
const LEGAL_APP_NAME = "FO Studio";
const LEGAL_SLUG = "privacy";
const TTL_MS = 72 * 60 * 60 * 1000;
const CACHE_KEY = "fo-studio-legal-cache";

type CacheEntry = {
  fetchedAt: number;
  doc: LegalDocument;
};

function readCache(): Record<string, CacheEntry> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CacheEntry>) : {};
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, CacheEntry>) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    return;
  }
}

export async function fetchLegalDocument(lang: string): Promise<LegalDocument> {
  const cache = readCache();
  const cached = cache[lang];

  if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
    return cached.doc;
  }

  const query = new URLSearchParams({
    lang,
    app_name: LEGAL_APP_NAME,
    format: "json",
  });
  const url = `${LEGAL_ORIGIN}/functions/v1/legal/${LEGAL_PACKAGE}/${LEGAL_SLUG}?${query.toString()}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    if (cached) {
      return cached.doc;
    }
    throw new Error(`Legal document fetch failed (${res.status})`);
  }

  const data = (await res.json()) as {
    slug?: string;
    type?: string;
    lang?: string;
    title?: string;
    html?: string;
    updated_at?: string | null;
  };

  const doc: LegalDocument = {
    slug: data.slug ?? LEGAL_SLUG,
    type: data.type ?? "PRIVACY_POLICY",
    lang: data.lang ?? lang,
    title: data.title ?? "",
    html: data.html ?? "",
    updatedAt: data.updated_at ?? null,
  };

  cache[lang] = { fetchedAt: Date.now(), doc };
  writeCache(cache);
  return doc;
}