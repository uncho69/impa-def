"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { BackToHome } from "@/components/BackToHome";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";
import Link from "next/link";

interface Campaign {
  projectId: string;
  index: number;
  name: string;
  epochCount: number;
  epochSize: number;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

interface Tweet {
  postId: string;
  content: string | null;
  likes: number;
  replies: number;
  retweets: number;
  quotes: number;
  postedAt: string | null;
  createdAt: string;
}

export default function CampaignPage() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const campaignId = params.campaignId as string;
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (campaignId && isLoaded) {
      fetchCampaignData();
      fetchTweets();
    }
  }, [campaignId, isLoaded]);

  const fetchCampaignData = async () => {
    try {
      // Parse campaignId (format: projectId-campaignIndex)
      // projectId can contain hyphens, so parse from the end
      const lastDashIndex = campaignId.lastIndexOf('-');
      if (lastDashIndex === -1) {
        throw new Error('Formato campaignId non valido. Atteso: projectId-campaignIndex');
      }

      const campaignIndex = parseInt(campaignId.substring(lastDashIndex + 1), 10);
      const projectId = campaignId.substring(0, lastDashIndex);
      
      if (isNaN(campaignIndex)) {
        throw new Error('Formato campaignId non valido. campaignIndex deve essere un numero');
      }

      // For now, create a mock campaign - in production, fetch from API
      const campaignData: Campaign = {
        projectId,
        index: campaignIndex,
        name: `Campaign ${campaignIndex}`,
        epochCount: 0,
        epochSize: 0,
        isActive: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCampaign(campaignData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento della campagna');
    }
  };

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/campaigns/${campaignId}/tweets?limit=20`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento dei tweet');
      }
      
      const data = await response.json();
      setTweets(data.tweets || []);
    } catch (err) {
      console.error('Error fetching tweets:', err);
      setTweets([]);
    } finally {
      setLoading(false);
    }
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
    <ClerkProtectedRoute title="Campagna">
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
        <div className="container-custom py-12">
          <div className="flex justify-end mb-6">
            <BackToHome />
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                    {campaign?.name || `Campaign ${campaignId}`}
                  </h1>
                  {campaign && (
                    <p className="text-lg text-neutral-600">
                      {campaign.projectId}-{campaign.index}
                    </p>
                  )}
                </div>
                {isSignedIn && (
                  <p className="text-sm text-neutral-600">
                    Per partecipare, vai alla classifica di un epoch e richiedi l&apos;accesso alla campagna.
                  </p>
                )}
              </div>

              {campaign && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Epoch Count</p>
                    <p className="text-2xl font-bold text-neutral-900">{campaign.epochCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Epoch Size</p>
                    <p className="text-2xl font-bold text-neutral-900">{campaign.epochSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Status</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {campaign.isActive === 1 ? 'Attiva' : 'Inattiva'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Tweets List */}
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
              <h2 className="text-2xl font-bold gradient-text mb-6">Tweet</h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                  <p className="text-neutral-600">Caricamento tweet...</p>
                </div>
              ) : tweets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-600 mb-4">Nessun tweet ancora in questa campagna. Richiedi l&apos;accesso dalla pagina classifica dell&apos;epoch.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tweets.map((tweet) => (
                    <div
                      key={tweet.postId}
                      className="border border-neutral-200 rounded-lg p-6 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {tweet.content && (
                            <p className="text-neutral-900 mb-3">{tweet.content}</p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-neutral-600">
                            <span>Post ID: {tweet.postId}</span>
                            {tweet.postedAt && (
                              <span>
                                {new Date(tweet.postedAt).toLocaleDateString('it-IT')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 pt-4 border-t border-neutral-200">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-600">❤️</span>
                          <span className="font-semibold">{tweet.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-600">💬</span>
                          <span className="font-semibold">{tweet.replies}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-600">🔄</span>
                          <span className="font-semibold">{tweet.retweets}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-600">💭</span>
                          <span className="font-semibold">{tweet.quotes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClerkProtectedRoute>
  );
}

