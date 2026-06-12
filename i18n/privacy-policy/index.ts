import type { Locale } from "@/i18n/config";
import { privacyPolicyEn } from "./en";
import { privacyPolicyTr } from "./tr";
import type { PolicyContent } from "./types";

export function getPrivacyPolicyContent(locale: Locale): PolicyContent {
  return locale === "tr" ? privacyPolicyTr : privacyPolicyEn;
}

export type { PolicyContent, PolicyBlock, PolicyListItem, PolicySection } from "./types";
