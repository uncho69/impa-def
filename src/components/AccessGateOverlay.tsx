"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

type StatusResponse = {
  unlocked?: boolean;
};

type Lang = "it" | "en";

const copy = {
  it: {
    title: "Immetti password",
    placeholder: "Password",
    submit: "Entra",
    submitting: "Verifica...",
    errorInvalid: "Password non valida o gia usata.",
    errorNetwork: "Errore di rete. Riprova.",
  },
  en: {
    title: "Enter password",
    placeholder: "Password",
    submit: "Enter",
    submitting: "Verifying...",
    errorInvalid: "Invalid or already used password.",
    errorNetwork: "Network error. Try again.",
  },
};

export function AccessGateOverlay() {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>("it");
  const [langOpen, setLangOpen] = useState(false);
  const langSwitcherRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<"invalid" | "network" | null>(null);
  const t = copy[lang];
  const errorMessage = errorKey === "invalid" ? t.errorInvalid : errorKey === "network" ? t.errorNetwork : null;

  const shouldSkipOverlay = useMemo(() => {
    return (
      pathname === "/beta-access" ||
      pathname.startsWith("/api/") ||
      pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up")
    );
  }, [pathname]);

  useEffect(() => {
    if (shouldSkipOverlay) {
      setUnlocked(true);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const loadStatus = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/access-gate/status", { cache: "no-store" });
        const data: StatusResponse = await res.json().catch(() => ({}));
        if (cancelled) return;
        setUnlocked(Boolean(data?.unlocked));
      } catch {
        if (cancelled) return;
        setUnlocked(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadStatus();
    return () => {
      cancelled = true;
    };
  }, [shouldSkipOverlay]);

  useEffect(() => {
    if (!langOpen) return;
    const close = (e: MouseEvent) => {
      if (langSwitcherRef.current?.contains(e.target as Node)) return;
      setLangOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || submitting) return;
    setSubmitting(true);
    setErrorKey(null);
    try {
      const res = await fetch("/api/access-gate/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setErrorKey("invalid");
        return;
      }
      setUnlocked(true);
      setPassword("");
    } catch {
      setErrorKey("network");
    } finally {
      setSubmitting(false);
    }
  };

  if (shouldSkipOverlay || (!loading && unlocked)) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-indigo-950/45 backdrop-blur-md" />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-indigo-500/30 bg-indigo-950/80 p-6 shadow-2xl text-center">
          {/* Language switcher - top right, chiuso di default, si apre al clic */}
          <div ref={langSwitcherRef} className="absolute right-4 top-4 z-[2]">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-400/30 bg-indigo-950/90 px-2.5 py-1.5 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              aria-label={lang === "it" ? "Lingua: Italiano" : "Language: English"}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <span className="text-base leading-none" aria-hidden>
                {lang === "it" ? "🇮🇹" : "🇬🇧"}
              </span>
              <ChevronDown
                className={`size-4 text-slate-400 transition-transform ${langOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-1 flex flex-col gap-0.5 rounded-lg border border-indigo-400/30 bg-indigo-950/90 py-1.5 pl-2 pr-2 backdrop-blur-sm"
                role="listbox"
                aria-label="Seleziona lingua"
              >
                <button
                  type="button"
                  onClick={() => {
                    setLang("it");
                    setLangOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm text-white transition-colors hover:bg-white/10"
                  role="option"
                  aria-selected={lang === "it"}
                >
                  {lang === "it" ? (
                    <Check className="size-4 shrink-0 text-indigo-300" />
                  ) : (
                    <span className="size-4 shrink-0" />
                  )}
                  <span className="font-medium">IT</span>
                  <span className="text-base leading-none">🇮🇹</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang("en");
                    setLangOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm text-white transition-colors hover:bg-white/10"
                  role="option"
                  aria-selected={lang === "en"}
                >
                  {lang === "en" ? (
                    <Check className="size-4 shrink-0 text-indigo-300" />
                  ) : (
                    <span className="size-4 shrink-0" />
                  )}
                  <span className="font-medium">EN</span>
                  <span className="text-base leading-none">🇬🇧</span>
                </button>
              </div>
            )}
          </div>

          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-3xl font-bold text-white">ImparoDeFi</span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-sm font-medium text-slate-300">
              BETA
            </span>
          </div>

          <h2 className="mb-4 text-xl font-bold text-white">
            {t.title}
          </h2>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="one-time-code"
              placeholder={t.placeholder}
              className="w-full rounded-xl border border-indigo-400/30 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-indigo-400"
            />
            {errorMessage ? (
              <p className="text-sm text-red-300">{errorMessage}</p>
            ) : null}
            <button
              type="submit"
              disabled={submitting || !password.trim() || loading}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? t.submitting : t.submit}
            </button>
          </form>

          <BorderBeam
            duration={6}
            size={400}
            borderWidth={1}
            colorFrom="#6366f1"
            colorTo="#a855f7"
          />
        </div>
      </div>
    </div>
  );
}

