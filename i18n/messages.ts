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
    statsLabels: {
      apps: string;
      downloads: string;
      ratings: string;
      score: string;
    };
  };
  apps: {
    title: string;
    subtitle: string;
    storeLabel: string;
    detailsLabel: string;
    reviewsLabel: string;
    downloadsLabel: string;
  };
  appPage: {
    backHome: string;
    download: string;
    featuresTitle: string;
    screenshotsTitle: string;
    screenshotAlt: string;
    audienceTitle: string;
    ctaTitle: string;
    otherAppsTitle: string;
    legalDocuments: string;
  };
  footer: {
    legalDocuments: string;
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
      statsLabels: {
        apps: "Uygulama",
        downloads: "Toplam indirme",
        ratings: "Değerlendirme",
        score: "Ort. puan",
      },
    },
    apps: {
      title: "Uygulamalarımız",
      subtitle: "Google Play'de yayında olan projelerimiz.",
      storeLabel: "Google Play'de aç",
      detailsLabel: "Uygulamayı incele",
      reviewsLabel: "değerlendirme",
      downloadsLabel: "indirme",
    },
    appPage: {
      backHome: "Tüm uygulamalar",
      download: "Google Play'den indir",
      featuresTitle: "Neler yapabilirsiniz?",
      screenshotsTitle: "Ekran görüntüleri",
      screenshotAlt: "ekran görüntüsü",
      audienceTitle: "Kimler için?",
      ctaTitle: "şimdi Google Play'de",
      otherAppsTitle: "Diğer uygulamalarımız",
      legalDocuments: "Yasal Belgeler",
    },
    footer: {
      legalDocuments: "Yasal Belgeler",
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
      statsLabels: {
        apps: "Apps",
        downloads: "Total downloads",
        ratings: "Ratings",
        score: "Avg. rating",
      },
    },
    apps: {
      title: "Our apps",
      subtitle: "Projects currently live on Google Play.",
      storeLabel: "Open on Google Play",
      detailsLabel: "View app",
      reviewsLabel: "reviews",
      downloadsLabel: "downloads",
    },
    appPage: {
      backHome: "All apps",
      download: "Get it on Google Play",
      featuresTitle: "What you can do",
      screenshotsTitle: "Screenshots",
      screenshotAlt: "screenshot",
      audienceTitle: "Who it's for",
      ctaTitle: "is on Google Play now",
      otherAppsTitle: "More apps",
      legalDocuments: "Legal Documents",
    },
    footer: {
      legalDocuments: "Legal Documents",
      tagline: "Turning the experiences you imagine into reality.",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
