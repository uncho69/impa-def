/**
 * GET: Indica se l'utente corrente ha collegato un account X (Twitter) con token valido
 * per la scoperta tweet. Usato dalla UI per mostrare/nascondere "Collega X".
 */
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { db } from '@/lib/db';
import { authAccounts } from '@/lib/db/schema';
import { eq, and, isNotNull, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ connected: false }, { status: 200 });
  }

  const row = await db
    .select({ id: authAccounts.id })
    .from(authAccounts)
    .where(
      and(
        eq(authAccounts.userId, userId),
        eq(authAccounts.provider, 'twitter'),
        eq(authAccounts.isActive, 1),
        isNotNull(authAccounts.accessToken),
        sql`${authAccounts.accessToken} != ''`
      )
    )
    .limit(1);

  return NextResponse.json({ connected: row.length > 0 }, { status: 200 });
}
