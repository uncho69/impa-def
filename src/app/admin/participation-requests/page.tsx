"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function AdminParticipationRequestsPage() {
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        filter === "all"
          ? "/api/admin/participation-requests"
          : `/api/admin/participation-requests?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setRequests(data.requests ?? []);
      } else {
        setRequests([]);
        setError(data?.error ?? `Errore ${res.status}: ${res.statusText}`);
      }
    } catch (e) {
      setRequests([]);
      setError(e instanceof Error ? e.message : "Errore di connessione");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleReview = async (id: number, action: "approve" | "reject") => {
    setActioningId(id);
    try {
      const res = await fetch(`/api/admin/participation-requests/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) await fetchRequests();
    } finally {
      setActioningId(null);
    }
  };

  const displayName = (r: RequestRow) =>
    r.userUsername || r.userEmail?.split("@")[0] || r.userId.slice(0, 8);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Richieste di partecipazione</h1>
          <p className="text-gray-600 mt-2">
            Approva o rifiuta le richieste degli utenti per partecipare alle campagne.
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="flex gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === f
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f === "pending" ? "In attesa" : f === "approved" ? "Approvate" : f === "rejected" ? "Rifiutate" : "Tutte"}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
          <p className="font-medium">Impossibile caricare le richieste</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">Assicurati di avere il ruolo admin/moderator in database oppure imposta la variabile ADMIN_EMAILS (email separate da virgola) in Vercel.</p>
          <button
            onClick={() => { setError(null); fetchRequests(); }}
            className="mt-3 text-sm font-medium text-amber-700 underline"
          >
            Riprova
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Caricamento...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Utente</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Campagna</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stato</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data richiesta</th>
                {filter === "all" && (
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Revisione</th>
                )}
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={filter === "all" ? 6 : 5} className="px-4 py-8 text-center text-gray-500">
                    Nessuna richiesta trovata.
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{displayName(r)}</div>
                      {r.userEmail && (
                        <div className="text-sm text-gray-500">{r.userEmail}</div>
                      )}
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
                    {filter === "all" && (
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {r.reviewedAt
                          ? `${new Date(r.reviewedAt).toLocaleString("it-IT")}${r.reviewedBy ? ` (${r.reviewedBy})` : ""}`
                          : "-"}
                      </td>
                    )}
                    <td className="px-4 py-3 text-right">
                      {r.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleReview(r.id, "approve")}
                            disabled={actioningId === r.id}
                            className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                          >
                            Approva
                          </button>
                          <button
                            onClick={() => handleReview(r.id, "reject")}
                            disabled={actioningId === r.id}
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
    </div>
  );
}
