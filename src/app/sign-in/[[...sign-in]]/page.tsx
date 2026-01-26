"use client";
import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { redirect_url?: string };
}) {
  const [redirectUrl, setRedirectUrl] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const url = params.get('redirect_url') || searchParams?.redirect_url || '/';
      setRedirectUrl(url);
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary-50 to-background py-16">
      <div className="w-full max-w-md">
        <SignIn 
          routing="path"
          path="/sign-in"
          redirectUrl={redirectUrl}
          appearance={{
            elements: {
              rootBox: "mx-auto",
            }
          }}
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}
