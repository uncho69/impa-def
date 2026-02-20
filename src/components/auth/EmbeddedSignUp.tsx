"use client";

import { SignUp } from "@clerk/nextjs";

interface EmbeddedSignUpProps {
  redirectUrl?: string;
}

export function EmbeddedSignUp({ redirectUrl = '/' }: EmbeddedSignUpProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        redirectUrl={redirectUrl}
        fallbackRedirectUrl={redirectUrl}
      />
    </div>
  );
}