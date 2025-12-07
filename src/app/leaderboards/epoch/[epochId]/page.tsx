"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { BackToHome } from "@/components/BackToHome";

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
  const limit = 50;

  useEffect(() => {
    if (epochId) {
      fetchLeaderboard();
    }
  }, [epochId, currentPage]);

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
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-4">{t('leaderboards.error')}</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/leaderboards/epoch')}
              className="bg-neutral-200 text-neutral-700 px-6 py-2 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              {t('leaderboards.backToSelection')}
            </button>
            <button
              onClick={fetchLeaderboard}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('common.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="flex justify-end mb-6">
          <BackToHome />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6 py-2">
            {t('leaderboards.epochTitle')}
          </h1>
          {data?.epoch && (
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 max-w-3xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{t('leaderboards.project')}</p>
                  <p className="font-semibold text-neutral-900">{data.epoch.projectId}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{t('leaderboards.campaign')}</p>
                  <p className="font-semibold text-neutral-900">#{data.epoch.campaignIndex}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{t('leaderboards.epoch')}</p>
                  <p className="font-semibold text-neutral-900">#{data.epoch.epochIndex}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{t('leaderboards.startDate')}</p>
                  <p className="font-semibold text-neutral-900">{formatDate(data.epoch.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{t('leaderboards.endDate')}</p>
                  <p className="font-semibold text-neutral-900">{formatDate(data.epoch.endDate)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {data && (
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
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden md:table-cell">{t('leaderboards.tweets')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden lg:table-cell">{t('leaderboards.likes')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden lg:table-cell">{t('leaderboards.replies')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden xl:table-cell">{t('leaderboards.retweets')}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700 hidden xl:table-cell">{t('leaderboards.quotes')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {data.leaderboard.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-neutral-500">
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
                              {formatNumber(entry.points)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right hidden md:table-cell">
                            <span className="text-neutral-600">{formatNumber(entry.tweetCount)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden lg:table-cell">
                            <span className="text-neutral-600">{formatNumber(entry.totalLikes)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden lg:table-cell">
                            <span className="text-neutral-600">{formatNumber(entry.totalReplies)}</span>
                          </td>
                          <td className="px-6 py-4 text-right hidden xl:table-cell">
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
    </div>
  );
}

