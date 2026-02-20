"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BackToHome } from "@/components/BackToHome";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string | null;
  email: string | null;
  walletAddress: string | null;
  totalPoints: number;
  totalLikes: number;
  totalReplies: number;
  totalRetweets: number;
  totalQuotes: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
}

export default function GlobalLeaderboardPage() {
  const { t } = useLanguage();
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasCampaigns, setHasCampaigns] = useState<boolean | null>(null);
  const limit = 50;

  useEffect(() => {
    async function checkCampaigns() {
      try {
        const res = await fetch('/api/campaigns?limit=1&offset=0');
        if (!res.ok) {
          setHasCampaigns(false);
          setLoading(false);
          return;
        }
        const json = await res.json();
        const hasCampaignsValue = (json.pagination?.total ?? 0) > 0;
        setHasCampaigns(hasCampaignsValue);
        
        // If no campaigns, stop loading immediately
        if (!hasCampaignsValue) {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error checking campaigns:', err);
        setHasCampaigns(false);
        setLoading(false);
      }
    }
    checkCampaigns();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const offset = currentPage * limit;
      const response = await fetch(`/api/leaderboards/global?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      
      const result: LeaderboardResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasCampaigns === true) {
      fetchLeaderboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCampaigns, currentPage]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('it-IT').format(num);
  };

  const getDisplayName = (entry: LeaderboardEntry) => {
    return entry.username || entry.email?.split('@')[0] || entry.walletAddress?.slice(0, 8) + '...' || t('leaderboards.anonymous');
  };

  // Determine what to show
  const isLoading = hasCampaigns === null || (hasCampaigns === true && loading && !data);
  const showError = !isLoading && error && !data && hasCampaigns === true;
  const showTable = !isLoading && !showError && hasCampaigns === true && !!data;
  // Show coming soon if no campaigns (database is empty)
  const showComingSoon = hasCampaigns === false;

  return (
    <div className="w-full">
      <div className="flex justify-end mb-6">
        <BackToHome />
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6 py-2">
          {t('leaderboards.globalTitle')}
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          {t('leaderboards.globalDescription')}
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />
            <p className="text-neutral-600">{t('common.loading')}</p>
          </div>
        </div>
      )}

      {showComingSoon && (
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
          <div className="text-center py-16">
            <p className="text-2xl font-semibold gradient-text">
              {t('leaderboards.comingSoon')}
            </p>
          </div>
        </div>
      )}

      {showError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">{t('leaderboards.error')}</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t('common.retry')}
          </button>
        </div>
      )}

      {showTable && data && (
          <>
            {/* Leaderboard Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">{t('leaderboards.rank')}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">{t('leaderboards.user')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700">{t('leaderboards.points')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden md:table-cell">{t('leaderboards.likes')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden lg:table-cell">{t('leaderboards.replies')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden lg:table-cell">{t('leaderboards.retweets')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden xl:table-cell">{t('leaderboards.quotes')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {data.leaderboard.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                          {t('leaderboards.noData')}
                        </td>
                      </tr>
                    ) : (
                      data.leaderboard.map((entry) => (
                        <tr key={entry.userId} className="hover:bg-primary-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className={`text-lg font-bold ${
                                entry.rank === 1 ? 'text-yellow-500' :
                                entry.rank === 2 ? 'text-gray-400' :
                                entry.rank === 3 ? 'text-amber-600' :
                                'text-neutral-600'
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
                              <span className="font-semibold text-neutral-900">{getDisplayName(entry)}</span>
                              {entry.walletAddress && (
                                <span className="text-xs text-neutral-500 font-mono">
                                  {entry.walletAddress.slice(0, 6)}...{entry.walletAddress.slice(-4)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-bold text-primary-600 text-lg">
                              {formatNumber(entry.totalPoints)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right hidden md:table-cell">
                            <span className="text-neutral-600">{formatNumber(entry.totalLikes)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden lg:table-cell">
                            <span className="text-neutral-600">{formatNumber(entry.totalReplies)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden lg:table-cell">
                            <span className="text-neutral-600">{formatNumber(entry.totalRetweets)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden xl:table-cell">
                            <span className="text-neutral-600">{formatNumber(entry.totalQuotes)}</span>
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
              <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-neutral-200 p-6">
                <div className="text-sm text-neutral-600">
                  {t('leaderboards.showing')} {data.pagination.offset + 1} - {Math.min(data.pagination.offset + data.pagination.limit, data.pagination.total)} {t('leaderboards.of')} {formatNumber(data.pagination.total)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('common.previous')}
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={!data.pagination.hasMore}
                    className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('common.next')}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
    </div>
  );
}

