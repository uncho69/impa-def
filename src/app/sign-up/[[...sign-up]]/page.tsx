"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppAuth } from "@/lib/auth/useAppAuth";

export default function SignUpPage({
  searchParams,
}: {
  searchParams?: { redirect_url?: string };
}) {
  const [redirectUrl, setRedirectUrl] = useState('/');
  const { login, hasPrivy } = useAppAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const url = params.get('redirect_url') || searchParams?.redirect_url || '/';
      setRedirectUrl(url);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!hasPrivy) return;
    void login({ loginMethods: ["email", "wallet"] });
  }, [hasPrivy, login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary-50 to-background py-16">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-neutral-900">Registrati</h1>
        <p className="mt-2 text-sm text-neutral-600">
          {hasPrivy ? "Apertura registrazione Privy..." : "Privy non configurato in ambiente."}
        </p>
        {hasPrivy ? (
          <button
            type="button"
            onClick={() => login({ loginMethods: ["email", "wallet"] })}
            className="mt-5 w-full rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          >
            Apri registrazione
          </button>
        ) : (
          <Link href={redirectUrl} className="mt-5 inline-flex text-primary-700 underline">
            Torna al sito
          </Link>
        )}
      </div>
    </div>
  );
}
