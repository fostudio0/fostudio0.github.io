import type { Locale } from "./config";
import type { AppItem } from "@/lib/play-apps";

export type Messages = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brand: string;
  };
  hero: {
    titles: string[];
    subtitle: string;
    cta: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  apps: {
    title: string;
    subtitle: string;
    storeLabel: string;
    reviewsLabel: string;
    downloadsLabel: string;
  };
  footer: {
    privacyPolicy: string;
    tagline: string;
  };
};

export type PageMessages = Messages & {
  apps: Messages["apps"] & {
    items: AppItem[];
  };
};

const messages: Record<Locale, Messages> = {
  tr: {
    meta: {
      title: "FO Studio — Mobil uygulama stüdyosu",
      description: "Android uygulamaları tasarlayan ve geliştiren bağımsız stüdyo.",
    },
    header: {
      brand: "FO Studio",
    },
    hero: {
      titles: [
        "Basit, güçlü ve\ninsana yakın uygulamalar.",
        "Hayal ettiğiniz deneyimleri\ngerçeğe dönüştürüyoruz.",
        "Wear OS'ten üretkenliğe,\nher gün için uygulamalar.",
        "Android'de güvenilir\nve özenli deneyimler.",
      ],
      subtitle:
        "FO Studio; Wear OS, üretkenlik ve günlük alışkanlıklar için Android deneyimleri geliştirir.",
      cta: "Uygulamaları keşfet",
      stats: [
        { value: "0", label: "Uygulama" },
        { value: "Android", label: "Platform" },
        { value: "FO", label: "Stüdyo" },
      ],
    },
    apps: {
      title: "Uygulamalarımız",
      subtitle: "Google Play'de yayında olan projelerimiz.",
      storeLabel: "Google Play'de aç",
      reviewsLabel: "değerlendirme",
      downloadsLabel: "indirme",
    },
    footer: {
      privacyPolicy: "Gizlilik Politikası",
      tagline: "Hayal ettiğiniz deneyimleri gerçeğe dönüştürüyoruz.",
    },
  },
  en: {
    meta: {
      title: "FO Studio — Mobile app studio",
      description: "Independent studio designing and building Android applications.",
    },
    header: {
      brand: "FO Studio",
    },
    hero: {
      titles: [
        "Simple, powerful,\nhuman-centered apps.",
        "Turning the experiences\nyou imagine into reality.",
        "From Wear OS to productivity,\napps for everyday life.",
        "Reliable, thoughtful\nAndroid experiences.",
      ],
      subtitle:
        "FO Studio builds Android experiences for Wear OS, productivity, and everyday habits.",
      cta: "Explore apps",
      stats: [
        { value: "0", label: "Apps" },
        { value: "Android", label: "Platform" },
        { value: "FO", label: "Studio" },
      ],
    },
    apps: {
      title: "Our apps",
      subtitle: "Projects currently live on Google Play.",
      storeLabel: "Open on Google Play",
      reviewsLabel: "reviews",
      downloadsLabel: "downloads",
    },
    footer: {
      privacyPolicy: "Privacy Policy",
      tagline: "Turning the experiences you imagine into reality.",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
