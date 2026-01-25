"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/';

  useEffect(() => {
    // Redirect to Clerk Account Portal
    const clerkUrl = `https://accounts.imparodefi.xyz/sign-in${redirectUrl !== '/' ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ''}`;
    window.location.href = clerkUrl;
  }, [redirectUrl]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
        <p className="text-neutral-600">Reindirizzamento a Clerk...</p>
      </div>
    </div>
  );
}

