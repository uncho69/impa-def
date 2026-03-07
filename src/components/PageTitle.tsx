"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface PageTitleProps {
  children: ReactNode;
  description?: string;
}

export function PageTitle({ children, description }: PageTitleProps) {
  const titleText = typeof children === "string" ? children.toLowerCase() : "";
  const newsHref = titleText.includes("airdrop")
    ? "/news/airdrops"
    : titleText.includes("defi")
      ? "/news/defi"
      : titleText.includes("crypto")
        ? "/news/general"
        : "/news";

  return (
    <div className="container-custom pt-2 pb-2">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            {children}
          </h1>
          {description && (
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/manuale"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 cursor-pointer border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>📘</span>
            <span>Manuale</span>
          </Link>
          <Link
            href={newsHref}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors"
          >
            <span>📰</span>
            <span>Notizie</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
