"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const REWARD_TOKENS = ["ETH", "USDC", "IDF"] as const;
const EPOCH_OPTIONS = [
  { label: "1 settimana", days: 7 },
  { label: "1 mese", days: 30 },
  { label: "Custom", days: 0 },
] as const;

interface Project {
  id: string;
  name: string;
}

interface CampaignRow {
  projectId: string;
  index: number;
  name: string;
  epochCount: number;
  epochSize: number;
  isActive: number;
  deletedAt: string | null;
  createdAt: string;
  projectName: string;
  campaignId: string;
  rewards: { token: string; amount: number }[];
}

interface RequestRow {
  id: number;
  userId: string;
  userEmail: string | null;
  userUsername: string | null;
  projectId: string;
  campaignIndex: number;
  campaignName: string;
  status: string;
  requestedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

function formatRewardAmount(token: string, amount: number): string {
  if (token === "IDF") return `${amount} IDF`;
  if (token === "ETH") return `${(amount / 1e18).toFixed(4)} ETH`;
  if (token === "USDC") return `${(amount / 1e6).toFixed(2)} USDC`;
  return `${amount} ${token}`;
}

export default function AdminCampaignsPage() {
  const [tab, setTab] = useState<"campagne" | "richieste">("campagne");
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    projectId: "",
    epochDays: 7,
    customDays: 30,
    rewards: [] as { token: string; amount: number }[],
  });
  const [actioningId, setActioningId] = useState<string | null>(null);

  // Richieste partecipazione state
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [requestFilter, setRequestFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [actioningRequestId, setActioningRequestId] = useState<number | null>(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/campaigns");
      const data = await res.json();
      if (res.ok) setCampaigns(data.campaigns ?? []);
      else setError(data?.error ?? "Errore caricamento campagne");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore di connessione");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (res.ok) setProjects(data.projects ?? []);
    } catch (_) {}
  };

  useEffect(() => {
    fetchCampaigns();
    fetchProjects();
  }, []);

  const fetchRequests = async () => {
    setRequestsLoading(true);
    setRequestError(null);
    try {
      const url =
        requestFilter === "all"
          ? "/api/admin/participation-requests"
          : `/api/admin/participation-requests?status=${requestFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) setRequests(data.requests ?? []);
      else setRequestError(data?.error ?? "Errore");
    } catch (e) {
      setRequestError(e instanceof Error ? e.message : "Errore");
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "richieste") fetchRequests();
  }, [tab, requestFilter]);

  const handleCreateCampaign = async () => {
    if (!createForm.projectId) return;
    const days = createForm.epochDays === 0 ? createForm.customDays : createForm.epochDays;
    if (days < 1) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: createForm.projectId,
          epochSizeDays: days,
          rewards: createForm.rewards.filter((r) => r.amount > 0),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setModalOpen(false);
        setCreateForm({ projectId: "", epochDays: 7, customDays: 30, rewards: [] });
        fetchCampaigns();
      } else {
        setError(data?.error ?? "Errore creazione");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleCloseOrReopen = async (campaignId: string, action: "close" | "reopen") => {
    setActioningId(campaignId);
    try {
      const res = await fetch(`/api/admin/campaigns/${campaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) fetchCampaigns();
    } finally {
      setActioningId(null);
    }
  };

  const handleDelete = async (campaignId: string) => {
    if (!confirm("Eliminare questa campagna? (soft delete)")) return;
    setActioningId(campaignId);
    try {
      const res = await fetch(`/api/admin/campaigns/${campaignId}`, { method: "DELETE" });
      if (res.ok) fetchCampaigns();
    } finally {
      setActioningId(null);
    }
  };

  const handleReviewRequest = async (id: number, action: "approve" | "reject") => {
    setActioningRequestId(id);
    try {
      const res = await fetch(`/api/admin/participation-requests/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) fetchRequests();
    } finally {
      setActioningRequestId(null);
    }
  };

  const addRewardRow = () => {
    setCreateForm((f) => ({
      ...f,
      rewards: [...f.rewards, { token: "IDF", amount: 0 }],
    }));
  };

  const updateReward = (i: number, field: "token" | "amount", value: string | number) => {
    setCreateForm((f) => ({
      ...f,
      rewards: f.rewards.map((r, j) =>
        j === i ? { ...r, [field]: field === "amount" ? Number(value) : value } : r
      ),
    }));
  };

  const removeReward = (i: number) => {
    setCreateForm((f) => ({ ...f, rewards: f.rewards.filter((_, j) => j !== i) }));
  };

  const displayName = (r: RequestRow) =>
    r.userUsername || r.userEmail?.split("@")[0] || r.userId.slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestione campagne</h1>
          <p className="text-gray-600 mt-1">Crea, chiudi o elimina campagne e gestisci le richieste di partecipazione.</p>
        </div>
        <Link
          href="/admin/dashboard"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTab("campagne")}
          className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
            tab === "campagne"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Campagne
        </button>
        <button
          onClick={() => setTab("richieste")}
          className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
            tab === "richieste"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Richieste partecipazione
        </button>
      </div>

      {tab === "campagne" && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => { setModalOpen(true); fetchProjects(); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              + Crea campagna
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
              {error}
              <button onClick={() => setError(null)} className="ml-2 underline">Chiudi</button>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Caricamento...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Progetto / Campagna</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rewards</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Durata epoch</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stato</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        Nessuna campagna. Clicca &quot;Crea campagna&quot; per iniziare.
                      </td>
                    </tr>
                  ) : (
                    campaigns.map((c) => (
                      <tr key={c.campaignId} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{c.projectName}</div>
                          <div className="text-sm text-gray-500">{c.name}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {c.rewards.length === 0
                            ? "-"
                            : c.rewards.map((r) => formatRewardAmount(r.token, r.amount)).join(", ")}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {c.epochSize === 7 ? "1 settimana" : c.epochSize === 30 ? "1 mese" : `${c.epochSize} giorni`}
                        </td>
                        <td className="px-4 py-3">
                          {c.deletedAt ? (
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">Eliminata</span>
                          ) : c.isActive === 1 ? (
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Attiva</span>
                          ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Chiusa</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {!c.deletedAt && (
                            <div className="flex justify-end gap-2">
                              {c.isActive === 1 ? (
                                <button
                                  onClick={() => handleCloseOrReopen(c.campaignId, "close")}
                                  disabled={actioningId === c.campaignId}
                                  className="text-amber-700 hover:bg-amber-50 px-2 py-1 rounded text-sm font-medium disabled:opacity-50"
                                >
                                  Chiudi
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleCloseOrReopen(c.campaignId, "reopen")}
                                  disabled={actioningId === c.campaignId}
                                  className="text-green-700 hover:bg-green-50 px-2 py-1 rounded text-sm font-medium disabled:opacity-50"
                                >
                                  Riapri
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(c.campaignId)}
                                disabled={actioningId === c.campaignId}
                                className="text-red-700 hover:bg-red-50 px-2 py-1 rounded text-sm font-medium disabled:opacity-50"
                              >
                                Elimina
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {modalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Crea campagna</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Progetto</label>
                      <select
                        value={createForm.projectId}
                        onChange={(e) => setCreateForm((f) => ({ ...f, projectId: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="">Seleziona progetto</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Durata epoch</label>
                      <select
                        value={createForm.epochDays}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            epochDays: Number(e.target.value) as 0 | 7 | 30,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        {EPOCH_OPTIONS.map((opt) => (
                          <option key={opt.days} value={opt.days}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {createForm.epochDays === 0 && (
                        <input
                          type="number"
                          min={1}
                          value={createForm.customDays}
                          onChange={(e) =>
                            setCreateForm((f) => ({ ...f, customDays: parseInt(e.target.value, 10) || 1 }))
                          }
                          className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Giorni"
                        />
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">Rewards (ETH, USDC, IDF points)</label>
                        <button
                          type="button"
                          onClick={addRewardRow}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          + Aggiungi
                        </button>
                      </div>
                      <div className="space-y-2">
                        {createForm.rewards.map((r, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <select
                              value={r.token}
                              onChange={(e) => updateReward(i, "token", e.target.value)}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                            >
                              {REWARD_TOKENS.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min={0}
                              step={r.token === "IDF" ? 1 : r.token === "ETH" ? 0.01 : 0.01}
                              value={r.amount || ""}
                              onChange={(e) => updateReward(i, "amount", e.target.value)}
                              placeholder="Importo"
                              className="w-28 border border-gray-300 rounded-lg px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => removeReward(i)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Annulla
                    </button>
                    <button
                      onClick={handleCreateCampaign}
                      disabled={!createForm.projectId || creating}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                      {creating ? "Creazione..." : "Crea campagna"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "richieste" && (
        <>
          <div className="flex gap-2">
            {(["pending", "approved", "rejected", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setRequestFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  requestFilter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f === "pending" ? "In attesa" : f === "approved" ? "Approvate" : f === "rejected" ? "Rifiutate" : "Tutte"}
              </button>
            ))}
          </div>

          {requestError && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
              {requestError}
              <button onClick={() => { setRequestError(null); fetchRequests(); }} className="ml-2 underline">Riprova</button>
            </div>
          )}

          {requestsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Caricamento richieste...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Utente</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Campagna</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stato</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data richiesta</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        Nessuna richiesta trovata.
                      </td>
                    </tr>
                  ) : (
                    requests.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{displayName(r)}</div>
                          {r.userEmail && <div className="text-sm text-gray-500">{r.userEmail}</div>}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {r.campaignName} ({r.projectId}-{r.campaignIndex})
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              r.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : r.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {r.status === "pending" ? "In attesa" : r.status === "approved" ? "Approvata" : "Rifiutata"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(r.requestedAt).toLocaleString("it-IT")}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {r.status === "pending" && (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleReviewRequest(r.id, "approve")}
                                disabled={actioningRequestId === r.id}
                                className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                              >
                                Approva
                              </button>
                              <button
                                onClick={() => handleReviewRequest(r.id, "reject")}
                                disabled={actioningRequestId === r.id}
                                className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                              >
                                Rifiuta
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
