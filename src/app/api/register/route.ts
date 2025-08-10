import { NextResponse } from "next/server";

const ZAPIER_API_URI = process.env.ZAPIER_API_URI || "";
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

type RegisterPayload = { email?: string; token?: string };

export async function POST(request: Request) {
  const { email, token } = (await request.json()) as RegisterPayload;
  if (typeof email !== "string")
    return NextResponse.json(
      { message: "Invalid input type" },
      { status: 400 }
    );

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!regex.test(email)) {
    return NextResponse.json(
      {
        message: "Invalid email",
      },
      { status: 400 }
    );
  }

  // Verifica Turnstile token
  if (!TURNSTILE_SECRET_KEY) {
    return NextResponse.json(
      { message: "Captcha non configurato" },
      { status: 500 }
    );
  }
  if (typeof token !== "string" || token.length < 10) {
    return NextResponse.json({ message: "Captcha mancante" }, { status: 400 });
  }

  const form = new URLSearchParams();
  form.append("secret", TURNSTILE_SECRET_KEY);
  form.append("response", token);

  const cfRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  const verification = (await cfRes.json()) as { success?: boolean; "error-codes"?: string[] };
  if (!verification.success) {
    return NextResponse.json(
      { message: "Captcha non valido", errors: verification["error-codes"] },
      { status: 400 }
    );
  }

  // Facoltativo: invia il contatto a Zapier (senza OTP)
  if (ZAPIER_API_URI) {
    try {
      await fetch(ZAPIER_API_URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: { email, timestamp: Date.now() } }),
      });
    } catch {
      // ignora errori Zapier, non bloccare la registrazione
    }
  }

  return NextResponse.json({ status: "verified" });
}
