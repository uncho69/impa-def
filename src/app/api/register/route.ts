import { NextResponse } from "next/server";
import { generateCode, verifyCode } from "@/lib/otp";

const ZAPIER_API_URI = process.env.ZAPIER_API_URI || "";

type RegisterPayload = { email?: string; code?: string };

export async function POST(request: Request) {
  const { email, code } = (await request.json()) as RegisterPayload;
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

  // Step 1: richiesta invio codice
  if (!code) {
    const oneTimeCode = generateCode(email);
    // Se non è configurato Zapier, abilita fallback di sviluppo
    if (!ZAPIER_API_URI) {
      return NextResponse.json({ status: "code_sent", previewCode: oneTimeCode });
    }
    try {
      const result = await fetch(ZAPIER_API_URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: { email, code: oneTimeCode, timestamp: Date.now() } }),
      });
      // Considera qualunque 2xx come successo (Zapier Catch Hook non restituisce necessariamente un JSON "status")
      if (!result.ok) {
        return NextResponse.json(
          { message: "Impossibile inviare il codice" },
          { status: 502 }
        );
      }
      return NextResponse.json({ status: "code_sent" });
    } catch {
      return NextResponse.json(
        { status: "code_sent", previewCode: oneTimeCode },
        { status: 200 }
      );
    }
  }

  // Step 2: verifica codice
  const ok = verifyCode(email, String(code));
  if (!ok) {
    return NextResponse.json({ message: "Codice non valido o scaduto" }, { status: 400 });
  }
  return NextResponse.json({ status: "verified" });
}
