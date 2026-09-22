import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/LegalDocumentView";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Yasal belgeler",
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentView slug="privacy" />;
}