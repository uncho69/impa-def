"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { usePrivy } from "@privy-io/react-auth";

function PrivyAuthControls() {
  const { ready, authenticated, login, logout } = usePrivy();

  if (!ready) {
    return (
      <div className="h-9 w-20 animate-pulse rounded-lg bg-white/10" />
    );
  }

  if (!authenticated) {
    return (
      <button
        type="button"
        onClick={login}
        className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
      >
        Accedi
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
    >
      Logout
    </button>
  );
}

function ClerkAuthControls() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn && user) {
    return <UserButton afterSignOutUrl="/" />;
  }

  return (
    <SignInButton mode="modal">
      <button className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
        Accedi
      </button>
    </SignInButton>
  );
}

export function UnifiedAuthControls() {
  const hasPrivy = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim());
  if (hasPrivy) return <PrivyAuthControls />;
  return <ClerkAuthControls />;
}

