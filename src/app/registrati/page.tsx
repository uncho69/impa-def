"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useState } from "react";
import Script from "next/script";

function RegistratiInner() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/manuale";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Registrazione non riuscita");
      }
      document.cookie = `imparodefi_registered=1; path=/; max-age=${60 * 60 * 24 * 365}`;
      router.push(next);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Errore inatteso";
      setError(message);
    } finally {
      setLoading(false);
    }
  }
  function onTurnstile(tokenValue: string) {
    setToken(tokenValue);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background py-16">
      <div className="container-custom">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Crea il tuo accesso gratuito</h1>
          <p className="text-neutral-700 text-center mb-6">Registrati con la tua email per iniziare subito.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@esempio.com"
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex justify-center">
                <div
                  className="cf-turnstile"
                  data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  data-callback="onTurnstile"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Invio..." : "Invia"}</button>
            </form>
          
          <p className="text-xs text-neutral-500 mt-4 text-center">Iscrivendoti accetti la nostra informativa sulla privacy.</p>
        </div>
      </div>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={() => {
          // @ts-expect-error turnstile callback assignment
          window.onTurnstile = onTurnstile;
        }}
      />
    </div>
  );
}

export default function Registrati() {
  return (
    <Suspense fallback={<div className="container-custom py-16">Caricamento…</div>}>
      <RegistratiInner />
    </Suspense>
  );
}

