import { NextResponse } from "next/server";

const ZAPIER_NEWSLETTER_URI = process.env.ZAPIER_NEWSLETTER_URI || "";

export async function POST(request: Request) {
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };
  if (typeof email !== "string") {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!regex.test(email)) {
    return NextResponse.json({ message: "Email non valida" }, { status: 400 });
  }

  if (ZAPIER_NEWSLETTER_URI) {
    try {
      await fetch(ZAPIER_NEWSLETTER_URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, timestamp: Date.now() }),
      });
    } catch (e) {
      // non bloccare l'utente se il provider terzo fallisce
    }
  }

  return NextResponse.json({ status: "ok" });
}


