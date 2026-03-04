"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AdminSupportConversation = {
  id: string;
  userId: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | string;
  reason: string;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
  assignedAdminId: string | null;
  userUsername: string | null;
  userEmail: string | null;
};

type SupportMessage = {
  id: number;
  conversationId: string;
  senderType: "USER" | "ADMIN" | string;
  senderUserId: string | null;
  content: string;
  createdAt: string;
};

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Aperte / in corso" },
  { value: "OPEN", label: "Solo aperte" },
  { value: "IN_PROGRESS", label: "Solo in corso" },
  { value: "CLOSED", label: "Chiuse" },
  { value: "ALL", label: "Tutte" },
] as const;

const REASONS_LABEL: Record<string, string> = {
  ACCOUNT_ABBONAMENTO: "Account e abbonamento",
  CAMPAGNE_EPOCH: "Campagne, epoch o leaderboard",
  RICOMPENSE: "Ricompense e punti",
  BUG_PIATTAFORMA: "Problemi tecnici sulla piattaforma",
  ALTRO: "Altro",
};

function formatStatus(status: string): string {
  if (status === "OPEN") return "In attesa";
  if (status === "IN_PROGRESS") return "In corso";
  if (status === "CLOSED") return "Chiuso";
  return status;
}

function formatUserLabel(username: string | null, email: string | null): string {
  if (username && username.trim()) return username;
  if (email) return email.split("@")[0] || email;
  return "Utente";
}

function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminSupportPage() {
  const [conversations, setConversations] = useState<AdminSupportConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);

  const [statusFilter, setStatusFilter] = useState<string>("ACTIVE");
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const selectedConversation = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId]
  );

  // Scroll automatico alla fine della chat (solo nel pannello chat, non tutta la pagina)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Carica lista conversazioni
  useEffect(() => {
    let cancelled = false;
    const loadConversations = async () => {
      setLoadingConversations(true);
      try {
        const res = await fetch(
          `/api/admin/support/conversations?status=${encodeURIComponent(statusFilter)}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error("Impossibile caricare le richieste di supporto");
        }
        const data = await res.json();
        if (cancelled) return;
        const list: AdminSupportConversation[] = data.conversations ?? [];
        setConversations(list);
        if (!selectedId && list.length > 0) {
          setSelectedId(list[0].id);
        } else if (selectedId && !list.some((c) => c.id === selectedId)) {
          setSelectedId(list[0]?.id ?? null);
        }
        setError(null);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("Impossibile caricare le richieste di supporto.");
        }
      } finally {
        if (!cancelled) setLoadingConversations(false);
      }
    };

    loadConversations();
    const interval = setInterval(loadConversations, 15000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [statusFilter, selectedId]);

  // Carica messaggi della conversazione selezionata
  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }

    let cancelled = false;
    const loadMessages = async () => {
      setLoadingMessages(true);
      try {
        const res = await fetch(
          `/api/support/messages?conversationId=${encodeURIComponent(selectedId)}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setMessages(data.messages ?? []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoadingMessages(false);
      }
    };

    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [selectedId]);

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedId || !newMessage.trim()) return;

    setSending(true);
    const content = newMessage.trim();
    try {
      const res = await fetch("/api/support/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedId,
          content,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Impossibile inviare il messaggio");
      }
      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
      setError("Impossibile inviare il messaggio di supporto.");
    } finally {
      setSending(false);
    }
  }

  async function handleChangeStatus(status: "OPEN" | "IN_PROGRESS" | "CLOSED") {
    if (!selectedId) return;
    try {
      const res = await fetch("/api/admin/support/conversations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: selectedId, status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Impossibile aggiornare lo stato");
      }
      const data = await res.json();
      const updated = data.conversation as AdminSupportConversation;
      setConversations((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, status: updated.status } : c))
      );
    } catch (err) {
      console.error(err);
      setError("Impossibile aggiornare lo stato della conversazione.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Richieste di supporto</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Gestisci le chat di supporto aperte dagli utenti. Le conversazioni aperte e in
            corso compaiono anche nel badge in alto.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-700">
            Stato:&nbsp;
            <select
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          {loadingConversations && (
            <span className="text-xs text-gray-500">Aggiornamento richieste…</span>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] gap-6 items-start">
        {/* Lista conversazioni */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Richieste</h2>
            <span className="text-xs text-gray-500">
              {conversations.length} conversazione{conversations.length !== 1 ? "i" : ""}{" "}
              trovate
            </span>
          </div>
          <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100">
            {conversations.length === 0 ? (
              <p className="text-sm text-gray-500 px-4 py-6">
                Nessuna richiesta di supporto per questo filtro.
              </p>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left px-4 py-3 flex flex-col gap-1 hover:bg-gray-50 transition-colors ${
                    selectedId === c.id ? "bg-blue-50/60" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatUserLabel(c.userUsername, c.userEmail)}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                      {formatStatus(c.status)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="text-xs text-gray-600">
                      {REASONS_LABEL[c.reason] ?? c.reason}
                    </div>
                    {c.assignedAdminId && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        In carico a: {c.assignedAdminId}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Ultimo aggiornamento: {formatShortDate(c.lastMessageAt || c.updatedAt)}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col min-h-[360px]">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Chat</h2>
              {selectedConversation && (
                <>
                  <p className="text-xs text-gray-500">
                    {formatUserLabel(
                      selectedConversation.userUsername,
                      selectedConversation.userEmail
                    )}{" "}
                    ·{" "}
                    {REASONS_LABEL[selectedConversation.reason] ??
                      selectedConversation.reason}
                  </p>
                  {selectedConversation.assignedAdminId && (
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      In carico a:{" "}
                      <span className="font-semibold">
                        {selectedConversation.assignedAdminId}
                      </span>
                    </p>
                  )}
                </>
              )}
            </div>
            {selectedConversation && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleChangeStatus("IN_PROGRESS")}
                  className="px-2 py-1 rounded-md border text-[11px] text-gray-700 hover:bg-gray-50"
                >
                  Prendi in carico
                </button>
                <button
                  type="button"
                  onClick={() => handleChangeStatus("OPEN")}
                  className="px-2 py-1 rounded-md border text-[11px] text-gray-700 hover:bg-gray-50"
                >
                  Riapri
                </button>
                <button
                  type="button"
                  onClick={() => handleChangeStatus("CLOSED")}
                  className="px-2 py-1 rounded-md border border-red-200 text-[11px] text-red-700 hover:bg-red-50"
                >
                  Chiudi
                </button>
              </div>
            )}
          </div>

          {!selectedConversation ? (
            <div className="flex-1 flex items-center justify-center px-4 py-8">
              <p className="text-sm text-gray-500">
                Seleziona una richiesta di supporto nella lista a sinistra per aprire la
                chat.
              </p>
            </div>
          ) : (
            <>
              <div
                ref={messagesContainerRef}
                className="flex-1 px-4 py-3 overflow-y-auto bg-gray-50 border-b border-gray-100"
              >
                {loadingMessages ? (
                  <p className="text-xs text-gray-500">Caricamento messaggi…</p>
                ) : messages.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    Nessun messaggio ancora in questa conversazione.
                  </p>
                ) : (
                  <>
                    {messages.map((m) => {
                      const isAdmin = m.senderType === "ADMIN";
                      return (
                        <div
                          key={m.id}
                          className={`flex mb-2 ${
                            isAdmin ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-3 py-2 text-xs ${
                              isAdmin
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">
                              {m.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="px-4 py-3 flex items-center gap-2 border-t border-gray-100 bg-white"
              >
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rispondi all'utente…"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {sending ? "Invio…" : "Invia"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

