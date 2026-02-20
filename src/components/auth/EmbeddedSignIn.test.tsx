"use client";

import { SignIn } from "@clerk/nextjs";

// Minimal test version to verify Clerk is working
export function EmbeddedSignInTest() {
  return (
    <div className="w-full max-w-md mx-auto">
      <SignIn />
    </div>
  );
}
