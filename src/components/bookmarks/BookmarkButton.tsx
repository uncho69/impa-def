"use client";

import { useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useBookmarks, type BookmarkItem, type BookmarkType } from "@/components/bookmarks/useBookmarks";

function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" />
    </svg>
  );
}

type Props = {
  url: string;
  title: string;
  type?: BookmarkType;
  projectId?: string;
  sectionId?: string;
  showLabel?: boolean;
  inactiveLabel?: string;
  activeLabel?: string;
  className?: string;
};

export function BookmarkButton({
  url,
  title,
  type = "page",
  projectId,
  sectionId,
  showLabel = false,
  inactiveLabel = "Salva",
  activeLabel = "Salvato",
  className = "",
}: Props) {
  const { isLoaded, isSignedIn } = useUser();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = useMemo(() => isBookmarked(url), [isBookmarked, url]);

  if (!isLoaded) return null;
  if (!isSignedIn) return null;

  const payload: BookmarkItem = {
    url,
    title,
    type,
    projectId: projectId ?? null,
    sectionId: sectionId ?? null,
  };

  return (
    <button
      type="button"
      onClick={() => void toggleBookmark(payload)}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-indigo-400/60 bg-indigo-500/25 text-indigo-100"
          : "border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
      } ${className}`}
      title={active ? "Rimuovi bookmark" : "Salva bookmark"}
      aria-label={active ? "Rimuovi bookmark" : "Salva bookmark"}
    >
      <BookmarkIcon active={active} />
      {showLabel ? (active ? activeLabel : inactiveLabel) : null}
    </button>
  );
}

