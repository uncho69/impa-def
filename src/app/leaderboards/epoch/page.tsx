"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { BackToHome } from "@/components/BackToHome";

export default function EpochLeaderboardSelectionPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [epochId, setEpochId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate format: projectId-campaignIndex-epochIndex
    const parts = epochId.split('-');
    if (parts.length !== 3) {
      setError(t('leaderboards.invalidEpochFormat'));
      return;
    }

    const campaignIndex = parseInt(parts[1], 10);
    const epochIndex = parseInt(parts[2], 10);

    if (isNaN(campaignIndex) || isNaN(epochIndex)) {
      setError(t('leaderboards.invalidEpochFormat'));
      return;
    }

    router.push(`/leaderboards/epoch/${epochId}`);
  };

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
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {t('leaderboards.epochDescription')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="epochId" className="block text-sm font-semibold text-neutral-700 mb-2">
                  {t('leaderboards.epochId')}
                </label>
                <input
                  type="text"
                  id="epochId"
                  value={epochId}
                  onChange={(e) => setEpochId(e.target.value)}
                  placeholder="projectId-campaignIndex-epochIndex"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  required
                />
                <p className="mt-2 text-sm text-neutral-500">
                  {t('leaderboards.epochIdFormat')}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {t('leaderboards.viewLeaderboard')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

