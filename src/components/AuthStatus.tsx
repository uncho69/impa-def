"use client";
import Link from "next/link";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

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
    <div className="flex items-center gap-2">
      <SignInButton>
        <button className="btn-outline">Accedi</button>
      </SignInButton>
      <SignUpButton>
        <button className="btn-primary">Registrati</button>
      </SignUpButton>
    </div>
  );
}

export function AuthStatus() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/registrati?next=/manuale" className="btn-outline">
          Accedi
        </Link>
        <Link href="/registrati?next=/manuale" className="btn-primary">
          Registrati
        </Link>
      </div>
    );
  }
  return <AuthStatusClerk />;
}

