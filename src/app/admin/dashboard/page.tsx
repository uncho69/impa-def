"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ActivityItem {
  type: "campaign" | "news";
  title: string;
  description: string;
  actorUserId: string | null;
  actorUsername: string | null;
  actorEmail: string | null;
  timestamp: string;
}

function formatActor(username: string | null, email: string | null): string {
  if (username && username.trim()) return username;
  if (email) {
    const localPart = email.split("@")[0];
    return localPart || email;
  }
  return "Admin";
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [activityError, setActivityError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/admin/activity");
        if (!res.ok) {
          setActivityError("Impossibile caricare i log admin.");
          return;
        }
        const data = await res.json();
        setActivity(data.activities ?? []);
      } catch {
        setActivityError("Errore di rete durante il caricamento dei log admin.");
      }
    };
    fetchActivity();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-300">
            Benvenuto nel pannello admin di ImparoDeFi. Scegli cosa gestire qui sotto.
          </p>
        </div>
      </div>

      {/* Azioni principali */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Articoli</h2>
            <p className="text-slate-300 text-sm mb-4">
              Gestisci news e bozze. Dalla pagina Articoli puoi anche accedere alla sezione
              &quot;Cosa c&apos;è di nuovo&quot; del sito.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/news"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Vai ad Articoli
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Campagne</h2>
            <p className="text-slate-300 text-sm mb-4">
              Crea e gestisci campagne, epoch, richieste di partecipazione e refresh delle leaderboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/campaigns"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Vai a Campagne
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Gestisci progetti</h2>
            <p className="text-slate-300 text-sm mb-4">
              Lista di tutti i progetti (Bitcoin, Ethereum, Solana, Hyperliquid, Base, ecc.) con search e filtri per categoria.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/projects"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Vai a Gestisci progetti
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Supporto</h2>
            <p className="text-slate-300 text-sm mb-4">
              Gestisci le richieste di supporto degli utenti e rispondi alle chat aperte.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/support"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Vai al Supporto
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Hacks &amp; Scams Alerts</h2>
            <p className="text-slate-300 text-sm mb-4">
              Gestisci gli avvisi di sicurezza mostrati nella homepage, con stato attivo, priorità e link di approfondimento.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/hacks-scams"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Vai a Hacks &amp; Scams
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Learning &amp; Badge</h2>
            <p className="text-slate-300 text-sm mb-4">
              Configura missioni di livello, campagne speciali temporanee e reward claimabili dagli utenti.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/learning-badges"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Vai a Learning &amp; Badge
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Token in Tendenza</h2>
            <p className="text-slate-300 text-sm mb-4">
              Aggiungi o rimuovi i token progetto mostrati in homepage. I prezzi sono aggiornati ogni minuto via CoinGecko.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/trending-tokens"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Vai a Token in Tendenza
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Logs */}
      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Admin Logs</h2>
          <span className="text-xs uppercase tracking-wide text-slate-400">
            Attività amministrative
          </span>
        </div>
        {activityError && (
          <p className="text-sm text-red-300 mb-2">{activityError}</p>
        )}
        {activity.length === 0 && !activityError ? (
          <p className="text-sm text-slate-400">Nessuna attività recente.</p>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            <ul className="divide-y divide-indigo-500/20">
              {activity.map((item, idx) => (
                <li key={idx} className="py-3 flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-200">
                      <span className="font-semibold">
                        {formatActor(item.actorUsername, item.actorEmail)}
                      </span>{" "}
                      {item.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {item.type === "campaign" ? "Campagna" : "Articolo"} ·{" "}
                      {formatDateTime(item.timestamp)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
