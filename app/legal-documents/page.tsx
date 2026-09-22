import type { Metadata } from "next";
import { LegalMenuView } from "@/components/LegalMenuView";

export const metadata: Metadata = {
  title: "Yasal Belgeler",
  description: "Yasal belgeler",
};

export default function LegalMenuPage() {
  return <LegalMenuView />;
}