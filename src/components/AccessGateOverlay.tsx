"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useAppAuth } from "@/lib/auth/useAppAuth";

type StatusResponse = {
  unlocked?: boolean;
  reason?: "not_authenticated" | "not_approved";
  requestStatus?: "none" | "pending" | "approved" | "rejected" | null;
  requestAccessPath?: string;
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
    login: "Accedi",
    requestAccess: "Richiedi accesso",
    accessDenied: "Questo account non ha ancora accesso alla beta.",
    pendingReview: "La tua richiesta e in revisione. Ti notificheremo appena viene valutata.",
    rejected: "La tua richiesta non e stata approvata al momento. Puoi aggiornarla e inviarla di nuovo.",
    noRequest: "Per entrare senza password devi prima inviare la richiesta accesso.",
    switchAccount: "Cambia account",
  },
  en: {
    title: "Enter password",
    placeholder: "Password",
    submit: "Enter",
    submitting: "Verifying...",
    errorInvalid: "Invalid or already used password.",
    errorNetwork: "Network error. Try again.",
    login: "Login",
    requestAccess: "Request access",
    accessDenied: "This account has not been granted beta access yet.",
    pendingReview: "Your request is under review. We will notify you as soon as it is evaluated.",
    rejected: "Your request was not approved at the moment. You can update and submit it again.",
    noRequest: "To enter without a password, submit an access request first.",
    switchAccount: "Switch account",
  },
};

export function AccessGateOverlay() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoaded: authLoaded, isSignedIn, login, logout } = useAppAuth();
  const [lang, setLang] = useState<Lang>("it");
  const [langOpen, setLangOpen] = useState(false);
  const langSwitcherRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [gateReason, setGateReason] = useState<StatusResponse["reason"]>(undefined);
  const [requestStatus, setRequestStatus] = useState<StatusResponse["requestStatus"]>(null);
  const [requestAccessPath, setRequestAccessPath] = useState("/beta-access");
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
        setGateReason(data?.reason);
        setRequestStatus(data?.requestStatus ?? null);
        if (typeof data?.requestAccessPath === "string" && data.requestAccessPath.trim()) {
          setRequestAccessPath(data.requestAccessPath);
        }
      } catch {
        if (cancelled) return;
        setUnlocked(false);
        setGateReason(undefined);
        setRequestStatus(null);
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

  useEffect(() => {
    if (shouldSkipOverlay) return;
    if (loading) return;
    if (!isSignedIn) return;
    if (gateReason !== "not_approved") return;
    router.push(requestAccessPath);
  }, [gateReason, isSignedIn, loading, requestAccessPath, router, shouldSkipOverlay]);

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

  const statusHint =
    requestStatus === "pending"
      ? t.pendingReview
      : requestStatus === "rejected"
      ? t.rejected
      : t.noRequest;

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

          <div className="my-4 h-px w-full bg-indigo-400/20" />

          <div className="space-y-2">
            {!isSignedIn ? (
              <button
                type="button"
                onClick={() => login()}
                disabled={!authLoaded}
                className="w-full rounded-xl border border-indigo-300/35 bg-indigo-500/20 px-4 py-2.5 text-sm font-semibold text-indigo-100 transition-colors hover:bg-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t.login}
              </button>
            ) : null}

            {isSignedIn && gateReason === "not_approved" ? (
              <div className="rounded-xl border border-amber-400/35 bg-amber-500/10 p-3 text-left">
                <p className="text-sm font-semibold text-amber-100">{t.accessDenied}</p>
                <p className="mt-1 text-xs text-amber-100/90">{statusHint}</p>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => router.push(requestAccessPath)}
              className="w-full rounded-xl border border-indigo-300/35 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t.requestAccess}
            </button>

            {isSignedIn ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                }}
                className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5"
              >
                {t.switchAccount}
              </button>
            ) : null}
          </div>

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

