"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { BackToHome } from "@/components/BackToHome";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";
import Link from "next/link";

interface Epoch {
  projectId: string;
  campaignIndex: number;
  index: number;
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
}

export default function EpochsPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [epochs, setEpochs] = useState<Epoch[]>([]);
  const [selectedEpoch, setSelectedEpoch] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const limit = 20;

  useEffect(() => {
    if (isLoaded) {
      fetchEpochs();
    }
  }, [isLoaded, currentPage]);

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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProtectedRoute title="Epochs">
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
        <div className="container-custom py-12">
          <div className="flex justify-end mb-6">
            <BackToHome />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                Epochs
              </h1>
            </div>

            {/* Epoch selection info */}
            {selectedEpoch && (
              <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-neutral-900">Epoch selezionato</h2>
                  <button
                    onClick={() => setSelectedEpoch(null)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-neutral-600 mb-4">
                  Vai alla classifica di questo epoch per richiedere l&apos;accesso alla campagna e partecipare con i tuoi tweet.
                </p>
                <Link
                  href={`/leaderboards/epoch/${selectedEpoch}`}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Vai alla classifica epoch
                </Link>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Epochs List */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
              <h2 className="text-2xl font-bold gradient-text mb-6">Lista Epochs</h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                  <p className="text-neutral-600">Caricamento epochs...</p>
                </div>
              ) : epochs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-600">Nessun epoch trovato.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {epochs.map((epoch) => {
                      const epochId = getEpochId(epoch);
                      const isSelected = selectedEpoch === epochId;
                      return (
                        <div
                          key={epochId}
                          onClick={() => setSelectedEpoch(isSelected ? null : epochId)}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-lg text-neutral-900">
                                  {epoch.projectId} - Campaign {epoch.campaignIndex} - Epoch {epoch.index}
                                </h3>
                                {isSelected && (
                                  <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded">
                                    Selezionato
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-neutral-500">Inizio:</span>
                                  <p className="font-semibold">{formatDate(epoch.startDate)}</p>
                                </div>
                                <div>
                                  <span className="text-neutral-500">Fine:</span>
                                  <p className="font-semibold">{formatDate(epoch.endDate)}</p>
                                </div>
                                <div>
                                  <span className="text-neutral-500">Tweet:</span>
                                  <p className="font-semibold">{formatNumber(epoch.tweetCount)}</p>
                                </div>
                                <div>
                                  <span className="text-neutral-500">Punti:</span>
                                  <p className="font-semibold">{formatNumber(epoch.totalPoints)}</p>
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
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                      <div className="text-sm text-neutral-600">
                        Mostrando {currentPage * limit + 1} - {Math.min((currentPage + 1) * limit, total)} di {formatNumber(total)}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                          disabled={currentPage === 0}
                          className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Precedente
                        </button>
                        <button
                          onClick={() => setCurrentPage(prev => prev + 1)}
                          disabled={!hasMore}
                          className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    </ClerkProtectedRoute>
  );
}

