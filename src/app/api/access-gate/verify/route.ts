import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_GATE_COOKIE_NAME,
  ACCESS_GATE_SESSION_HOURS,
  createSessionFromPassword,
} from "@/lib/access-gate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password.trim()) {
      return NextResponse.json({ ok: false, error: "Password richiesta" }, { status: 400 });
    }

    const session = await createSessionFromPassword(password);
    if (!session) {
      return NextResponse.json({ ok: false, error: "Password non valida o gia usata" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: ACCESS_GATE_COOKIE_NAME,
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_GATE_SESSION_HOURS * 60 * 60,
      expires: session.expiresAt,
    });
    return response;
  } catch (error) {
    console.error("Error verifying access gate password:", error);
    return NextResponse.json({ ok: false, error: "Errore interno" }, { status: 500 });
  }
}

