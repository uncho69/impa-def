import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';
import { PLATFORM_PROJECTS } from '@/lib/platform-projects';

export const dynamic = 'force-dynamic';

/**
 * GET: Lista progetti della piattaforma (per selezione in creazione campagna). Solo admin.
 * Restituisce tutti i progetti presenti sulla piattaforma (bitcoin, ethereum, base, hyperliquid, ...)
 * più eventuali progetti presenti solo nel DB (non cancellati).
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const dbList = await db
      .select({ id: projects.id, name: projects.name })
      .from(projects)
      .where(sql`${projects.deletedAt} IS NULL`);

    const byId = new Map(dbList.map((p) => [p.id, p]));
    const merged: { id: string; name: string }[] = [];
    const seen = new Set<string>();

    for (const p of PLATFORM_PROJECTS) {
      seen.add(p.id);
      merged.push(byId.has(p.id) ? { id: p.id, name: byId.get(p.id)!.name } : p);
    }
    for (const p of dbList) {
      if (!seen.has(p.id)) merged.push(p);
    }
    merged.sort((a, b) => a.name.localeCompare(b.name, 'it'));

    return NextResponse.json({ projects: merged }, { status: 200 });
  } catch (error) {
    console.error('Error listing projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
