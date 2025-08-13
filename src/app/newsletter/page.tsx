"use client";
import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Errore iscrizione");
      }
      setMessage("Iscrizione avvenuta! Controlla la tua casella email.");
      setEmail("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore inatteso";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background py-16">
      <div className="container-custom">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Iscriviti alla Newsletter</h1>
          <p className="text-neutral-700 text-center mb-6">Ricevi aggiornamenti e risorse sul Web3 direttamente nella tua casella.</p>
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
            {message && <p className="text-sm text-neutral-700">{message}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Invio..." : "Iscriviti"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}


