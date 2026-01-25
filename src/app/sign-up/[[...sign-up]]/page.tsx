"use client";
import { EmbeddedSignUp } from "@/components/auth/EmbeddedSignUp";
import { PageTitle } from "@/components/PageTitle";
import { MobileContainer } from "@/components/MobileContainer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignUpContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/';

  return (
    <MobileContainer>
      <PageTitle 
        description="Registrati su ImparoDeFi per accedere a tutti i contenuti esclusivi"
      >
        Crea il tuo account
      </PageTitle>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
        <EmbeddedSignUp redirectUrl={redirectUrl} />
      </div>
    </MobileContainer>
  );
}

export default function SignUpPage() {
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
      <SignUpContent />
    </Suspense>
  );
}

