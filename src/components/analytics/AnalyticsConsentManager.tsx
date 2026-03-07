"use client";

import { useEffect, useMemo, useState } from "react";

const CONSENT_KEY = "idf_analytics_consent";
const CONSENT_COOKIE = "idf_analytics_consent";

type ConsentValue = "granted" | "denied";

function setConsentCookie(value: ConsentValue) {
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

function injectGa(measurementId: string) {
  if (document.getElementById("idf-ga-script")) return;

  const src = document.createElement("script");
  src.id = "idf-ga-script";
  src.async = true;
  src.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(src);

  const inline = document.createElement("script");
  inline.id = "idf-ga-inline";
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${measurementId}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

export function AnalyticsConsentManager() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
    }
  }, []);

  useEffect(() => {
    if (!consent) return;
    localStorage.setItem(CONSENT_KEY, consent);
    setConsentCookie(consent);
    if (consent === "granted" && measurementId) {
      injectGa(measurementId);
    }
  }, [consent, measurementId]);

  const shouldShowBanner = useMemo(() => consent === null, [consent]);
  if (!shouldShowBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] rounded-xl border border-indigo-400/30 bg-indigo-950/95 p-4 text-sm text-slate-200 shadow-2xl">
      <p>
        Usiamo cookie analytics per migliorare il prodotto (es. login, wallet connect, salvataggio profilo). Puoi accettare o rifiutare.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="rounded-lg bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-400"
        >
          Accetta analytics
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="rounded-lg border border-slate-500/40 px-3 py-2 text-slate-200 hover:bg-slate-800/40"
        >
          Rifiuta
        </button>
      </div>
    </div>
  );
}

