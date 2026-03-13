"use client";
import Link from "next/link";
import { useAppAuth } from "@/lib/auth/useAppAuth";

export function AuthStatus() {
  const { hasPrivy, isSignedIn, login, logout } = useAppAuth();
  if (!hasPrivy) {
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
  return (
    <div className="flex items-center gap-2">
      {isSignedIn ? (
        <button type="button" onClick={logout} className="btn-outline">
          Logout
        </button>
      ) : (
        <button type="button" onClick={() => login()} className="btn-primary">
          Accedi
        </button>
      )}
    </div>
  );
}
