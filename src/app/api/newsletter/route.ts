import { NextResponse } from "next/server";

const ZAPIER_API_URI = process.env.ZAPIER_API_URI || "";

type Payload = { email?: string };

export async function POST(request: Request) {
  const { email } = (await request.json()) as Payload;
  if (typeof email !== "string") {
    return NextResponse.json({ message: "Email mancante" }, { status: 400 });
  }

  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!regex.test(email)) {
    return NextResponse.json({ message: "Email non valida" }, { status: 400 });
  }

  if (ZAPIER_API_URI) {
    try {
      await fetch(ZAPIER_API_URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsletter: { email, timestamp: Date.now() } }),
      });
    } catch {
      // Non bloccare l'iscrizione per errori lato integrazione
    }
  }

  return NextResponse.json({ status: "ok" });
}


