import { NextResponse } from "next/server";
import { readHacksScamsAlerts } from "@/lib/hacks-scams-storage";
import { toPublicAlert } from "@/lib/hacks-scams-alerts";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const alerts = await readHacksScamsAlerts();
    const active = alerts.filter((item) => item.isActive).map(toPublicAlert);
    return NextResponse.json({ alerts: active });
  } catch (error) {
    console.error("Error loading hacks/scams alerts:", error);
    return NextResponse.json({ error: "Errore nel caricamento alert" }, { status: 500 });
  }
}

