import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import gplay from "google-play-scraper";

const DEV_ID = "6929581014777072329";
const DEVELOPER_URL =
  "https://play.google.com/store/apps/dev?id=6929581014777072329";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "data", "play-apps.json");

function stripHtml(value) {
  return (
    value
      ?.replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  );
}

function truncate(value, maxLength = 140) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
}

function mapLocaleApp(app, detail) {
  return {
    name: app.title,
    description: truncate(stripHtml(app.summary)),
    score: typeof detail.score === "number" ? detail.score : null,
    scoreText: detail.scoreText ?? null,
    ratings: typeof detail.ratings === "number" ? detail.ratings : null,
    installs: detail.installs ?? null,
  };
}

async function fetchDeveloperApps(lang, country) {
  const apps = await gplay.developer({
    devId: DEV_ID,
    lang,
    country,
    num: 50,
  });

  return new Map(apps.map((app) => [app.appId, app]));
}

async function fetchAppDetail(appId, lang, country) {
  return gplay.app({ appId, lang, country });
}

async function main() {
  const [enDeveloperApps, trDeveloperApps] = await Promise.all([
    fetchDeveloperApps("en", "us"),
    fetchDeveloperApps("tr", "tr"),
  ]);

  const appIds = [
    ...new Set([...enDeveloperApps.keys(), ...trDeveloperApps.keys()]),
  ];

  const apps = await Promise.all(
    appIds.map(async (appId) => {
      const enDeveloperApp = enDeveloperApps.get(appId);
      const trDeveloperApp = trDeveloperApps.get(appId);
      const primaryDeveloperApp = enDeveloperApp ?? trDeveloperApp;

      if (!primaryDeveloperApp) {
        throw new Error(`Missing developer listing for ${appId}`);
      }

      const [enDetail, trDetail] = await Promise.all([
        fetchAppDetail(appId, "en", "us"),
        fetchAppDetail(appId, "tr", "tr"),
      ]);

      const enSource = enDeveloperApp ?? trDeveloperApp;
      const trSource = trDeveloperApp ?? enDeveloperApp;

      return {
        appId,
        href: primaryDeveloperApp.url,
        icon: primaryDeveloperApp.icon,
        alt: primaryDeveloperApp.title,
        en: mapLocaleApp(enSource, enDetail),
        tr: mapLocaleApp(trSource, trDetail),
      };
    }),
  );

  const payload = {
    fetchedAt: new Date().toISOString(),
    developerUrl: DEVELOPER_URL,
    apps,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Saved ${apps.length} apps to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
