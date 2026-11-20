import type { Metadata } from "next";
import { AppDetailPage } from "@/components/AppDetailPage";
import { APP_PAGES, getAppPageBySlug } from "@/data/app-pages";
import { getLocalizedApp } from "@/lib/play-apps";
import { getScreenshots } from "@/lib/screenshots";

const SITE = "https://fostudio0.github.io";

export const dynamicParams = false;

export function generateStaticParams() {
  return APP_PAGES.filter((page) => getLocalizedApp(page.appId, "tr")).map((page) => ({
    slug: page.slug,
  }));
}

type AppPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAppPageBySlug(slug);
  const app = page ? getLocalizedApp(page.appId, "tr") : undefined;

  if (!page || !app) {
    return {};
  }

  const title = `${app.name} — FO Studio`;
  const description = page.copy.tr.short;
  const url = `${SITE}/apps/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      alternateLocale: "en_US",
      siteName: "FO Studio",
      title,
      description,
      url,
      images: [{ url: app.icon, alt: app.name }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [app.icon],
    },
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const page = getAppPageBySlug(slug);
  const app = page ? getLocalizedApp(page.appId, "tr") : undefined;

  if (!page || !app) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    description: page.copy.tr.short,
    operatingSystem: "Android",
    applicationCategory: page.copy.en.category,
    image: app.icon,
    url: `${SITE}/apps/${slug}/`,
    installUrl: app.href,
    offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    publisher: { "@id": `${SITE}/#organization` },
    ...(app.score && app.ratings
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: app.score.toFixed(1),
            ratingCount: app.ratings,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppDetailPage slug={slug} screenshots={getScreenshots(slug)} />
    </>
  );
}
