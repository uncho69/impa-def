"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="container-custom py-16 flex justify-center">
      <SignIn />
    </div>
  );
}

