import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supportConversations, users } from '@/lib/db/schema';
import { and, desc, eq, or } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

const ALL_STATUSES = ['OPEN', 'IN_PROGRESS', 'CLOSED'] as const;
const ACTIVE_STATUSES = ['OPEN', 'IN_PROGRESS'] as const;

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId || !(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status') ?? 'ACTIVE';

    let statuses: readonly string[];
    if (statusParam === 'ACTIVE') {
      statuses = ACTIVE_STATUSES;
    } else if (statusParam === 'ALL') {
      statuses = ALL_STATUSES;
    } else if (ALL_STATUSES.includes(statusParam as any)) {
      statuses = [statusParam];
    } else {
      return NextResponse.json(
        { error: 'status non valido' },
        { status: 400 }
      );
    }

    const rows = await db
      .select({
        id: supportConversations.id,
        userId: supportConversations.userId,
        status: supportConversations.status,
        reason: supportConversations.reason,
        lastMessageAt: supportConversations.lastMessageAt,
        createdAt: supportConversations.createdAt,
        updatedAt: supportConversations.updatedAt,
        userUsername: users.username,
        userEmail: users.email,
      })
      .from(supportConversations)
      .leftJoin(users, eq(users.id, supportConversations.userId))
      .where(
        statuses.length === 1
          ? eq(supportConversations.status, statuses[0] as string)
          : or(
              eq(supportConversations.status, 'OPEN'),
              eq(supportConversations.status, 'IN_PROGRESS'),
              ...(statuses.includes('CLOSED' as any)
                ? [eq(supportConversations.status, 'CLOSED')]
                : [])
            )
      )
      .orderBy(
        desc(supportConversations.lastMessageAt),
        desc(supportConversations.createdAt)
      )
      .limit(100);

    return NextResponse.json(
      {
        conversations: rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching admin support conversations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId || !(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const conversationId = body?.conversationId as string | undefined;
    const status = body?.status as string | undefined;

    if (!conversationId || !status || !ALL_STATUSES.includes(status as any)) {
      return NextResponse.json(
        { error: 'conversationId e status validi sono obbligatori' },
        { status: 400 }
      );
    }

    const now = new Date();

    const result = await db
      .update(supportConversations)
      .set({
        status,
        updatedAt: now,
      })
      .where(and(eq(supportConversations.id, conversationId)))
      .returning();

    const updated = result[0];
    if (!updated) {
      return NextResponse.json({ error: 'Conversazione non trovata' }, { status: 404 });
    }

    return NextResponse.json(
      {
        conversation: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating admin support conversation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

