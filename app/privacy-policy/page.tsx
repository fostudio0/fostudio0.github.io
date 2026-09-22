"use client";

import { useEffect } from "react";

const LEGACY_TARGET = "/legal/";

export default function LegacyPrivacyRedirect() {
  useEffect(() => {
    window.location.replace(LEGACY_TARGET);
  }, []);

  return (
    <head>
      <meta httpEquiv="refresh" content={`0; url=${LEGACY_TARGET}`} />
    </head>
  );
}