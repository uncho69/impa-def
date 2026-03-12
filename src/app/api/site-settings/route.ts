import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/site-settings";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error loading site settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
