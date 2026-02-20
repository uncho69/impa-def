"use client";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function AuthStatusClerk() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl="https://accounts.imparodefi.xyz/sign-in" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <a 
        href="https://accounts.imparodefi.xyz/sign-in"
        className="btn-outline"
      >
        Accedi
      </a>
      <a 
        href="https://accounts.imparodefi.xyz/sign-up"
        className="btn-primary"
      >
        Registrati
      </a>
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
