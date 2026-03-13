"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeaderboardsLayout({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  
  return (
    <div className="relative z-10">
      <div className="container-custom py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-1">
            <Link
              href="/leaderboards/global"
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                pathname === '/leaderboards/global'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-white/10'
              }`}
            >
              {t('leaderboards.global')}
            </Link>
            <Link
              href="/leaderboards/epoch"
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                pathname?.startsWith('/leaderboards/epoch')
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-white/10'
              }`}
            >
              {t('leaderboards.epoch')}
            </Link>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
}

