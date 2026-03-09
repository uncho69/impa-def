"use client";

import { useAppAuth } from "@/lib/auth/useAppAuth";

export function UnifiedAuthControls() {
  const { isLoaded, isSignedIn, login, logout, hasPrivy } = useAppAuth();
  if (!hasPrivy) return null;
  if (!isLoaded) {
    return <div className="h-9 w-20 animate-pulse rounded-lg bg-white/10" />;
  }

  return isSignedIn ? (
    <button
      type="button"
      onClick={logout}
      className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
    >
      Logout
    </button>
  ) : (
    <button
      type="button"
      onClick={login}
      className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
    >
      Accedi
    </button>
  );
}

