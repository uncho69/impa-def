"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container-custom py-16 flex justify-center">
      <SignIn />
    </div>
  );
}


