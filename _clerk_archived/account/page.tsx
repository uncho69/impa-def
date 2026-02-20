"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Account() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold mb-2">Non sei loggato</h1>
          <p className="text-neutral-700">Accedi dalla pagina di registrazione per gestire l&apos;account.</p>
          <div className="mt-4">
            <Link href="/registrati" className="btn-primary">Registrati</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16">
      <SignedOut>
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold mb-2">Non sei loggato</h1>
          <p className="text-neutral-700">Accedi per gestire l&apos;account.</p>
          <div className="mt-4 flex gap-2">
            <Link href="/sign-in" className="btn-outline">Accedi</Link>
            <Link href="/sign-up" className="btn-primary">Registrati</Link>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
          <h1 className="text-2xl font-bold">Il tuo account</h1>
          <p className="text-neutral-700">Accesso attivo. Puoi uscire quando vuoi.</p>
          <div className="flex justify-end">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

