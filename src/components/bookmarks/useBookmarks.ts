"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppAuth } from "@/lib/auth/useAppAuth";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export type BookmarkType = "page" | "section" | "content";

export type BookmarkItem = {
  id?: string;
  url: string;
  title: string;
  type: BookmarkType;
  projectId?: string | null;
  sectionId?: string | null;
  createdAt?: string;
};

const LOCAL_KEY = "idf_bookmarks_local";
let sharedBookmarksCache: BookmarkItem[] | null = null;
let sharedNoDatabase = false;
let inFlightLoad: Promise<{ bookmarks: BookmarkItem[]; noDatabase: boolean }> | null = null;

function normalizeUrl(input: string): string {
  try {
    const parsed = new URL(input);
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return input.startsWith("/") ? input : `/${input}`;
  }
}

function readLocalBookmarks(): BookmarkItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalBookmarks(items: BookmarkItem[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
}

export function useBookmarks() {
  const { isLoaded, isSignedIn } = useAppAuth();
  const { ready: privyReady, authenticated, user, getAccessToken } = usePrivy();
  const { wallets } = useWallets();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [noDatabase, setNoDatabase] = useState(false);

  const getPrivyAuthHeaders = useCallback(async (): Promise<Record<string, string> | null> => {
    if (!privyReady || !authenticated) return null;
    const token = await getAccessToken().catch(() => null);
    if (!token) return null;
    return {
      Authorization: `Bearer ${token}`,
      "x-privy-access-token": token,
    };
  }, [authenticated, getAccessToken, privyReady]);

  const syncSessionFromPrivy = useCallback(async (): Promise<boolean> => {
    if (!privyReady || !authenticated) return false;

    const accessToken = await getAccessToken().catch(() => null);
    if (!accessToken) return false;

    const walletAddress = wallets?.[0]?.address ?? null;
    const linkedAccounts = Array.isArray(user?.linkedAccounts) ? user.linkedAccounts : [];
    const emailAccount = linkedAccounts.find((account) => account?.type === "email");
    const email =
      emailAccount && "address" in emailAccount && typeof emailAccount.address === "string"
        ? emailAccount.address
        : null;
    const twitterAccount = linkedAccounts.find((account) => account?.type === "twitter_oauth") as
      | { subject?: string | null; username?: string | null }
      | undefined;

    const res = await fetch("/api/auth/privy/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken,
        walletAddress,
        email,
        twitterSubject: twitterAccount?.subject ?? null,
        twitterUsername: twitterAccount?.username ?? null,
      }),
    }).catch(() => null);

    return Boolean(res?.ok);
  }, [authenticated, getAccessToken, privyReady, user?.linkedAccounts, wallets]);

  const loadBookmarks = useCallback(async () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      sharedBookmarksCache = [];
      setBookmarks([]);
      setLoading(false);
      return;
    }

    if (sharedBookmarksCache) {
      setBookmarks(sharedBookmarksCache);
      setNoDatabase(sharedNoDatabase);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      if (!inFlightLoad) {
        inFlightLoad = (async () => {
          const res = await fetch("/api/profile/bookmarks", { cache: "no-store" });
          if (res.status === 401) {
            const synced = await syncSessionFromPrivy();
            if (!synced) return { bookmarks: [], noDatabase: false };
            const authHeaders = await getPrivyAuthHeaders();
            const retry = await fetch("/api/profile/bookmarks", {
              cache: "no-store",
              headers: authHeaders ?? undefined,
            });
            if (retry.status === 401) return { bookmarks: [], noDatabase: false };
            const retryData = await retry.json().catch(() => ({}));
            if (!retry.ok) return { bookmarks: [], noDatabase: false };
            if (retryData?.noDatabase) return { bookmarks: readLocalBookmarks(), noDatabase: true };
            return {
              bookmarks: Array.isArray(retryData?.bookmarks) ? retryData.bookmarks : [],
              noDatabase: false,
            };
          }
          const data = await res.json().catch(() => ({}));
          if (!res.ok) return { bookmarks: [], noDatabase: false };
          if (data?.noDatabase) return { bookmarks: readLocalBookmarks(), noDatabase: true };
          return {
            bookmarks: Array.isArray(data?.bookmarks) ? data.bookmarks : [],
            noDatabase: false,
          };
        })();
      }
      const result = await inFlightLoad;
      sharedBookmarksCache = result.bookmarks;
      sharedNoDatabase = result.noDatabase;
      setNoDatabase(result.noDatabase);
      setBookmarks(result.bookmarks);
    } finally {
      inFlightLoad = null;
      setLoading(false);
    }
  }, [getPrivyAuthHeaders, isLoaded, isSignedIn, syncSessionFromPrivy]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const bookmarkedUrls = useMemo(
    () => new Set(bookmarks.map((item) => normalizeUrl(item.url))),
    [bookmarks],
  );

  const isBookmarked = useCallback(
    (url: string) => bookmarkedUrls.has(normalizeUrl(url)),
    [bookmarkedUrls],
  );

  const addBookmark = useCallback(
    async (item: BookmarkItem) => {
      const normalized = normalizeUrl(item.url);
      if (!normalized || !item.title.trim()) return;

      if (noDatabase) {
        const next = [item, ...bookmarks.filter((b) => normalizeUrl(b.url) !== normalized)];
        sharedBookmarksCache = next;
        sharedNoDatabase = true;
        setBookmarks(next);
        writeLocalBookmarks(next);
        return;
      }

      let res = await fetch("/api/profile/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, url: normalized }),
      });
      if (res.status === 401) {
        const synced = await syncSessionFromPrivy();
        if (synced) {
          const authHeaders = await getPrivyAuthHeaders();
          res = await fetch("/api/profile/bookmarks", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(authHeaders ?? {}) },
            body: JSON.stringify({ ...item, url: normalized }),
          });
        }
      }
      const data = await res.json().catch(() => ({}));
      if (data?.noDatabase) {
        setNoDatabase(true);
        const localNext = [{ ...item, url: normalized }, ...bookmarks.filter((b) => normalizeUrl(b.url) !== normalized)];
        sharedBookmarksCache = localNext;
        sharedNoDatabase = true;
        setBookmarks(localNext);
        writeLocalBookmarks(localNext);
        return;
      }
      if (!res.ok) return;
      const created = data?.bookmark as BookmarkItem | undefined;
      if (!created) return;
      setBookmarks((prev) => {
        const next = [created, ...prev.filter((b) => normalizeUrl(b.url) !== normalized)];
        sharedBookmarksCache = next;
        sharedNoDatabase = false;
        return next;
      });
    },
    [bookmarks, getPrivyAuthHeaders, noDatabase, syncSessionFromPrivy],
  );

  const removeBookmark = useCallback(
    async (url: string) => {
      const normalized = normalizeUrl(url);
      if (noDatabase) {
        const next = bookmarks.filter((b) => normalizeUrl(b.url) !== normalized);
        sharedBookmarksCache = next;
        sharedNoDatabase = true;
        setBookmarks(next);
        writeLocalBookmarks(next);
        return;
      }
      let res = await fetch("/api/profile/bookmarks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      if (res.status === 401) {
        const synced = await syncSessionFromPrivy();
        if (synced) {
          const authHeaders = await getPrivyAuthHeaders();
          res = await fetch("/api/profile/bookmarks", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", ...(authHeaders ?? {}) },
            body: JSON.stringify({ url: normalized }),
          });
        }
      }
      const data = await res.json().catch(() => ({}));
      if (data?.noDatabase) {
        setNoDatabase(true);
        sharedNoDatabase = true;
      }
      if (!res.ok && !data?.ok) return;
      setBookmarks((prev) => {
        const next = prev.filter((b) => normalizeUrl(b.url) !== normalized);
        sharedBookmarksCache = next;
        return next;
      });
    },
    [bookmarks, getPrivyAuthHeaders, noDatabase, syncSessionFromPrivy],
  );

  const toggleBookmark = useCallback(
    async (item: BookmarkItem) => {
      const normalized = normalizeUrl(item.url);
      if (isBookmarked(normalized)) {
        await removeBookmark(normalized);
      } else {
        await addBookmark({ ...item, url: normalized });
      }
    },
    [addBookmark, isBookmarked, removeBookmark],
  );

  return {
    bookmarks,
    loading,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    reload: loadBookmarks,
  };
}

