export type LegalDocument = {
  slug: string;
  type: string;
  lang: string;
  title: string;
  html: string;
  updatedAt: string | null;
};

export type LegalIndex = {
  packageName: string;
  lang: string;
  documents: Array<{
    slug: string;
    type: string;
    title: string;
  }>;
};

const LEGAL_ORIGIN = "https://jcqkznspriizdmsbjvvj.supabase.co";
const LEGAL_PACKAGE = "fostudio0.github.io";
export const LEGAL_SLUGS = [
  "privacy",
  "terms",
  "account-deletion",
  "cookies",
  "membership",
  "visitor",
  "commercial",
  "application",
];
const TTL_MS = 72 * 60 * 60 * 1000;
const CACHE_KEY = "fo-studio-legal-cache";

type CacheEntry = {
  fetchedAt: number;
  payload: unknown;
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

function getCached<T>(key: string): T | null {
  const cache = readCache();
  const entry = cache[key];
  if (entry && Date.now() - entry.fetchedAt < TTL_MS) {
    return entry.payload as T;
  }
  return null;
}

function setCached<T>(key: string, payload: T) {
  const cache = readCache();
  cache[key] = { fetchedAt: Date.now(), payload };
  writeCache(cache);
}

function cleanLegalHtml(html: string): string {
  const edgeLinkRe = new RegExp(
    `https?://[^"']*/functions/v1/legal/${LEGAL_PACKAGE}/([a-z0-9-]+)(?:\\?[^"']*)?`,
    "g",
  );
  return html
    .replace(edgeLinkRe, (_match, slug) => `/${slug}/`)
    .replace(/\{\{\s*[a-z_]+\s*\}\}/gi, "")
    .replace(/FO\s*Studio/gi, "")
    .replace(/<strong>\s*<\/strong>/gi, "")
    .replace(/(<(?:p|li|h[1-6]|blockquote)[^>]*>)\s*,/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Legal request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function fetchLegalIndex(lang: string): Promise<LegalIndex> {
  const cacheKey = `index:${lang}`;
  const cached = getCached<LegalIndex>(cacheKey);
  if (cached) {
    return cached;
  }

  const query = new URLSearchParams({ lang, format: "json" });
  const url = `${LEGAL_ORIGIN}/functions/v1/legal/${LEGAL_PACKAGE}?${query.toString()}`;

  const data = await fetchJson<{
    lang?: string;
    documents?: Array<{ slug: string; type: string; title: string }>;
  }>(url);

  const index: LegalIndex = {
    packageName: LEGAL_PACKAGE,
    lang: data.lang ?? lang,
    documents: data.documents ?? [],
  };

  setCached(cacheKey, index);
  return index;
}

export async function fetchLegalDocument(
  lang: string,
  slug: string,
): Promise<LegalDocument> {
  const cacheKey = `doc:${lang}:${slug}`;
  const cached = getCached<LegalDocument>(cacheKey);
  if (cached) {
    return cached;
  }

  const query = new URLSearchParams({ lang, format: "json" });
  const url = `${LEGAL_ORIGIN}/functions/v1/legal/${LEGAL_PACKAGE}/${slug}?${query.toString()}`;

  const data = await fetchJson<{
    slug?: string;
    type?: string;
    lang?: string;
    title?: string;
    html?: string;
    updated_at?: string | null;
  }>(url);

  const doc: LegalDocument = {
    slug: data.slug ?? slug,
    type: data.type ?? "",
    lang: data.lang ?? lang,
    title: data.title ?? "",
    html: cleanLegalHtml(data.html ?? ""),
    updatedAt: data.updated_at ?? null,
  };

  setCached(cacheKey, doc);
  return doc;
}