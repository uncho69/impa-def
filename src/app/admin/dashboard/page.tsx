"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [activityError, setActivityError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/admin/activity");
        if (!res.ok) {
          setActivityError(isEnglish ? "Unable to load admin logs." : "Impossibile caricare i log admin.");
          return;
        }
        const data = await res.json();
        setActivity(data.activities ?? []);
      } catch {
        setActivityError(isEnglish ? "Network error while loading admin logs." : "Errore di rete durante il caricamento dei log admin.");
      }
    };
    fetchActivity();
  }, [isEnglish]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-300">
            {isEnglish
              ? "Welcome to the ImparoDeFi admin panel. Choose what to manage below."
              : "Benvenuto nel pannello admin di ImparoDeFi. Scegli cosa gestire qui sotto."}
          </p>
        </div>
      </div>

      {/* Azioni principali */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{isEnglish ? "Articles" : "Articoli"}</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Manage news and drafts. From Articles you can also update the site's \"What's new\" section."
                : "Gestisci news e bozze. Dalla pagina Articoli puoi anche accedere alla sezione \"Cosa c'è di nuovo\" del sito."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/news"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Articles" : "Vai ad Articoli"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{isEnglish ? "Campaigns" : "Campagne"}</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Create and manage campaigns, epochs, participation requests, and leaderboard refreshes."
                : "Crea e gestisci campagne, epoch, richieste di partecipazione e refresh delle leaderboard."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/campaigns"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Campaigns" : "Vai a Campagne"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{isEnglish ? "Manage projects" : "Gestisci progetti"}</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "List all projects (Bitcoin, Ethereum, Solana, Hyperliquid, Base, etc.) with search and category filters."
                : "Lista di tutti i progetti (Bitcoin, Ethereum, Solana, Hyperliquid, Base, ecc.) con search e filtri per categoria."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/projects"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Manage projects" : "Vai a Gestisci progetti"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{isEnglish ? "Support" : "Supporto"}</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish ? "Manage user support requests and reply to open chats." : "Gestisci le richieste di supporto degli utenti e rispondi alle chat aperte."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/support"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Support" : "Vai al Supporto"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Hacks &amp; Scams Alerts</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Manage security alerts shown on the homepage with active state, priority, and deep links."
                : "Gestisci gli avvisi di sicurezza mostrati nella homepage, con stato attivo, priorità e link di approfondimento."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/hacks-scams"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Hacks & Scams" : "Vai a Hacks & Scams"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Learning &amp; Badge</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Configure level missions, temporary special campaigns, and user-claimable rewards."
                : "Configura missioni di livello, campagne speciali temporanee e reward claimabili dagli utenti."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/learning-badges"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Learning & Badge" : "Vai a Learning & Badge"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{isEnglish ? "Trending Tokens" : "Token in Tendenza"}</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Add or remove project tokens shown on the homepage. Prices are updated every minute via CoinGecko."
                : "Aggiungi o rimuovi i token progetto mostrati in homepage. I prezzi sono aggiornati ogni minuto via CoinGecko."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/trending-tokens"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Trending Tokens" : "Vai a Token in Tendenza"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Footer &amp; Legal</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Edit footer links and the content of Privacy Policy and Terms of Service pages."
                : "Modifica i link del footer e i contenuti delle pagine Privacy Policy e Terms of Service."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/site-settings"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Footer & Legal" : "Vai a Footer & Legal"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{isEnglish ? "Beta Access" : "Accesso Beta"}</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Review public form requests, check profession/crypto level/social data, and approve or reject users."
                : "Visualizza le richieste del form pubblico, leggi professione/livello crypto/social e approva o rifiuta gli utenti."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/access-requests"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to access requests" : "Vai a richieste accesso"}
            </Link>
            <Link
              href="/beta-access"
              target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-indigo-400/35 text-indigo-100 text-sm font-medium hover:bg-indigo-500/15 transition-colors"
            >
              {isEnglish ? "Open public form" : "Apri form pubblico"}
            </Link>
          </div>
        </div>

        <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-between backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{isEnglish ? "Password Access" : "Gestione Password"}</h2>
            <p className="text-slate-300 text-sm mb-4">
              {isEnglish
                ? "Generate one-time passwords for site access and monitor whether each password is active, used or revoked."
                : "Genera password monouso per l'accesso al sito e controlla se ogni password e attiva, usata o revocata."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/password-access"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              {isEnglish ? "Go to Password Access" : "Vai a Gestione Password"}
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Logs */}
      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Admin Logs</h2>
          <span className="text-xs uppercase tracking-wide text-slate-400">{isEnglish ? "Administrative activity" : "Attività amministrative"}</span>
        </div>
        {activityError && (
          <p className="text-sm text-red-300 mb-2">{activityError}</p>
        )}
        {activity.length === 0 && !activityError ? (
          <p className="text-sm text-slate-400">{isEnglish ? "No recent activity." : "Nessuna attività recente."}</p>
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
                      {item.type === "campaign" ? (isEnglish ? "Campaign" : "Campagna") : isEnglish ? "Article" : "Articolo"} ·{" "}
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
