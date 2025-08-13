import { NextResponse } from "next/server";

export async function GET() {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const sk = process.env.CLERK_SECRET_KEY || "";
  const payload = {
    publishableKeyPresent: Boolean(pk),
    publishableKeyType: pk.startsWith("pk_live") ? "live" : pk.startsWith("pk_test") ? "test" : pk ? "unknown" : "missing",
    publishableKeyLen: pk.length || 0,
    secretPresent: Boolean(sk),
    secretType: sk.startsWith("sk_live") ? "live" : sk.startsWith("sk_test") ? "test" : sk ? "unknown" : "missing",
    runtime: process.env.NODE_ENV,
  } as const;
  return NextResponse.json(payload);
}


