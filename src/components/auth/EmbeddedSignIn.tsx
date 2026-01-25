"use client";

import { SignIn } from "@clerk/nextjs";

interface EmbeddedSignInProps {
  redirectUrl?: string;
}

export function EmbeddedSignIn({ redirectUrl = '/' }: EmbeddedSignInProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        redirectUrl={redirectUrl}
        fallbackRedirectUrl={redirectUrl}
      />
    </div>
  );
}