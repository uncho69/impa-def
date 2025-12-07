"use client";

import { ReactNode } from "react";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeaderboardsLayout({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  
  return (
    <ClerkProtectedRoute title={t('leaderboards.title')}>
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
        <div className="container-custom py-8">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
              <Link
                href="/leaderboards/global"
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  pathname === '/leaderboards/global'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {t('leaderboards.global')}
              </Link>
              <Link
                href="/leaderboards/epoch"
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  pathname?.startsWith('/leaderboards/epoch')
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {t('leaderboards.epoch')}
              </Link>
            </div>
          </div>
          
          {children}
        </div>
      </div>
    </ClerkProtectedRoute>
  );
}

