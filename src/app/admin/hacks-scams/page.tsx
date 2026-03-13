"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Severity = "warning" | "critical" | "info";

type AdminAlert = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  isActive: boolean;
  order: number;
  link: string | null;
  createdAt: string;
  updatedAt: string;
};

type AlertFormState = {
  title: string;
  description: string;
  severity: Severity;
  link: string;
  isActive: boolean;
  order: number;
};

const EMPTY_FORM: AlertFormState = {
  title: "",
  description: "",
  severity: "warning",
  link: "",
  isActive: true,
  order: 1,
};

function severityBadge(severity: Severity): string {
  if (severity === "critical") return "bg-red-500/15 text-red-200 border-red-400/40";
  if (severity === "info") return "bg-sky-500/15 text-sky-200 border-sky-400/40";
  return "bg-amber-500/15 text-amber-200 border-amber-400/40";
}

export default function AdminHacksScamsPage() {
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<AlertFormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sortedAlerts = useMemo(
    () => [...alerts].sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt)),
    [alerts],
  );

  const loadAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/hacks-scams-alerts", { cache: "no-store" });
      if (!res.ok) {
        setError("Impossibile caricare gli alert.");
        return;
      }
      const data = await res.json();
      setAlerts(Array.isArray(data.alerts) ? data.alerts : []);
    } catch {
      setError("Errore di rete durante il caricamento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  useEffect(() => {
    if (editingId) return;
    setForm((prev) => ({ ...prev, order: Math.max(1, alerts.length + 1) }));
  }, [alerts.length, editingId]);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      order: Math.max(1, alerts.length + 1),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        severity: form.severity,
        link: form.link.trim() || null,
        isActive: form.isActive,
        order: Number(form.order) || 1,
      };

      const endpoint = editingId
        ? `/api/admin/hacks-scams-alerts/${editingId}`
        : "/api/admin/hacks-scams-alerts";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Salvataggio non riuscito.");
        return;
      }

      await loadAlerts();
      resetForm();
    } catch {
      setError("Errore di rete durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (item: AdminAlert) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      severity: item.severity,
      link: item.link || "",
      isActive: item.isActive,
      order: item.order,
    });
  };

  const onDelete = async (id: string) => {
    if (!confirm("Eliminare questo alert?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/hacks-scams-alerts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Eliminazione non riuscita.");
        return;
      }
      setAlerts((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    } catch {
      setError("Errore di rete durante l'eliminazione.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Hacks &amp; Scams Alerts</h1>
        <p className="text-slate-300 mt-2">
          Gestisci gli alert mostrati nella dashboard pubblica.
        </p>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-white mb-4">
          {editingId ? "Modifica alert" : "Nuovo alert"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Titolo</span>
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              placeholder="Es. FakeBridge Airdrop"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Severity</span>
            <select
              value={form.severity}
              onChange={(e) => setForm((prev) => ({ ...prev, severity: e.target.value as Severity }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            >
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
              <option value="info">Info</option>
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300 mb-1 block">Descrizione</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full min-h-[96px] rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              placeholder="Spiega il rischio in modo chiaro e operativo."
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Link (opzionale)</span>
            <input
              value={form.link}
              onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              placeholder="https://..."
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Ordine</span>
            <input
              type="number"
              min={1}
              value={form.order}
              onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) || 1 }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </label>

          <label className="inline-flex items-center gap-2 text-sm text-slate-300 md:col-span-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              className="rounded border-indigo-400/25 bg-slate-950/70"
            />
            Alert attivo (visibile nella homepage)
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors disabled:opacity-60"
            >
              {saving ? "Salvataggio..." : editingId ? "Aggiorna alert" : "Crea alert"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-indigo-400/25 text-slate-200 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Annulla modifica
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-white mb-4">Alert esistenti</h2>
        {error && <p className="text-sm text-red-300 mb-3">{error}</p>}
        {loading ? (
          <p className="text-slate-400">Caricamento alert...</p>
        ) : sortedAlerts.length === 0 ? (
          <p className="text-slate-400">Nessun alert configurato.</p>
        ) : (
          <div className="space-y-3">
            {sortedAlerts.map((item) => (
              <div key={item.id} className="rounded-xl border border-indigo-400/20 bg-slate-950/45 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${severityBadge(item.severity)}`}>
                        {item.severity}
                      </span>
                      {!item.isActive && (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-slate-500/40 text-slate-300 bg-slate-600/20">
                          inattivo
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 rounded-full border border-indigo-400/30 text-indigo-200">
                        ordine {item.order}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{item.description}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-300 hover:text-indigo-200 underline mt-2 inline-block"
                      >
                        {item.link}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-400/30 text-indigo-200 hover:bg-indigo-500/10 transition-colors"
                    >
                      Modifica
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-400/35 text-red-200 hover:bg-red-500/10 transition-colors"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

