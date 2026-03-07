import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { readHacksScamsAlerts, writeHacksScamsAlerts } from "@/lib/hacks-scams-storage";
import type { HacksScamsAlert } from "@/lib/hacks-scams-alerts";

const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",
  "admin@imparodefi.com",
  "cofounder@imparodefi.com",
  "lordbaconf@gmail.com",
];

async function checkAdmin() {
  try {
    const hasValidClerkKeys = Boolean(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
        process.env.CLERK_SECRET_KEY &&
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
        process.env.CLERK_SECRET_KEY.startsWith("sk_"),
    );
    if (!hasValidClerkKeys && process.env.NODE_ENV !== "production") {
      return true;
    }

    const { userId } = await auth();
    if (!userId) return false;

    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    return Boolean(userEmail && ADMIN_EMAILS.includes(userEmail));
  } catch (error) {
    console.error("Errore auth admin hacks/scams:", error);
    return false;
  }
}

function sanitizeSeverity(value: unknown): HacksScamsAlert["severity"] {
  if (value === "critical" || value === "info") return value;
  return "warning";
}

export async function GET() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    const alerts = await readHacksScamsAlerts();
    return NextResponse.json({ alerts });
  } catch (error) {
    console.error("Errore GET hacks/scams alerts:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const title = String(data?.title ?? "").trim();
    const description = String(data?.description ?? "").trim();

    if (!title || !description) {
      return NextResponse.json({ error: "Titolo e descrizione sono obbligatori" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const alerts = await readHacksScamsAlerts();
    const nextOrder = Number.isFinite(Number(data?.order)) ? Number(data.order) : alerts.length + 1;

    const newAlert: HacksScamsAlert = {
      id: crypto.randomUUID(),
      title,
      description,
      severity: sanitizeSeverity(data?.severity),
      isActive: Boolean(data?.isActive ?? true),
      order: nextOrder,
      link: data?.link ? String(data.link).trim() : null,
      createdAt: now,
      updatedAt: now,
    };

    alerts.push(newAlert);
    await writeHacksScamsAlerts(alerts);

    return NextResponse.json({ alert: newAlert }, { status: 201 });
  } catch (error) {
    console.error("Errore POST hacks/scams alerts:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

