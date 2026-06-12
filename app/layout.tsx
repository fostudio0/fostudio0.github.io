import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fostudio0.github.io"),
  title: "FO Studio",
  description: "Independent studio designing and building Android applications.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#151515" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
