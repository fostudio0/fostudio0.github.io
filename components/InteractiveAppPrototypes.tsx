"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { AppItem } from "@/lib/play-apps";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="proto-play-icon">
      <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.4-9.7L3.6 2.3zm10.5 10.8 2.6 2.7-11.6 6.6 9-9.3zm0-2.2-9-9.3 11.6 6.6-2.6 2.7zm3.9-2.1 3 1.7c.9.5.9 1.4 0 1.9l-3 1.7-2.9-2.6 2.9-2.7z" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
      <rect x="0" y="8" width="2.5" height="3" rx="0.6" />
      <rect x="4" y="5.5" width="2.5" height="5.5" rx="0.6" />
      <rect x="8" y="3" width="2.5" height="8" rx="0.6" />
      <rect x="12" y="0" width="2.5" height="11" rx="0.6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
      <path d="M7.5 3.3C9.7 3.3 11.7 4.1 13.2 5.5L14.2 4.4C12.4 2.8 10.1 1.9 7.5 1.9C4.9 1.9 2.6 2.8 0.8 4.4L1.8 5.5C3.3 4.1 5.3 3.3 7.5 3.3ZM7.5 6.5C8.8 6.5 10 7 10.9 7.9L12 6.8C10.8 5.6 9.2 4.9 7.5 4.9C5.8 4.9 4.2 5.6 3 6.8L4.1 7.9C5 7 6.2 6.5 7.5 6.5ZM7.5 9.7C8.1 9.7 8.5 10.1 8.5 10.7C8.5 11.3 8.1 11.7 7.5 11.7C6.9 11.7 6.5 11.3 6.5 10.7C6.5 10.1 6.9 9.7 7.5 9.7Z" />
    </svg>
  );
}

type PrototypeProps = {
  app: AppItem;
  locale: Locale;
};

