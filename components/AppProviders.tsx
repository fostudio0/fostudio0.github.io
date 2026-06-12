"use client";

import { LocaleProvider } from "@/i18n/locale-context";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
