"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type CampaignLevel = "principiante" | "intermedio" | "avanzato" | "globale" | "speciale";
type ConditionType = "badge_key" | "wallet_metric" | "manual";
type RewardType = "idf_points" | "token" | "custom";

type CampaignRow = {
  id: string;
  title: string;
  description: string;
  level: CampaignLevel;
  conditionType: ConditionType;
  conditionValue: string;
  threshold: number | null;
  rewardType: RewardType;
  rewardValue: string;
  rewardToken: string | null;
  isActive: boolean;
  startsAt: string | null;
  endsAt: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type CampaignForm = {
  title: string;
  description: string;
  level: CampaignLevel;
  conditionType: ConditionType;
  conditionValue: string;
  threshold: string;
  rewardType: RewardType;
  rewardValue: string;
  rewardToken: string;
  isActive: boolean;
  order: number;
};

const EMPTY_FORM: CampaignForm = {
  title: "",
  description: "",
  level: "speciale",
  conditionType: "manual",
  conditionValue: "",
  threshold: "",
  rewardType: "idf_points",
  rewardValue: "",
  rewardToken: "IDF",
  isActive: true,
  order: 1,
};

export default function AdminLearningBadgesPage() {
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CampaignForm>(EMPTY_FORM);

  const sortedCampaigns = useMemo(
    () => [...campaigns].sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt)),
    [campaigns],
  );

  const loadCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/learning-badge-campaigns", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Impossibile caricare le campagne learning.");
        return;
      }
      setCampaigns(Array.isArray(data.campaigns) ? data.campaigns : []);
    } catch {
      setError("Errore di rete durante il caricamento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  useEffect(() => {
    if (editingId) return;
    setForm((prev) => ({ ...prev, order: Math.max(1, campaigns.length + 1) }));
  }, [campaigns.length, editingId]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: Math.max(1, campaigns.length + 1) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        level: form.level,
        conditionType: form.conditionType,
        conditionValue: form.conditionValue.trim(),
        threshold: form.threshold.trim() === "" ? null : Number(form.threshold),
        rewardType: form.rewardType,
        rewardValue: form.rewardValue.trim(),
        rewardToken: form.rewardToken.trim() || null,
        isActive: form.isActive,
        order: Number(form.order) || 1,
      };

      const endpoint = editingId
        ? `/api/admin/learning-badge-campaigns/${editingId}`
        : "/api/admin/learning-badge-campaigns";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Salvataggio non riuscito.");
        return;
      }
      await loadCampaigns();
      resetForm();
    } catch {
      setError("Errore di rete durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (item: CampaignRow) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      level: item.level,
      conditionType: item.conditionType,
      conditionValue: item.conditionValue,
      threshold: item.threshold === null ? "" : String(item.threshold),
      rewardType: item.rewardType,
      rewardValue: item.rewardValue,
      rewardToken: item.rewardToken || "",
      isActive: item.isActive,
      order: item.order,
    });
  };

  const onDelete = async (id: string) => {
    if (!confirm("Eliminare questa campagna learning?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/learning-badge-campaigns/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Eliminazione non riuscita.");
        return;
      }
      setCampaigns((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    } catch {
      setError("Errore di rete durante l'eliminazione.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Learning &amp; Badge Campaigns</h1>
        <p className="text-slate-300 mt-2">
          Gestisci reward di livello e campagne speciali temporanee (NFT mint, LP, ecc.).
        </p>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-white mb-4">{editingId ? "Modifica campagna" : "Nuova campagna"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Titolo</span>
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Livello</span>
            <select
              value={form.level}
              onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value as CampaignLevel }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
            >
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzato">Avanzato</option>
              <option value="globale">Globale</option>
              <option value="speciale">Speciale</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300 mb-1 block">Descrizione</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full min-h-[90px] rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Condition type</span>
            <select
              value={form.conditionType}
              onChange={(e) => setForm((prev) => ({ ...prev, conditionType: e.target.value as ConditionType }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
            >
              <option value="badge_key">badge_key</option>
              <option value="wallet_metric">wallet_metric</option>
              <option value="manual">manual</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Condition value</span>
            <input
              value={form.conditionValue}
              onChange={(e) => setForm((prev) => ({ ...prev, conditionValue: e.target.value }))}
              placeholder="es. principiante_level_complete o uniswapVolumeUsd"
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Threshold (opzionale)</span>
            <input
              type="number"
              value={form.threshold}
              onChange={(e) => setForm((prev) => ({ ...prev, threshold: e.target.value }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Reward type</span>
            <select
              value={form.rewardType}
              onChange={(e) => setForm((prev) => ({ ...prev, rewardType: e.target.value as RewardType }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
            >
              <option value="idf_points">idf_points</option>
              <option value="token">token</option>
              <option value="custom">custom</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Reward value</span>
            <input
              value={form.rewardValue}
              onChange={(e) => setForm((prev) => ({ ...prev, rewardValue: e.target.value }))}
              placeholder="es. 500 oppure Badge + token reward"
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Reward token (opzionale)</span>
            <input
              value={form.rewardToken}
              onChange={(e) => setForm((prev) => ({ ...prev, rewardToken: e.target.value }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Ordine</span>
            <input
              type="number"
              min={1}
              value={form.order}
              onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) || 1 }))}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white"
            />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-slate-300 md:col-span-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
            />
            Campagna attiva
          </label>
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
            >
              {saving ? "Salvataggio..." : editingId ? "Aggiorna campagna" : "Crea campagna"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-indigo-400/25 text-slate-200 text-sm font-medium hover:bg-white/5"
              >
                Annulla modifica
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-white mb-4">Campagne esistenti</h2>
        {error ? <p className="text-sm text-rose-300 mb-3">{error}</p> : null}
        {loading ? (
          <p className="text-slate-400">Caricamento campagne...</p>
        ) : sortedCampaigns.length === 0 ? (
          <p className="text-slate-400">Nessuna campagna configurata.</p>
        ) : (
          <div className="space-y-3">
            {sortedCampaigns.map((item) => (
              <article key={item.id} className="rounded-xl border border-indigo-400/20 bg-slate-950/45 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full border border-indigo-400/30 text-indigo-200">
                        {item.level}
                      </span>
                      {!item.isActive && (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-slate-500/40 text-slate-300">
                          inattiva
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Regola: <span className="text-slate-200">{item.conditionType}</span> / {item.conditionValue}
                      {item.threshold !== null ? ` / threshold ${item.threshold}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Reward: <span className="text-slate-200">{item.rewardValue}</span>
                      {item.rewardToken ? ` ${item.rewardToken}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-400/30 text-indigo-200 hover:bg-indigo-500/10"
                    >
                      Modifica
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-400/35 text-red-200 hover:bg-red-500/10"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
