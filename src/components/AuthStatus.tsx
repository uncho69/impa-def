"use client";
import Link from "next/link";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

function AuthStatusClerk() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
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
  // Sempre usa AuthStatusClerk - le chiavi sono configurate
  return <AuthStatusClerk />;
}

