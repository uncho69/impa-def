import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

/**
 * GET: Lista progetti della piattaforma (per selezione in creazione campagna). Solo admin.
 * Mostra tutti i progetti non cancellati, indipendentemente da isActive.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const list = await db
      .select({ id: projects.id, name: projects.name })
      .from(projects)
      .where(sql`${projects.deletedAt} IS NULL`)
      .orderBy(projects.name);

    return NextResponse.json({ projects: list }, { status: 200 });
  } catch (error) {
    console.error('Error listing projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
