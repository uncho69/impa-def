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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
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

    const alerts = await readHacksScamsAlerts();
    const idx = alerts.findIndex((item) => item.id === params.id);
    if (idx < 0) {
      return NextResponse.json({ error: "Alert non trovato" }, { status: 404 });
    }

    const updated: HacksScamsAlert = {
      ...alerts[idx],
      title,
      description,
      severity: sanitizeSeverity(data?.severity),
      isActive: Boolean(data?.isActive),
      order: Number.isFinite(Number(data?.order)) ? Number(data.order) : alerts[idx].order,
      link: data?.link ? String(data.link).trim() : null,
      updatedAt: new Date().toISOString(),
    };

    alerts[idx] = updated;
    await writeHacksScamsAlerts(alerts);

    return NextResponse.json({ alert: updated });
  } catch (error) {
    console.error("Errore PUT hacks/scams alerts:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    const alerts = await readHacksScamsAlerts();
    const next = alerts.filter((item) => item.id !== params.id);
    if (next.length === alerts.length) {
      return NextResponse.json({ error: "Alert non trovato" }, { status: 404 });
    }

    await writeHacksScamsAlerts(next);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore DELETE hacks/scams alerts:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

