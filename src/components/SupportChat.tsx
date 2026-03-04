"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SupportConversation = {
  id: string;
  userId: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | string;
  reason: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
};

type SupportMessage = {
  id: number;
  conversationId: string;
  senderType: "USER" | "ADMIN" | string;
  senderUserId: string | null;
  content: string;
  createdAt: string;
};

const REASONS = [
  { value: "ACCOUNT_ABBONAMENTO", label: "Account e abbonamento" },
  { value: "CAMPAGNE_EPOCH", label: "Campagne, epoch o leaderboard" },
  { value: "RICOMPENSE", label: "Ricompense e punti" },
  { value: "BUG_PIATTAFORMA", label: "Problemi tecnici sulla piattaforma" },
  { value: "ALTRO", label: "Altro" },
] as const;

function formatStatus(status: string): string {
  if (status === "OPEN") return "In attesa";
  if (status === "IN_PROGRESS") return "In corso";
  if (status === "CLOSED") return "Chiuso";
  return status;
}

export function SupportChat() {
  const [conversation, setConversation] = useState<SupportConversation | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const [reason, setReason] = useState<string>(REASONS[0]?.value ?? "ACCOUNT_ABBONAMENTO");
  const [firstMessage, setFirstMessage] = useState("");
  const [creating, setCreating] = useState(false);

  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const hasActiveConversation = useMemo(
    () => conversation && conversation.status !== "CLOSED",
    [conversation]
  );

  // Scroll automatico in fondo alla chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  // Carica conversazione esistente (se c'è)
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/support/conversations", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Impossibile caricare il supporto");
        }
        const data = await res.json();
        if (cancelled) return;
        setConversation(data.conversation ?? null);
        setMessages(data.messages ?? []);
        setLoadingError(null);
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setLoadingError("Impossibile caricare la chat di supporto.");
        }
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Polling messaggi quando c'è una conversazione attiva
  useEffect(() => {
    if (!conversation) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/support/messages?conversationId=${encodeURIComponent(conversation.id)}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        setMessages(data.messages ?? []);
      } catch {
        // silenzioso: non blocca l'utente
      }
    };

    // carica subito
    fetchMessages();
    // poi in polling
    pollIntervalRef.current = setInterval(fetchMessages, 5000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [conversation?.id]);

  async function handleCreateConversation(e: React.FormEvent) {
    e.preventDefault();
    if (!firstMessage.trim()) return;

    setCreating(true);
    try {
      const res = await fetch("/api/support/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          message: firstMessage.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Impossibile aprire la richiesta di supporto");
      }

      const data = await res.json();
      setConversation(data.conversation);
      setMessages((prev) => [...prev, data.message]);
      setFirstMessage("");
      setLoadingError(null);
    } catch (error) {
      console.error(error);
      setLoadingError(
        "Non siamo riusciti ad aprire la richiesta di supporto. Riprova tra qualche secondo."
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!conversation || !newMessage.trim()) return;
    const content = newMessage.trim();

    setSending(true);
    try {
      const res = await fetch("/api/support/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversation.id,
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
    } catch (error) {
      console.error(error);
      setLoadingError("Non siamo riusciti a inviare il messaggio. Riprova tra poco.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
      <h2 className="text-2xl font-bold gradient-text mb-1">Supporto live</h2>
      <p className="text-sm text-neutral-600 mb-4">
        Apri una chat con il team ImparoDeFi. Ti risponderemo direttamente qui, il prima
        possibile.
      </p>

      {loadingError && (
        <p className="text-sm text-red-600 mb-3">{loadingError}</p>
      )}

      {initialLoading ? (
        <p className="text-sm text-neutral-500">Caricamento chat di supporto…</p>
      ) : !conversation ? (
        <form onSubmit={handleCreateConversation} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Motivo della richiesta
            </label>
            <select
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Messaggio iniziale
            </label>
            <textarea
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
              placeholder="Descrivi in breve il problema o la domanda che hai."
              value={firstMessage}
              onChange={(e) => setFirstMessage(e.target.value)}
            />
          </div>
          <p className="text-xs text-neutral-500">
            Dopo l&apos;invio la tua richiesta verrà assegnata al team di supporto. Potrai
            continuare la conversazione direttamente qui.
          </p>
          <button
            type="submit"
            disabled={creating || !firstMessage.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {creating ? "Invio in corso…" : "Invia richiesta di supporto"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-neutral-700">
              <span className="font-semibold">Motivo:</span>{" "}
              {REASONS.find((r) => r.value === conversation.reason)?.label ??
                conversation.reason}
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700">
              Stato: {formatStatus(conversation.status)}
            </span>
          </div>
          <div className="text-xs text-neutral-500 mb-3">
            Il team di supporto ti risponderà qui nella chat. Puoi chiudere la pagina: al
            tuo ritorno ritroverai la conversazione.
          </div>

          <div className="flex-1 border border-neutral-200 rounded-lg p-3 mb-3 overflow-y-auto bg-neutral-50">
            {messages.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Nessun messaggio ancora. Invia il tuo primo messaggio qui sotto.
              </p>
            ) : (
              <>
                {messages.map((m) => {
                  const mine = m.senderType === "USER";
                  return (
                    <div
                      key={m.id}
                      className={`flex mb-2 ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-3 py-2 text-xs ${
                          mine
                            ? "bg-primary-600 text-white rounded-br-none"
                            : "bg-white text-neutral-900 border border-neutral-200 rounded-bl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{m.content}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {hasActiveConversation ? (
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Scrivi un messaggio…"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {sending ? "Invio…" : "Invia"}
              </button>
            </form>
          ) : (
            <p className="text-xs text-neutral-500">
              La conversazione è stata chiusa dal team di supporto. Se hai bisogno di altro,
              potrai aprire una nuova richiesta.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

