"use client";
import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Iscrizione non riuscita");
      }
      setOk(true);
      setEmail("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore inatteso";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background py-16">
      <div className="container-custom">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Iscriviti alla Newsletter</h1>
          <p className="text-neutral-700 text-center mb-6">
            Aggiornamenti su guide, novità e strategie direttamente nella tua casella email.
          </p>
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
            {error && <p className="text-sm text-red-600">{error}</p>}
            {ok && <p className="text-sm text-green-700">Iscrizione completata! Controlla la tua email.</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Invio..." : "Iscriviti"}
            </button>
            <p className="text-xs text-neutral-500 text-center">
              Iscrivendoti, accetti la nostra informativa sulla privacy. Puoi disiscriverti in qualsiasi momento.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


