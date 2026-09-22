import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { LEGAL_SLUGS } from "@/lib/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

const SLUG_TITLES: Record<string, string> = {
  privacy: "Gizlilik Politikası",
  terms: "Kullanım Koşulları",
  "account-deletion": "Hesap Silme",
  cookies: "Çerez Politikası",
  membership: "Üyelik Aydınlatma Metni",
  visitor: "Ziyaretçi Aydınlatma Metni",
  commercial: "Ticari İleti Aydınlatma Metni",
  application: "İlgili Kişi Başvuru Formu",
};

type LegalDocumentPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: LegalDocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: SLUG_TITLES[slug] ?? "Yasal Belgeler",
    description: "Yasal belgeler",
    alternates: {
      canonical: `/${slug}/`,
    },
  };
}

export default async function LegalDocumentPage({
  params,
}: LegalDocumentPageProps) {
  const { slug } = await params;
  return <LegalDocumentView slug={slug} />;
}