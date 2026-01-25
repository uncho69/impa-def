"use client";
import { EmbeddedSignIn } from "@/components/auth/EmbeddedSignIn";
import { PageTitle } from "@/components/PageTitle";
import { MobileContainer } from "@/components/MobileContainer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/';

  return (
    <MobileContainer>
      <PageTitle 
        description="Inserisci le tue credenziali per accedere alla piattaforma ImparoDeFi"
      >
        Accedi al tuo account
      </PageTitle>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
        <EmbeddedSignIn redirectUrl={redirectUrl} />
      </div>
    </MobileContainer>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <MobileContainer>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
            <div className="h-12 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </MobileContainer>
    }>
      <SignInContent />
    </Suspense>
  );
}