// -------------------------------------------------------------
// PHONE WRAPPER COMPONENT
// -------------------------------------------------------------
function PhoneFrame({
  children,
  appName,
  screenClass = "",
}: {
  children: React.ReactNode;
  appName: string;
  screenClass?: string;
}) {
  return (
    <div className="device-phone-outer">
      {/* Physical Hardware Buttons */}
      <div className="device-btn-action" title="Action Button" />
      <div className="device-btn-volume-up" title="Volume Up" />
      <div className="device-btn-volume-down" title="Volume Down" />
      <div className="device-btn-power" title="Power" />

      {/* Main Titanium Chassis */}
      <div className="device-phone-chassis">
        {/* Screen Glass Glare */}
        <div className="device-glass-glare" />

        {/* Display */}
        <div className={`device-display ${screenClass}`}>
          {/* Dynamic Island */}
          <div className="device-dynamic-island">
            <div className="device-island-pill">
              <span className="device-camera-lens" />
              <span className="device-sensor-dot" />
            </div>
          </div>

          {/* Top Status Bar */}
          <div className="device-status-bar">
            <span className="device-time">09:41</span>
            <span className="device-app-title-chip">{appName}</span>
            <div className="device-status-icons">
              <SignalIcon />
              <WifiIcon />
              <div className="device-battery">
                <div className="device-battery-fill" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="device-screen-content">{children}</div>

          {/* Bottom Home Indicator */}
          <div className="device-home-indicator-area">
            <div className="device-home-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 1. AGROPULSE PROTOTYPE (Farm / Satellite / Crop Health)
// -------------------------------------------------------------
export function AgroPulsePrototype({ app, locale }: PrototypeProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const isTr = locale === "tr";

  return (
    <PhoneFrame appName="AgroPulse" screenClass="screen-agro">
      <div className="proto-body">
        {step === 0 && (
          <div className="proto-step-fade">
            <div className="proto-header-chip">
              <span className="proto-indicator proto-pulse" />
              {isTr ? "GPS Konumu: Çumra / Konya" : "GPS Location: Çumra / Konya"}
            </div>

            <div className="proto-field-box">
              <div className="proto-field-map">
                <div className="proto-field-polygon">
                  <span className="proto-polygon-label">
                    {isTr ? "Tarla #1 • 24.5 Dekar" : "Field #1 • 24.5 Decares"}
                  </span>
                </div>
              </div>
              <div className="proto-field-tags">
                <span>🌾 {isTr ? "Buğday" : "Wheat"}</span>
                <span>🌤️ 22°C</span>
                <span>💧 {isTr ? "Nem: %38" : "Moisture: 38%"}</span>
              </div>
            </div>

            <p className="proto-hint">
              {isTr
                ? "Uydudan bitki sağlığı (NDVI) ve toprak nemini anlık analiz etmek için dokunun:"
                : "Tap to analyze real-time crop health (NDVI) and soil moisture from satellite:"}
            </p>

            <button
              type="button"
              className="proto-action-btn proto-btn-green"
              onClick={() => setStep(1)}
            >
              🛰️ {isTr ? "Canlı Uydu Analizini Başlat" : "Start Live Satellite Scan"}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="proto-step-fade">
            <div className="proto-scanning-card">
              <div className="proto-radar-anim">
                <div className="proto-radar-sweep" />
                <span className="proto-radar-icon">🛰️</span>
              </div>
              <h4>{isTr ? "Uydu Verisi İşleniyor..." : "Processing Satellite Data..."}</h4>
              <p className="proto-subtext">
                {isTr
                  ? "Sentinel-2 & NASA POWER vejetasyon katmanları analiz ediliyor"
                  : "Analyzing Sentinel-2 & NASA POWER vegetation indices"}
              </p>
              <div className="proto-progress-bar">
                <div className="proto-progress-fill proto-progress-agro" />
              </div>
            </div>

            <button
              type="button"
              className="proto-action-btn proto-btn-green"
              style={{ marginTop: "1.2rem" }}
              onClick={() => setStep(2)}
            >
              {isTr ? "Sonuçları Göster →" : "View Results →"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="proto-step-fade">
            <div className="proto-result-card">
              <div className="proto-badge-row">
                <span className="proto-badge proto-badge-green">
                  🟢 {isTr ? "%91 Sağlıklı • Optimum" : "91% Healthy • Optimum"}
                </span>
                <span className="proto-badge proto-badge-blue">
                  💧 {isTr ? "Toprak Nemi: %44" : "Soil Moisture: 44%"}
                </span>
              </div>

              <div className="proto-ai-box">
                <div className="proto-ai-title">
                  🤖 {isTr ? "AgroPulse Yapay Zeka Tavsiyesi" : "AgroPulse AI Advisor"}
                </div>
                <p>
                  {isTr
                    ? "“Bitki gelişim hızı son 7 günde %14 arttı. Önümüzdeki 48 saatte yağış beklenmiyor. Cuma sabahı 12 mm damlama sulama önerilir.”"
                    : "“Crop growth rate increased by 14% over the last 7 days. No rainfall expected in 48 hours. 12 mm drip irrigation is recommended on Friday morning.”"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="proto-action-btn proto-btn-green"
              onClick={() => setStep(3)}
            >
              {isTr ? "Sulama Planını Onayla ✓" : "Confirm Irrigation Plan ✓"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="proto-step-fade proto-success-pane">
            <div className="proto-success-icon">🌱</div>
            <h4>{isTr ? "Tarlanız Cebinizde!" : "Your Farm in Your Pocket!"}</h4>
            <p>
              {isTr
                ? "Uydu takibi, sulama uyarıları ve sezonluk gelir-gider hesabınızı AgroPulse ile cebinizden yönetin."
                : "Manage satellite monitoring, irrigation alerts, and seasonal profit/loss calculations with AgroPulse."}
            </p>

            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="proto-download-btn"
            >
              <PlayIcon />
              <span>{isTr ? "Google Play'den İndir" : "Download on Google Play"}</span>
            </a>

            <button
              type="button"
              className="proto-reset-btn"
              onClick={() => setStep(0)}
            >
              ↻ {isTr ? "Farklı Tarla Test Et" : "Test Another Field"}
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// -------------------------------------------------------------
// 2. MY CODES PROTOTYPE (Smartphone QR Wallet & Scanner)
// -------------------------------------------------------------
export function MyCodesPrototype({ app, locale }: PrototypeProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [selectedCard, setSelectedCard] = useState("turnstile");
  const [brightnessBoost, setBrightnessBoost] = useState(true);
  const [syncedWearOs, setSyncedWearOs] = useState(true);
  const isTr = locale === "tr";

  const cards = [
    {
      id: "istanbulkart",
      icon: "💳",
      name: isTr ? "İstanbulkart (Toplu Taşıma)" : "Transit Pass",
      code: "0482 9102 7741",
    },
    {
      id: "turnstile",
      icon: "🏢",
      name: isTr ? "Ofis Giriş Turnike Kartı" : "Office Turnstile Access",
      code: "OFFICE-KEY-2026",
    },
    {
      id: "coffee",
      icon: "☕",
      name: isTr ? "Coffee Lab Sadakat Kodu" : "Coffee Club Loyalty",
      code: "COFFEE-VIP-99",
    },
    {
      id: "flight",
      icon: "✈️",
      name: isTr ? "THY Biniş Kartı TK214" : "Flight Boarding Pass",
      code: "TK-BOARDING-B777",
    },
  ];

  const current = cards.find((c) => c.id === selectedCard) || cards[0];

  return (
    <PhoneFrame appName="My Codes" screenClass="screen-codes">
      <div className="proto-body">
        {step === 0 && (
          <div className="proto-step-fade">
            <div className="proto-header-chip">
              <span
                className="proto-indicator proto-pulse"
                style={{ background: "#7c3aed", boxShadow: "0 0 0 0 rgba(124, 58, 237, 0.7)" }}
              />
              {isTr ? "Cüzdan: 4 Aktif Kod" : "Wallet: 4 Active Codes"}
            </div>

            <div className="proto-phone-qr-header">
              <div className="proto-phone-qr-title">
                {isTr ? "Kayıtlı Kodlarım" : "My Stored Codes"}
              </div>
              <span className="proto-phone-qr-subtitle">
                {isTr ? "Görüntülemek veya okutmak için dokunun" : "Tap any card to view or scan"}
              </span>
            </div>

            <div className="proto-phone-cards-list">
              {cards.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`proto-phone-card-item ${selectedCard === c.id ? "is-selected" : ""}`}
                  onClick={() => {
                    setSelectedCard(c.id);
                    setStep(1);
                  }}
                >
                  <span className="proto-phone-card-icon">{c.icon}</span>
                  <div className="proto-phone-card-meta">
                    <span className="proto-phone-card-name">{c.name}</span>
                    <span className="proto-phone-card-code">{c.code}</span>
                  </div>
                  <span className="proto-phone-card-arrow">›</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="proto-action-btn proto-btn-blue"
              style={{ background: "#7c3aed", marginTop: "0.5rem" }}
              onClick={() => {
                setSelectedCard("turnstile");
                setStep(1);
              }}
            >
              📲 {isTr ? "Seçili Kodu Aç" : "Open Selected Code"}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="proto-step-fade">
            <div className="proto-header-chip">
              <span className="proto-indicator" style={{ background: "#7c3aed" }} />
              {isTr ? "Turnike / Okuyucu Modu" : "Scanner / Display Mode"}
            </div>

            <div className="proto-qr-fullscreen-box">
              <div className="proto-qr-badge-top">
                <span>
                  {current.icon} {current.name}
                </span>
                {brightnessBoost && (
                  <span className="proto-qr-bright-chip">
                    ☀️ {isTr ? "%100 Parlaklık" : "Max Bright"}
                  </span>
                )}
              </div>

              {/* Realistic High-Res QR Display */}
              <div className="proto-phone-qr-frame">
                <div className="proto-qr-reticle proto-reticle-tl" />
                <div className="proto-qr-reticle proto-reticle-tr" />
                <div className="proto-qr-reticle proto-reticle-bl" />
                <div className="proto-qr-reticle proto-reticle-br" />
                <div className="proto-phone-qr-svg-wrap">
                  <svg viewBox="0 0 100 100" className="proto-phone-qr-svg">
                    {/* Corner Position Targets */}
                    <rect x="5" y="5" width="26" height="26" fill="#000" rx="3" />
                    <rect x="9" y="9" width="18" height="18" fill="#fff" rx="2" />
                    <rect x="13" y="13" width="10" height="10" fill="#000" rx="1.5" />

                    <rect x="69" y="5" width="26" height="26" fill="#000" rx="3" />
                    <rect x="73" y="9" width="18" height="18" fill="#fff" rx="2" />
                    <rect x="77" y="13" width="10" height="10" fill="#000" rx="1.5" />

                    <rect x="5" y="69" width="26" height="26" fill="#000" rx="3" />
                    <rect x="9" y="73" width="18" height="18" fill="#fff" rx="2" />
                    <rect x="13" y="77" width="10" height="10" fill="#000" rx="1.5" />

                    {/* QR Matrix Bits */}
                    <rect x="36" y="8" width="6" height="6" fill="#000" />
                    <rect x="48" y="8" width="6" height="6" fill="#000" />
                    <rect x="58" y="16" width="6" height="6" fill="#000" />
                    <rect x="36" y="24" width="6" height="6" fill="#000" />
                    <rect x="44" y="24" width="6" height="6" fill="#000" />

                    <rect x="10" y="38" width="6" height="6" fill="#000" />
                    <rect x="22" y="38" width="6" height="6" fill="#000" />
                    <rect x="36" y="38" width="6" height="6" fill="#000" />
                    <rect x="48" y="44" width="8" height="8" fill="#7c3aed" rx="2" />
                    <rect x="64" y="38" width="6" height="6" fill="#000" />
                    <rect x="78" y="38" width="6" height="6" fill="#000" />

                    <rect x="14" y="52" width="6" height="6" fill="#000" />
                    <rect x="28" y="48" width="6" height="6" fill="#000" />
                    <rect x="42" y="56" width="6" height="6" fill="#000" />
                    <rect x="56" y="52" width="6" height="6" fill="#000" />
                    <rect x="70" y="56" width="6" height="6" fill="#000" />
                    <rect x="84" y="48" width="6" height="6" fill="#000" />

                    <rect x="36" y="72" width="6" height="6" fill="#000" />
                    <rect x="48" y="76" width="6" height="6" fill="#000" />
                    <rect x="62" y="70" width="6" height="6" fill="#000" />
                    <rect x="76" y="74" width="6" height="6" fill="#000" />
                    <rect x="86" y="82" width="6" height="6" fill="#000" />
                  </svg>
                  <div className="proto-qr-laser-line" />
                </div>
              </div>

              <div className="proto-qr-code-txt">{current.code}</div>

              {/* Quick toggles */}
              <div className="proto-qr-feature-toggles">
                <button
                  type="button"
                  className={`proto-toggle-pill ${brightnessBoost ? "is-active" : ""}`}
                  onClick={() => setBrightnessBoost(!brightnessBoost)}
                >
                  ☀️ {isTr ? "Maks Parlaklık" : "Auto Brightness"}
                </button>
                <button
                  type="button"
                  className={`proto-toggle-pill ${syncedWearOs ? "is-active" : ""}`}
                  onClick={() => setSyncedWearOs(!syncedWearOs)}
                >
                  ⌚ {isTr ? "Wear OS Eşitle" : "Wear OS Synced"}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="proto-action-btn proto-btn-blue"
              style={{ background: "#7c3aed", marginTop: "0.75rem" }}
              onClick={() => setStep(2)}
            >
              ⚡ {isTr ? "Turnikeye Okut (Test Et)" : "Simulate Scanner Tap"}
            </button>
            <button
              type="button"
              className="proto-reset-btn"
              onClick={() => setStep(0)}
            >
              ← {isTr ? "Kart Listesine Dön" : "Back to Cards"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="proto-step-fade proto-success-pane">
            <div className="proto-phone-scanned-icon">✓</div>
            <h4 style={{ color: "#7c3aed" }}>
              {isTr ? "Bip! Başarıyla Okundu" : "Beep! Successfully Scanned"}
            </h4>
            <div className="proto-scanned-meta">
              <span className="proto-scanned-card">{current.name}</span>
              <span className="proto-scanned-status">
                {isTr ? "Turnike Açıldı • Onay Kodu: #8492" : "Gate Unlocked • Auth #8492"}
              </span>
            </div>
            <p className="proto-subtext" style={{ margin: "0.75rem 0 1.25rem" }}>
              {isTr
                ? "İnternet bağlantısı olmasa dahi cihazınızda çevrimdışı çalışır. İster telefondan, ister Wear OS akıllı saatinden tek dokunuşla geçin."
                : "Works completely offline without network latency. Tap directly from your phone or your Wear OS smartwatch."}
            </p>
            <button
              type="button"
              className="proto-action-btn proto-btn-blue"
              style={{ background: "#7c3aed" }}
              onClick={() => setStep(3)}
            >
              {isTr ? "Sonucu Gör →" : "View Details →"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="proto-step-fade proto-success-pane">
            <div className="proto-success-icon">📱⌚</div>
            <h4>{isTr ? "My Codes – QR & Cüzdan" : "My Codes – QR & Wallet"}</h4>
            <p>
              {isTr
                ? "Tüm QR kodlarınızı, kartlarınızı ve biletlerinizi telefonunuzda güvenle saklayın, Wear OS saatinize anında eşitleyin."
                : "Store all your QR codes, transit passes, and loyalty cards securely on your phone with instant Wear OS sync."}
            </p>

            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="proto-download-btn"
            >
              <PlayIcon />
              <span>{isTr ? "Google Play'den İndir" : "Get it on Google Play"}</span>
            </a>

            <button
              type="button"
              className="proto-reset-btn"
              onClick={() => setStep(0)}
            >
              ↺ {isTr ? "Prototipi Baştan Dene" : "Restart Demo"}
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// -------------------------------------------------------------
// 3. KEEP THE CHAIN PROTOTYPE (Productivity / Habits / Zinciri Kırma)
// -------------------------------------------------------------
export function KeepTheChainPrototype({ app, locale }: PrototypeProps) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [doneHabits, setDoneHabits] = useState<Record<string, boolean>>({
    water: true,
    read: false,
    walk: false,
  });
  const isTr = locale === "tr";

  const toggleHabit = (key: string) => {
    const next = { ...doneHabits, [key]: !doneHabits[key] };
    setDoneHabits(next);
    if (!doneHabits[key]) {
      setStep(1);
    }
  };

  const streak = 14 + (doneHabits.read ? 1 : 0);

  return (
    <PhoneFrame appName={isTr ? "Zinciri Kırma" : "Keep the Chain"} screenClass="screen-chain">
      <div className="proto-body">
        <div className="proto-streak-badge">
          <span className="proto-fire-icon">🔥</span>
          <div>
            <div className="proto-streak-days">
              {streak} {isTr ? "Günlük Zincir" : "Day Streak"}
            </div>
            <div className="proto-streak-label">
              {isTr ? "Zincir hiç kırılmadı!" : "Don't break the chain!"}
            </div>
          </div>
        </div>

        {/* 7 Day Chain Ring Visualization */}
        <div className="proto-chain-row">
          {["P", "S", "Ç", "P", "C", "C", "P"].map((day, i) => {
            const active = i < 6 || doneHabits.read;
            const isToday = i === 6;
            return (
              <div key={`${day}-${i}`} className="proto-chain-col">
                <div className={`proto-ring ${active ? "proto-ring-active" : "proto-ring-empty"}`}>
                  {active ? "✕" : isToday ? "•" : ""}
                </div>
                <span className="proto-day-label">{day}</span>
              </div>
            );
          })}
        </div>

        {step === 0 && (
          <div className="proto-step-fade">
            <div className="proto-habits-header">
              {isTr ? "Bugünkü Hedeflerin" : "Today's Habits"}
            </div>

            <div className="proto-habits-list">
              <button
                type="button"
                className={`proto-habit-item ${doneHabits.water ? "is-done" : ""}`}
                onClick={() => toggleHabit("water")}
              >
                <span className="proto-habit-check">{doneHabits.water ? "✓" : "○"}</span>
                <span className="proto-habit-name">💧 {isTr ? "2 Litre Su İç" : "Drink 2L Water"}</span>
              </button>

              <button
                type="button"
                className={`proto-habit-item proto-habit-target ${doneHabits.read ? "is-done" : ""}`}
                onClick={() => toggleHabit("read")}
              >
                <span className="proto-habit-check">{doneHabits.read ? "✓" : "○"}</span>
                <span className="proto-habit-name">📖 {isTr ? "20 Sayfa Kitap Oku" : "Read 20 Pages"}</span>
                {!doneHabits.read && (
                  <span className="proto-pulse-tag">{isTr ? "Dokun 👆" : "Tap 👆"}</span>
                )}
              </button>

              <button
                type="button"
                className={`proto-habit-item ${doneHabits.walk ? "is-done" : ""}`}
                onClick={() => toggleHabit("walk")}
              >
                <span className="proto-habit-check">{doneHabits.walk ? "✓" : "○"}</span>
                <span className="proto-habit-name">🏃 {isTr ? "30 Dk Yürüyüş" : "30 Min Walk"}</span>
              </button>
            </div>

            <p className="proto-hint">
              {isTr ? "Hedefe dokunarak zincire bugünkü halkayı ekleyin:" : "Tap a habit to link today's chain ring:"}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="proto-step-fade proto-chain-celebrate">
            <div className="proto-fire-big">🔥✨</div>
            <h4>{isTr ? "15. Gün Zinciri Bağlandı!" : "Day 15 Chain Linked!"}</h4>
            <p className="proto-quote">
              {isTr
                ? "“Her gün atılan küçük bir adım, bir yıl sonra büyük bir dönüşüm yaratır.”"
                : "“A small step every day creates a huge transformation over a year.”"}
            </p>
            <button
              type="button"
              className="proto-action-btn proto-btn-orange"
              onClick={() => setStep(2)}
            >
              {isTr ? "Zincirimi Koru →" : "Keep My Chain →"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="proto-step-fade proto-success-pane">
            <div className="proto-success-icon">🏆</div>
            <h4>{isTr ? "Zincirini Asla Kırma!" : "Never Break the Chain!"}</h4>
            <p>
              {isTr
                ? "Alışkanlıklarınızı ve hedeflerinizi sade, motive edici bir zincir sistemiyle her gün takip edin."
                : "Track your habits and daily goals with a simple, motivating chain tracking system."}
            </p>

            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="proto-download-btn"
            >
              <PlayIcon />
              <span>{isTr ? "Google Play'den Ücretsiz İndir" : "Get It on Google Play"}</span>
            </a>

            <button
              type="button"
              className="proto-reset-btn"
              onClick={() => {
                setDoneHabits({ water: true, read: false, walk: false });
                setStep(0);
              }}
            >
              ↻ {isTr ? "Günü Sıfırla" : "Reset Day"}
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// -------------------------------------------------------------
// 4. ULGEN PROTOTYPE (Secure Link Protection / Anti-Phishing)
// -------------------------------------------------------------
export function UlgenPrototype({ app, locale }: PrototypeProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [targetType, setTargetType] = useState<"malicious" | "safe">("malicious");
  const isTr = locale === "tr";

  return (
    <PhoneFrame appName="Ulgen Security" screenClass="screen-ulgen">
      <div className="proto-body">
        {step === 0 && (
          <div className="proto-step-fade">
            <div className="proto-security-shield-top">
              <span className="proto-shield-icon">🛡️</span>
              <div>
                <div className="proto-shield-title">
                  {isTr ? "Gerçek Zamanlı Bağlantı Kalkanı" : "Real-Time Link Shield"}
                </div>
                <div className="proto-shield-sub">
                  {isTr ? "Zararlı URL & Phishing Dedektörü" : "Malicious URL & Phishing Detector"}
                </div>
              </div>
            </div>

            <div className="proto-url-box">
              <span className="proto-url-label">{isTr ? "Test Bağlantısı:" : "Test Link:"}</span>
              <div className="proto-url-display">
                {targetType === "malicious" ? "http://banka-giris-guvenlik.xyz" : "https://tr.wikipedia.org"}
              </div>
            </div>

            <div className="proto-url-toggles">
              <button
                type="button"
                className={`proto-toggle-btn ${targetType === "malicious" ? "is-active-red" : ""}`}
                onClick={() => setTargetType("malicious")}
              >
                🚨 {isTr ? "Zararlı Linki Test Et" : "Test Malicious Link"}
              </button>
              <button
                type="button"
                className={`proto-toggle-btn ${targetType === "safe" ? "is-active-green" : ""}`}
                onClick={() => setTargetType("safe")}
              >
                🟢 {isTr ? "Güvenli Linki Test Et" : "Test Safe Link"}
              </button>
            </div>

            <button
              type="button"
              className="proto-action-btn proto-btn-blue"
              style={{ marginTop: "1rem" }}
              onClick={() => setStep(1)}
            >
              🔍 {isTr ? "Güvenlik Taramasını Başlat" : "Run Security Scan"}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="proto-step-fade">
            <div className="proto-scanning-card">
              <div className="proto-radar-anim proto-radar-blue">
                <div className="proto-radar-sweep" />
                <span className="proto-radar-icon">🛡️</span>
              </div>
              <h4>{isTr ? "Güvenlik Kontrolleri Yapılıyor..." : "Running Security Checks..."}</h4>
              <ul className="proto-scan-checklist">
                <li>✓ {isTr ? "Siber Güvenlik Başkanlığı (SGB) listesi" : "National Cyber Security Blacklist"}</li>
                <li>✓ {isTr ? "DNS & SSL sertifika doğrulaması" : "DNS & SSL certificate verification"}</li>
                <li>✓ {isTr ? "Oltalama (Phishing) sezgisel analizi" : "Heuristic anti-phishing inspection"}</li>
              </ul>
            </div>

            <button
              type="button"
              className="proto-action-btn proto-btn-blue"
              style={{ marginTop: "1.2rem" }}
              onClick={() => setStep(2)}
            >
              {isTr ? "Sonucu Gör →" : "See Result →"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="proto-step-fade">
            {targetType === "malicious" ? (
              <div className="proto-threat-box">
                <div className="proto-threat-icon">🚨</div>
                <h4>{isTr ? "ZARARLI BAĞLANTI ENGELLENDİ!" : "MALICIOUS LINK BLOCKED!"}</h4>
                <p>
                  {isTr
                    ? "Bu bağlantı sahte bankacılık ve kimlik avı (phishing) şüphesi taşımaktadır. Şifreleriniz ve kişisel verileriniz korundu."
                    : "This link contains suspicious phishing and banking fraud patterns. Your credentials and privacy were protected."}
                </p>
                <div className="proto-threat-score">
                  {isTr ? "Güvenlik Puanı: 5 / 100 (Kritik Tehlike)" : "Security Score: 5 / 100 (Critical Risk)"}
                </div>
              </div>
            ) : (
              <div className="proto-safe-box">
                <div className="proto-safe-icon">🛡️</div>
                <h4>{isTr ? "BAĞLANTI GÜVENLİ" : "CONNECTION SECURE"}</h4>
                <p>
                  {isTr
                    ? "Doğrulanmış SSL sertifikası, temiz DNS kaydı ve bilinen sıfır tehdit. Güvenle ziyaret edebilirsiniz."
                    : "Verified SSL certificate, clean DNS record, zero known threats. Safe to visit."}
                </p>
                <div className="proto-safe-score">
                  {isTr ? "Güvenlik Puanı: 98 / 100 (Tam Güvenlik)" : "Security Score: 98 / 100 (Safe)"}
                </div>
              </div>
            )}

            <button
              type="button"
              className="proto-action-btn proto-btn-blue"
              style={{ marginTop: "1.2rem" }}
              onClick={() => setStep(3)}
            >
              {isTr ? "Koruma Detayları →" : "Protection Details →"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="proto-step-fade proto-success-pane">
            <div className="proto-success-icon">🔒</div>
            <h4>{isTr ? "İnternette Güvende Kalın" : "Stay Safe on the Web"}</h4>
            <p>
              {isTr
                ? "Ulgen ile her tıklamada arka planda zararlı siteleri yakalayın, kimlik avı ve sahte linklere geçit vermeyin."
                : "Block malicious links automatically on every click with Ulgen and keep your private data safe."}
            </p>

            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="proto-download-btn"
            >
              <PlayIcon />
              <span>{isTr ? "Google Play'den İndir" : "Download on Google Play"}</span>
            </a>

            <button
              type="button"
              className="proto-reset-btn"
              onClick={() => setStep(0)}
            >
              ↻ {isTr ? "Farklı Bağlantı Test Et" : "Test Another Link"}
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// -------------------------------------------------------------
// 5. TULPARIM PROTOTYPE (Vehicle Service Record / AI Mechanic)
// -------------------------------------------------------------
export function TulparimPrototype({ app, locale }: PrototypeProps) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const isTr = locale === "tr";

  return (
    <PhoneFrame appName="Tulparım" screenClass="screen-tulparim">
      <div className="proto-body">
        {step === 0 && (
          <div className="proto-step-fade">
            <div className="proto-vehicle-card">
              <div className="proto-vehicle-header">
                <div>
                  <div className="proto-vehicle-plate">34 ABC 789</div>
                  <div className="proto-vehicle-model">2022 Renault Megane 1.3 TCe</div>
                </div>
                <span className="proto-km-chip">68.450 km</span>
              </div>

              <div className="proto-gauges-grid">
                <div className="proto-gauge-item">
                  <span className="proto-gauge-label">🛢️ {isTr ? "Motor Yağı" : "Engine Oil"}</span>
                  <span className="proto-gauge-val proto-val-warn">%18</span>
                </div>
                <div className="proto-gauge-item">
                  <span className="proto-gauge-label">🛑 {isTr ? "Fren Balatası" : "Brakes"}</span>
                  <span className="proto-gauge-val proto-val-ok">{isTr ? "İyi" : "Good"}</span>
                </div>
                <div className="proto-gauge-item">
                  <span className="proto-gauge-label">📋 {isTr ? "Muayene" : "Inspection"}</span>
                  <span className="proto-gauge-val">{isTr ? "4 Ay" : "4 Mos"}</span>
                </div>
              </div>
            </div>

            <p className="proto-hint">
              {isTr
                ? "Aracın bakım geçmişini ve AI Usta tavsiyesini görmek için dokunun:"
                : "Tap to review maintenance records and AI Mechanic advice:"}
            </p>

            <button
              type="button"
              className="proto-action-btn proto-btn-gold"
              onClick={() => setStep(1)}
            >
              🤖 {isTr ? "AI Usta Analizini Gör" : "View AI Mechanic Analysis"}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="proto-step-fade">
            <div className="proto-mechanic-card">
              <div className="proto-mechanic-title">
                🔧 {isTr ? "AI Usta Değerlendirmesi" : "AI Mechanic Report"}
              </div>
              <p>
                {isTr
                  ? "“Son periyodik bakımdan sonra 8.450 km yol yapıldı. 1.550 km sonra motor yağı ve polen filtresi değişimi yapılması gerekiyor.”"
                  : "“8,450 km driven since last service. Oil and cabin filter replacement recommended in 1,550 km.”"}
              </p>

              <div className="proto-qr-pass-box">
                <span className="proto-qr-mini">🔲 QR Servis Kodu</span>
                <span className="proto-qr-desc">
                  {isTr
                    ? "Ustanıza bu QR kodu okutarak bakımı servis defterine işleyin."
                    : "Have your mechanic scan this QR code to log the service record."}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="proto-action-btn proto-btn-gold"
              onClick={() => setStep(2)}
            >
              {isTr ? "Servis Defterini Kaydet ✓" : "Save Service Book ✓"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="proto-step-fade proto-success-pane">
            <div className="proto-success-icon">🚘</div>
            <h4>{isTr ? "Aracınızın Değeri Güvende!" : "Your Car's Value Protected!"}</h4>
            <p>
              {isTr
                ? "Kaybolan faturalara son verin. Tüm bakım ve kaza geçmişini Tulparım ile dijital servis defterinde saklayın."
                : "Say goodbye to lost paper invoices. Keep all maintenance and repair history in a digital service book."}
            </p>

            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="proto-download-btn"
            >
              <PlayIcon />
              <span>{isTr ? "Google Play'den Ücretsiz İndir" : "Get It on Google Play"}</span>
            </a>

            <button
              type="button"
              className="proto-reset-btn"
              onClick={() => setStep(0)}
            >
              ↻ {isTr ? "Baştan İncele" : "Review Again"}
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// -------------------------------------------------------------
// MAIN DISPATCHER
// -------------------------------------------------------------
export function InteractiveAppPrototype({
  slug,
  app,
  locale,
}: {
  slug: string;
  app: AppItem;
  locale: Locale;
}) {
  switch (slug) {
    case "agropulse":
      return <AgroPulsePrototype app={app} locale={locale} />;
    case "my-codes":
      return <MyCodesPrototype app={app} locale={locale} />;
    case "keep-the-chain":
      return <KeepTheChainPrototype app={app} locale={locale} />;
    case "ulgen":
      return <UlgenPrototype app={app} locale={locale} />;
    case "tulparim":
      return <TulparimPrototype app={app} locale={locale} />;
    default:
      return null;
  }
}
