"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type RequestStatus = "pending" | "approved" | "rejected";

type AccessRequestRow = {
  id: number;
  userId: string;
  email: string | null;
  username: string | null;
  status: RequestStatus;
  socialProvider: "x" | "instagram";
  socialUrl: string;
  socialHandle: string | null;
  professions: string[];
  cryptoLevel: "zero" | "beginner" | "intermediate" | "advanced";
  goals: string[];
  concerns: string | null;
  weeklyTime: string | null;
  previousExperience: string | null;
  adminReviewNotes: string | null;
  createdAt: string;
  submissionPosition: number;
  eligibleFirst30: boolean;
};

function levelLabel(level: AccessRequestRow["cryptoLevel"]): string {
  if (level === "zero") return "Zero";
  if (level === "beginner") return "Principiante";
  if (level === "intermediate") return "Intermedio";
  return "Avanzato";
}

export default function AdminAccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | RequestStatus>("pending");
  const [reviewNotes, setReviewNotes] = useState<Record<number, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  const loadRequests = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const query = statusFilter === "all" ? "" : `?status=${statusFilter}`;
      const res = await fetch(`/api/admin/access-requests${query}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(String(data?.error ?? "Caricamento richieste non riuscito."));
        setRequests([]);
        return;
      }
      setRequests((data?.requests as AccessRequestRow[]) ?? []);
    } catch {
      setMessage("Errore di rete durante il caricamento richieste.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const pendingCount = useMemo(
    () => requests.filter((request) => request.status === "pending").length,
    [requests],
  );

  const reviewRequest = async (id: number, action: "approve" | "reject") => {
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/access-requests/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          notes: reviewNotes[id] ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(String(data?.error ?? "Review non riuscita."));
        return;
      }
      setMessage(action === "approve" ? "Richiesta approvata." : "Richiesta rifiutata.");
      await loadRequests();
    } catch {
      setMessage("Errore di rete durante la review.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Richieste accesso beta</h1>
            <p className="mt-1 text-sm text-slate-300">
              Approva o rifiuta i partecipanti del form. I primi 30 invii hanno priorita per 10 USDC + beta access.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/beta-access"
              target="_blank"
              className="rounded-lg border border-indigo-400/35 px-3 py-2 text-sm text-indigo-100 hover:bg-indigo-500/20"
            >
              Apri form pubblico
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "pending", label: "Pending" },
            { id: "approved", label: "Approved" },
            { id: "rejected", label: "Rejected" },
            { id: "all", label: "Tutte" },
          ].map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setStatusFilter(filter.id as "all" | RequestStatus)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                statusFilter === filter.id
                  ? "border-indigo-300/60 bg-indigo-500/25 text-white"
                  : "border-indigo-500/25 bg-indigo-950/40 text-slate-200 hover:bg-indigo-800/40"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <span className="ml-2 text-xs text-slate-400">Pending visibili: {pendingCount}</span>
        </div>
      </div>

      {message ? (
        <div className="rounded-lg border border-indigo-400/25 bg-indigo-950/35 px-4 py-2 text-sm text-slate-200">{message}</div>
      ) : null}

      {loading ? (
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6 text-slate-300">Caricamento richieste...</div>
      ) : requests.length === 0 ? (
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6 text-slate-300">Nessuna richiesta trovata.</div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <article key={request.id} className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Richiesta #{request.id}</p>
                  <h3 className="text-lg font-semibold text-white">
                    {request.email ?? request.username ?? request.userId}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Posizione invio: <span className="font-medium text-white">{request.submissionPosition || "-"}</span>
                    {request.eligibleFirst30 ? (
                      <span className="ml-2 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-200">
                        Primi 30
                      </span>
                    ) : (
                      <span className="ml-2 rounded-full border border-slate-500/35 bg-slate-500/15 px-2 py-0.5 text-xs text-slate-300">
                        Waitlist
                      </span>
                    )}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    request.status === "approved"
                      ? "border-emerald-400/35 bg-emerald-500/15 text-emerald-200"
                      : request.status === "rejected"
                        ? "border-rose-400/35 bg-rose-500/15 text-rose-200"
                        : "border-amber-400/35 bg-amber-500/15 text-amber-200"
                  }`}
                >
                  {request.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/35 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Social collegato</p>
                  <a
                    href={request.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-indigo-200 hover:underline"
                  >
                    {request.socialProvider === "x" ? "X" : "Instagram"}: {request.socialHandle || request.socialUrl}
                  </a>
                </div>
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/35 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Livello crypto</p>
                  <p className="mt-1 text-sm text-slate-100">{levelLabel(request.cryptoLevel)}</p>
                </div>
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/35 p-3 md:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Professioni</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {request.professions.map((profession) => (
                      <span key={profession} className="rounded-full border border-indigo-400/35 bg-indigo-500/15 px-2 py-0.5 text-xs text-indigo-100">
                        {profession}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/35 p-3 md:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Obiettivi</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {request.goals.length === 0 ? (
                      <span className="text-sm text-slate-400">Nessun obiettivo selezionato.</span>
                    ) : (
                      request.goals.map((goal) => (
                        <span key={goal} className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-100">
                          {goal}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/35 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Tempo settimanale</p>
                  <p className="mt-1 text-sm text-slate-100">{request.weeklyTime || "Non indicato"}</p>
                </div>
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/35 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Preoccupazioni</p>
                  <p className="mt-1 text-sm text-slate-100">{request.concerns || "Nessuna nota"}</p>
                </div>
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/35 p-3 md:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Contesto utente</p>
                  <p className="mt-1 text-sm text-slate-100">{request.previousExperience || "Nessuna nota aggiuntiva"}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                <input
                  value={reviewNotes[request.id] ?? ""}
                  onChange={(e) =>
                    setReviewNotes((prev) => ({
                      ...prev,
                      [request.id]: e.target.value,
                    }))
                  }
                  placeholder="Nota admin (opzionale)"
                  className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => reviewRequest(request.id, "approve")}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Approva
                </button>
                <button
                  type="button"
                  onClick={() => reviewRequest(request.id, "reject")}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500"
                >
                  Rifiuta
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
