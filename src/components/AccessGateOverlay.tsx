"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type StatusResponse = {
  unlocked?: boolean;
};

export function AccessGateOverlay() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/access-gate/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError("Password non valida o gia usata.");
        return;
      }
      setUnlocked(true);
      setPassword("");
    } catch {
      setError("Errore di rete. Riprova.");
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
        <div className="w-full max-w-md rounded-2xl border border-indigo-500/30 bg-indigo-950/80 p-6 shadow-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-3xl font-bold text-white">ImparoDeFi</span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-sm font-medium text-slate-300">
              BETA
            </span>
          </div>

          <h2 className="mb-4 text-xl font-bold text-white">
            Immetti password
          </h2>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="one-time-code"
              placeholder="Password"
              className="w-full rounded-xl border border-indigo-400/30 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-indigo-400"
            />
            {error ? (
              <p className="text-sm text-red-300">{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={submitting || !password.trim() || loading}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Verifica..." : "Entra"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

