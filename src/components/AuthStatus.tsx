"use client";
import Link from "next/link";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";

function AuthStatusClerk() {
  const { isSignedIn } = useUser();
  const { openSignIn, openSignUp } = useClerk();
  
  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => openSignIn()}
        className="btn-outline"
      >
        Accedi
      </button>
      <button 
        onClick={() => openSignUp()}
        className="btn-primary"
      >
        Registrati
      </button>
    </div>
  );
}

export function AuthStatus() {
  // Sempre usa AuthStatusClerk - le chiavi sono configurate
  return <AuthStatusClerk />;
}

