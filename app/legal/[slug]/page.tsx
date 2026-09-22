import { LegalDocumentView } from "@/components/LegalDocumentView";
import { LEGAL_SLUGS } from "@/lib/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

type LegalDocumentPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegalDocumentPage({
  params,
}: LegalDocumentPageProps) {
  const { slug } = await params;
  return <LegalDocumentView slug={slug} />;
}