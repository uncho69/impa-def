"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { BackToHome } from "@/components/BackToHome";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";

interface Campaign {
  projectId: string;
  index: number;
  name: string;
  epochCount: number;
}

interface Epoch {
  projectId: string;
  campaignIndex: number;
  index: number;
  startDate: string;
  endDate: string;
}

export default function AddTweetPage() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const campaignId = params.campaignId as string;
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [epochs, setEpochs] = useState<Epoch[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Form state - only tweet ID needed, rest will be gathered by Snowflake
  const [tweetIdOrUrl, setTweetIdOrUrl] = useState("");

  // Extract tweet ID from URL or return the ID if it's already just an ID
  const extractTweetId = (input: string): string | null => {
    if (!input.trim()) return null;
    
    // If it's already just a number, return it
    if (/^\d+$/.test(input.trim())) {
      return input.trim();
    }
    
    // Try to extract from Twitter/X URL
    // Matches: https://x.com/username/status/1234567890 or https://twitter.com/username/status/1234567890
    const urlPattern = /(?:x\.com|twitter\.com)\/\w+\/status\/(\d+)/i;
    const match = input.match(urlPattern);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return null;
  };


  const fetchCampaignData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

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

      // Fetch campaign info (we'll need to create this endpoint or fetch from tweets endpoint)
      // For now, we'll use the campaignId directly
      const campaignData: Campaign = {
        projectId,
        index: campaignIndex,
        name: `Campaign ${campaignIndex}`,
        epochCount: 0,
      };
      setCampaign(campaignData);

      // Fetch epochs for this campaign
      // Note: We may need to create an API endpoint for this
      // For now, we'll allow manual epoch index entry
      setEpochs([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento della campagna');
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  const checkPermissions = useCallback(async () => {
    try {
      // Check if user has permission to add tweets
      const response = await fetch('/api/campaigns/' + campaignId + '/tweets', {
        method: 'GET',
      });

      if (response.status === 401) {
        setPermissionError('Non autorizzato. Devi essere loggato.');
      } else if (response.status === 403) {
        setPermissionError('Non hai i permessi necessari per aggiungere tweet. Devi avere il ruolo "participant", "moderator" o "admin".');
      }
    } catch (err) {
      console.error('Error checking permissions:', err);
    }
  }, [campaignId]);

  useEffect(() => {
    if (campaignId && isLoaded && isSignedIn) {
      fetchCampaignData();
      checkPermissions();
    } else if (campaignId && isLoaded && !isSignedIn) {
      setLoading(false);
      setError("Devi essere loggato per aggiungere un tweet");
    }
  }, [campaignId, isLoaded, isSignedIn]);

  // Get epochIndex from URL params if provided
  const getEpochIndexFromUrl = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('epochIndex');
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Extract tweet ID from URL or use the input directly
      const tweetId = extractTweetId(tweetIdOrUrl);
      
      if (!tweetId) {
        throw new Error('Inserisci un ID tweet valido o un URL Twitter/X valido');
      }

      // Get epochIndex from URL if provided
      const epochIndexFromUrl = getEpochIndexFromUrl();

      // Prepare request body - only tweet ID, Snowflake will gather the rest
      const requestBody: any = {
        postId: tweetId,
        projectId: campaign?.projectId,
        campaignIndex: campaign?.index,
      };

      // Add epoch if provided in URL (required when coming from epoch leaderboard)
      if (epochIndexFromUrl) {
        requestBody.epochIndex = parseInt(epochIndexFromUrl, 10);
      }

      const response = await fetch(`/api/campaigns/${campaignId}/tweets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nell\'aggiunta del tweet');
      }

      setSuccess(true);
      // Reset form
      setTweetIdOrUrl("");

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/campaigns/${campaignId}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nell\'invio del form');
    } finally {
      setSubmitting(false);
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
    <ClerkProtectedRoute title="Aggiungi Tweet">
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
        <div className="container-custom py-12">
          <div className="flex justify-end mb-6">
            <BackToHome />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                Aggiungi Tweet
              </h1>
              {campaign && (
                <p className="text-lg text-neutral-600">
                  Campagna: <span className="font-semibold">{campaign.name}</span> ({campaign.projectId}-{campaign.index})
                </p>
              )}
            </div>

            {permissionError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Permessi Insufficienti</h3>
                    <p className="text-red-700">{permissionError}</p>
                  </div>
                </div>
              </div>
            )}

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

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">Tweet aggiunto con successo!</h3>
                    <p className="text-green-700">Reindirizzamento in corso...</p>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-neutral-600">Caricamento dati campagna...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
                <div className="space-y-6">
                  {/* Tweet ID or URL */}
                  <div>
                    <label htmlFor="tweetIdOrUrl" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Tweet ID o URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tweetIdOrUrl"
                      name="tweetIdOrUrl"
                      value={tweetIdOrUrl}
                      onChange={(e) => setTweetIdOrUrl(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Incolla l'URL del tweet (es: https://x.com/Apple/status/1968260362257523127) o solo l'ID"
                    />
                    <p className="mt-1 text-sm text-neutral-500">
                      Incolla l'URL completo del tweet o solo l'ID.
                    </p>
                    {tweetIdOrUrl && extractTweetId(tweetIdOrUrl) && (
                      <p className="mt-2 text-sm text-green-600 font-medium">
                        ✓ ID estratto: {extractTweetId(tweetIdOrUrl)}
                      </p>
                    )}
                    {tweetIdOrUrl && !extractTweetId(tweetIdOrUrl) && (
                      <p className="mt-2 text-sm text-red-600">
                        ⚠ Formato non valido. Inserisci un URL Twitter/X o un ID numerico.
                      </p>
                    )}
                  </div>

                  {/* Campaign Info (read-only) */}
                  {campaign && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1">Project ID</label>
                        <p className="text-neutral-900 font-mono">{campaign.projectId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1">Campaign Index</label>
                        <p className="text-neutral-900">{campaign.index}</p>
                      </div>
                    </div>
                  )}

                  {/* Epoch Info if provided in URL */}
                  {getEpochIndexFromUrl() && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Epoch:</strong> {getEpochIndexFromUrl()}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={submitting || !!permissionError || !extractTweetId(tweetIdOrUrl)}
                      className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitting ? 'Invio in corso...' : 'Aggiungi Tweet'}
                    </button>
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </ClerkProtectedRoute>
  );
}

