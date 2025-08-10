"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Accedi</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/manuale" })}
          className="btn-primary w-full"
        >
          Continua con Google
        </button>
      </div>
    </div>
  );
}

