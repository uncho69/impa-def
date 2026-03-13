"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { BackToHome } from "@/components/BackToHome";
import { useAppAuth } from "@/lib/auth/useAppAuth";

interface Epoch {
  projectId: string;
  campaignIndex: number;
  index: number;
  campaignName?: string;
  startDate: string;
  endDate: string;
  userCount: number;
  tweetCount: number;
  totalLikes: number;
  totalReplies: number;
  totalRetweets: number;
  totalQuotes: number;
  totalPoints: number;
  createdAt: string;
  campaignName?: string;
}

const TWITTER_ERROR_MESSAGES: Record<string, string> = {
  autorizzazione_annullata: "Hai annullato l’autorizzazione su X.",
  code_mancante: "Risposta da X non valida.",
  session_scaduta: "Sessione scaduta. Riprova a collegare X.",
  config: "Configurazione X mancante.",
  token_fallito: "Impossibile ottenere il token da X. Riprova più tardi.",
  user_me_fallito: "Impossibile leggere il profilo X.",
  id_non_trovato: "Profilo X non riconosciuto.",
};

export default function EpochLeaderboardSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { isSignedIn, isLoaded } = useAppAuth();
  const [epochs, setEpochs] = useState<Epoch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState<boolean | null>(null);
  const [twitterMessage, setTwitterMessage] = useState<string | null>(null);
  const [twitterMessageError, setTwitterMessageError] = useState(false);
  const limit = 20;

  useEffect(() => {
    fetchEpochs();
  }, [currentPage]);

  useEffect(() => {
    const connected = searchParams.get("twitter_connected");
    const err = searchParams.get("twitter_error");
    if (connected === "1") {
      setTwitterMessage("Account X collegato. I tuoi tweet potranno essere scoperti nelle campagne.");
      setTwitterMessageError(false);
      setTwitterConnected(true);
      window.history.replaceState({}, "", "/leaderboards/epoch");
    } else if (err) {
      setTwitterMessage(TWITTER_ERROR_MESSAGES[err] || err);
      setTwitterMessageError(true);
      window.history.replaceState({}, "", "/leaderboards/epoch");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetch("/api/users/twitter-status")
      .then((r) => r.json())
      .then((data) => setTwitterConnected(data.connected ?? false))
      .catch(() => setTwitterConnected(false));
  }, [isLoaded, isSignedIn]);

  const fetchEpochs = async () => {
    try {
      setLoading(true);
      setError(null);
      const offset = currentPage * limit;
      const response = await fetch(`/api/epochs?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch epochs');
      }
      
      const data = await response.json();
      setEpochs(data.epochs || []);
      setTotal(data.pagination?.total || 0);
      setHasMore(data.pagination?.hasMore || false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('it-IT').format(num);
  };

  const getEpochId = (epoch: Epoch) => {
    return `${epoch.projectId}-${epoch.campaignIndex}-${epoch.index}`;
  };

  return (
    <div className="relative z-10">
      <div className="container-custom py-8">
        <div className="flex justify-end mb-6">
          <BackToHome />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
              Campagne
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Twitter connect banner: solo se loggato e X non collegato */}
          {isSignedIn && twitterConnected === false && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-xl p-6 mb-6">
              <p className="text-amber-900 dark:text-amber-200 font-medium mb-2">
                I tuoi tweet non vengono ancora scoperti dalle campagne
              </p>
              <p className="text-amber-800 dark:text-amber-300 text-sm mb-4">
                Collega qui il tuo account X (Twitter) con il pulsante sotto: cosi la piattaforma potra
                trovare i tweet che contengono le parole chiave delle campagne e aggiornare le metriche.
              </p>
              <a
                href="/api/auth/x/connect"
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
              >
                Collega X (Twitter)
              </a>
            </div>
          )}

          {/* Success / error message after OAuth */}
          {twitterMessage && (
            <div className={`mb-6 p-4 rounded-lg border ${twitterMessageError ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-200" : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-500/30 text-green-800 dark:text-green-200"}`}>
              {twitterMessage}
            </div>
          )}

          {/* Lista Campagne */}
          <div className="bg-white dark:bg-indigo-900/25 rounded-2xl border border-slate-200 dark:border-indigo-500/20 p-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">Lista Campagne</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Caricamento campagne...</p>
              </div>
            ) : epochs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-2xl font-semibold gradient-text mb-2">
                  {t('leaderboards.comingSoon')}
                </p>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  {t('leaderboards.epochDescription')}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {epochs.map((epoch) => {
                    const epochId = getEpochId(epoch);
                    return (
                      <div
                        key={epochId}
                        onClick={() => router.push(`/leaderboards/epoch/${epochId}`)}
                        className="border border-slate-200 dark:border-indigo-500/25 rounded-lg p-4 cursor-pointer transition-colors hover:border-indigo-400 dark:hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                {(() => {
                                  const fullName = epoch.campaignName ?? `${epoch.projectId} - Campaign ${epoch.campaignIndex}`;
                                  const parts = fullName.split(' - ');
                                  return parts.length >= 2 ? parts.slice(0, 2).join(' - ') : fullName;
                                })()}
                              </h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Inizio:</span>
                                <p className="font-semibold text-slate-900 dark:text-slate-200">{formatDate(epoch.startDate)}</p>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Fine:</span>
                                <p className="font-semibold text-slate-900 dark:text-slate-200">{formatDate(epoch.endDate)}</p>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Tweet:</span>
                                <p className="font-semibold text-slate-900 dark:text-slate-200">{formatNumber(epoch.tweetCount)}</p>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Punti:</span>
                                <p className="font-semibold text-slate-900 dark:text-slate-200">{formatNumber(epoch.totalPoints)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {total > 0 && (
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-indigo-500/20">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Mostrando {currentPage * limit + 1} - {Math.min((currentPage + 1) * limit, total)} di {formatNumber(total)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="px-4 py-2 rounded-lg border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/30 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Precedente
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!hasMore}
                        className="px-4 py-2 rounded-lg border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/30 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Successivo
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

