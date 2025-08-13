"use client";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function AuthStatusClerk() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/account" className="btn-outline">Account</Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }
  return (
    <Link href="/sign-in?redirect_url=/manuale" className="btn-primary">
      Manuale A-Z
    </Link>
  );
}

export function AuthStatus() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    return (
      <Link href="/registrati?next=/manuale" className="btn-primary">
        Manuale A-Z
      </Link>
    );
  }
  return <AuthStatusClerk />;
}

