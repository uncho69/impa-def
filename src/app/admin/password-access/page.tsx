"use client";

import { useEffect, useMemo, useState } from "react";

type AccessPassword = {
  id: number;
  code: string;
  status: "active" | "used" | "revoked";
  usedAt: string | null;
  revokedAt: string | null;
  createdBy: string | null;
  createdAt: string;
  recipientName: string | null;
};

function fmtDate(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPasswordAccessPage() {
  const [items, setItems] = useState<AccessPassword[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const activeCount = useMemo(() => items.filter((i) => i.status === "active").length, [items]);
  const usedCount = useMemo(() => items.filter((i) => i.status === "used").length, [items]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/access-gate-passwords", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error ? String(data.error) : "Errore caricamento password.");
        return;
      }
      setItems(Array.isArray(data?.passwords) ? (data.passwords as AccessPassword[]) : []);
    } catch {
      setMessage("Errore di rete durante il caricamento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const createPassword = async () => {
    setCreating(true);
    setMessage(null);
    setGeneratedCode(null);
    try {
      const res = await fetch("/api/admin/access-gate-passwords", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.password) {
        setMessage(data?.error ? String(data.error) : "Creazione password non riuscita.");
        return;
      }
      setGeneratedCode(String(data.password.code));
      await load();
    } catch {
      setMessage("Errore di rete durante la creazione.");
    } finally {
      setCreating(false);
    }
  };

  const revoke = async (id: number) => {
    if (busyId) return;
    setBusyId(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/access-gate-passwords/${id}/revoke`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error ? String(data.error) : "Impossibile revocare password.");
        return;
      }
      await load();
    } catch {
      setMessage("Errore di rete durante la revoca.");
    } finally {
      setBusyId(null);
    }
  };

  const updateRecipient = async (id: number, recipientName: string | null) => {
    try {
      const res = await fetch(`/api/admin/access-gate-passwords/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientName: recipientName?.trim() || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessage(data?.error ? String(data.error) : "Impossibile aggiornare destinatario.");
        return;
      }
      setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, recipientName: recipientName?.trim() || null } : p)),
      );
    } catch {
      setMessage("Errore di rete durante l'aggiornamento.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6 backdrop-blur">
        <h1 className="text-xl font-bold text-white">Password Access</h1>
        <p className="mt-2 text-sm text-slate-300">
          Password monouso per sbloccare il sito: ogni codice puo essere usato una sola volta.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={createPassword}
            disabled={creating}
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
          >
            {creating ? "Generazione..." : "Genera password"}
          </button>
          <span className="rounded-md border border-indigo-400/25 px-3 py-1 text-xs text-indigo-100">
            Attive: {activeCount}
          </span>
          <span className="rounded-md border border-emerald-400/25 px-3 py-1 text-xs text-emerald-200">
            Usate: {usedCount}
          </span>
        </div>

        {generatedCode ? (
          <div className="mt-4 rounded-lg border border-indigo-400/30 bg-slate-950/40 p-3">
            <p className="text-xs text-slate-400">Nuova password monouso</p>
            <p className="mt-1 font-mono text-lg text-white">{generatedCode}</p>
          </div>
        ) : null}
        {message ? <p className="mt-3 text-sm text-red-300">{message}</p> : null}
      </div>

      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-4 backdrop-blur">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-indigo-500/20 text-left text-slate-300">
                <th className="px-3 py-2">Password</th>
                <th className="px-3 py-2">Stato</th>
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2">Creata</th>
                <th className="px-3 py-2">Usata</th>
                <th className="px-3 py-2">Azione</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-3 py-3 text-slate-400" colSpan={6}>
                    Caricamento...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="px-3 py-3 text-slate-400" colSpan={6}>
                    Nessuna password generata.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-indigo-500/10 text-slate-200">
                    <td className="px-3 py-3 font-mono">{item.code}</td>
                    <td className="px-3 py-3">
                      {item.status === "active" ? (
                        <span className="rounded-md border border-indigo-400/30 px-2 py-0.5 text-xs text-indigo-100">Attiva</span>
                      ) : item.status === "used" ? (
                        <span className="rounded-md border border-emerald-400/30 px-2 py-0.5 text-xs text-emerald-200">Usata</span>
                      ) : (
                        <span className="rounded-md border border-rose-400/30 px-2 py-0.5 text-xs text-rose-200">Revocata</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        placeholder="Nome destinatario"
                        className="w-full max-w-[140px] rounded border border-indigo-500/30 bg-slate-900/60 px-2 py-1 text-xs text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                        defaultValue={item.recipientName ?? ""}
                        onBlur={(e) => updateRecipient(item.id, e.target.value || null)}
                      />
                    </td>
                    <td className="px-3 py-3 text-slate-300">{fmtDate(item.createdAt)}</td>
                    <td className="px-3 py-3 text-slate-300">{fmtDate(item.usedAt)}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        disabled={item.status !== "active" || busyId === item.id}
                        onClick={() => revoke(item.id)}
                        className="rounded-md border border-rose-400/35 px-2.5 py-1 text-xs text-rose-100 hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Revoca
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

