"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { BackToHome } from "@/components/BackToHome";
import { UserPlus } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string | null;
  email: string | null;
  walletAddress: string | null;
  points: number;
  tweetCount: number;
  totalLikes: number;
  totalReplies: number;
  totalRetweets: number;
  totalQuotes: number;
}

interface EpochInfo {
  projectId: string;
  campaignIndex: number;
  epochIndex: number;
  startDate: string;
  endDate: string;
}

const isEpochOpen = (endDate: string): boolean => {
  const now = new Date();
  const epochEnd = new Date(endDate);
  return epochEnd > now;
};

interface LeaderboardResponse {
  epoch: EpochInfo;
  leaderboard: LeaderboardEntry[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
}

export default function EpochLeaderboardPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const epochId = params.epochId as string;
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [participationStatus, setParticipationStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const limit = 50;

  useEffect(() => {
    if (epochId) {
      fetchLeaderboard();
    }
  }, [epochId, currentPage]);

  useEffect(() => {
    if (!data?.epoch) return;
    if (requestStatus !== 'idle') return;
    const campaignId = `${data.epoch.projectId}-${data.epoch.campaignIndex}`;
    fetch(`/api/campaigns/${campaignId}/request-access`, { credentials: 'include' })
      .then((res) => res.json())
      .then((body) => {
        // Non sovrascrivere 'pending' con null (es. se GET non riconosce la sessione dopo il POST)
        setParticipationStatus((prev) => {
          const s = body.status ?? null;
          if (s !== null) return s;
          return prev ?? null;
        });
        if (body.status) setRequestError(null);
      })
      .catch(() => {
        // Non resettare a null se avevamo già "pending" (richiesta appena inviata)
        setParticipationStatus((prev) => prev === 'pending' ? 'pending' : null);
      });
  }, [data?.epoch?.projectId, data?.epoch?.campaignIndex, requestStatus]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const offset = currentPage * limit;
      const response = await fetch(`/api/leaderboards/epoch/${epochId}?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch leaderboard');
      }
      
      const result: LeaderboardResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('it-IT').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDisplayName = (entry: LeaderboardEntry) => {
    return entry.username || entry.email?.split('@')[0] || entry.walletAddress?.slice(0, 8) + '...' || t('leaderboards.anonymous');
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-4">{t('leaderboards.error')}</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/leaderboards/epoch')}
              className="bg-slate-200 dark:bg-indigo-900/30 text-slate-700 dark:text-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-white/10 transition-colors"
            >
              {t('leaderboards.backToSelection')}
            </button>
            <button
              onClick={fetchLeaderboard}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              {t('common.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <div className="container-custom py-8">
        <div className="flex justify-end mb-6">
          <BackToHome />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6 py-2">
            {t('leaderboards.epochTitle')}
          </h1>
          {data?.epoch && (
            <div className="bg-white dark:bg-indigo-900/25 rounded-2xl border border-slate-200 dark:border-indigo-500/20 p-6 max-w-3xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('leaderboards.project')}</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{data.epoch.projectId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('leaderboards.campaign')}</p>
                  <p className="font-semibold text-slate-900 dark:text-white">#{data.epoch.campaignIndex}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('leaderboards.epoch')}</p>
                  <p className="font-semibold text-slate-900 dark:text-white">#{data.epoch.epochIndex}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-indigo-500/20 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('leaderboards.startDate')}</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{formatDate(data.epoch.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('leaderboards.endDate')}</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{formatDate(data.epoch.endDate)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Request access to campaign */}
        {data?.epoch && (
          <div className="bg-white dark:bg-indigo-900/25 rounded-2xl border border-slate-200 dark:border-indigo-500/20 p-6 mb-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Partecipa alla campagna</h2>
            {participationStatus === 'approved' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">Hai accesso a questa campagna. I tuoi tweet con le parole chiave verranno scoperti automaticamente.</p>
              </div>
            ) : participationStatus === 'pending' ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 font-medium">Richiesta in attesa di approvazione da un amministratore.</p>
              </div>
            ) : participationStatus === 'rejected' ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">La tua richiesta è stata rifiutata. Contatta un amministratore per maggiori informazioni.</p>
              </div>
            ) : isEpochOpen(data.epoch.endDate) ? (
              <div className="space-y-2">
                {requestError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                    {requestError}
                  </div>
                )}
                <button
                  onClick={async () => {
                    setRequestStatus('loading');
                    setRequestError(null);
                    try {
                      const campaignId = `${data.epoch!.projectId}-${data.epoch!.campaignIndex}`;
                      const res = await fetch(`/api/campaigns/${campaignId}/request-access`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                      });
                      const body = await res.json().catch(() => ({}));
                      if (res.ok && (res.status === 200 || res.status === 201)) {
                        setParticipationStatus(body.status ?? 'pending');
                        setRequestError(null);
                        setRequestStatus('idle');
                      } else {
                        setRequestStatus('idle');
                        if (res.status === 401) {
                          setRequestError('Accedi con il tuo account per richiedere partecipazione.');
                        } else {
                          setRequestError(body?.error ?? 'Errore durante l\'invio della richiesta. Riprova.');
                        }
                      }
                    } catch {
                      setRequestStatus('idle');
                      setRequestError('Errore di connessione. Riprova.');
                    }
                  }}
                  disabled={requestStatus === 'loading'}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition-colors disabled:opacity-50"
                >
                  <UserPlus className="w-5 h-5" />
                  {requestStatus === 'loading' ? 'Invio...' : 'Richiedi accesso alla campagna'}
                </button>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  Questo epoch è chiuso. Non è possibile richiedere accesso.
                </p>
              </div>
            )}
          </div>
        )}

        {data && (
          <>
            {/* Leaderboard Table */}
            <div className="bg-white dark:bg-indigo-900/25 rounded-2xl border border-slate-200 dark:border-indigo-500/20 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-50 dark:bg-indigo-900/40">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">{t('leaderboards.rank')}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">{t('leaderboards.user')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">{t('leaderboards.points')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-200 hidden md:table-cell">{t('leaderboards.tweets')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-200 hidden lg:table-cell">{t('leaderboards.likes')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-200 hidden lg:table-cell">{t('leaderboards.replies')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-200 hidden xl:table-cell">{t('leaderboards.retweets')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-200 hidden xl:table-cell">{t('leaderboards.quotes')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-indigo-500/20">
                    {data.leaderboard.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                          {t('leaderboards.noData')}
                        </td>
                      </tr>
                    ) : (
                      data.leaderboard.map((entry) => (
                        <tr key={entry.userId} className="hover:bg-indigo-50/60 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className={`text-lg font-bold ${
                                entry.rank === 1 ? 'text-yellow-500' :
                                entry.rank === 2 ? 'text-gray-400' :
                                entry.rank === 3 ? 'text-amber-600' :
                                'text-slate-600 dark:text-slate-300'
                              }`}>
                                #{entry.rank}
                              </span>
                              {entry.rank <= 3 && (
                                <span className="ml-2 text-xl">
                                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-900 dark:text-white">{getDisplayName(entry)}</span>
                              {entry.walletAddress && (
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                                  {entry.walletAddress.slice(0, 6)}...{entry.walletAddress.slice(-4)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-bold text-indigo-600 dark:text-indigo-300 text-lg">
                              {formatNumber(entry.points)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right hidden md:table-cell">
                            <span className="text-slate-600 dark:text-slate-300">{formatNumber(entry.tweetCount)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden lg:table-cell">
                            <span className="text-slate-600 dark:text-slate-300">{formatNumber(entry.totalLikes)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden lg:table-cell">
                            <span className="text-slate-600 dark:text-slate-300">{formatNumber(entry.totalReplies)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden xl:table-cell">
                            <span className="text-slate-600 dark:text-slate-300">{formatNumber(entry.totalRetweets)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden xl:table-cell">
                            <span className="text-slate-600 dark:text-slate-300">{formatNumber(entry.totalQuotes)}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {data.pagination.total > 0 && (
              <div className="flex items-center justify-between bg-white dark:bg-indigo-900/25 rounded-2xl border border-slate-200 dark:border-indigo-500/20 p-6">
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {t('leaderboards.showing')} {data.pagination.offset + 1} - {Math.min(data.pagination.offset + data.pagination.limit, data.pagination.total)} {t('leaderboards.of')} {formatNumber(data.pagination.total)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/30 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('common.previous')}
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={!data.pagination.hasMore}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/30 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('common.next')}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

