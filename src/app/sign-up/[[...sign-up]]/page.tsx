"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="container-custom py-16 flex justify-center">
      <SignUp />
    </div>
  );
}

