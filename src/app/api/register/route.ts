import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Registrazione gestita da Clerk" }, { status: 410 });
}
