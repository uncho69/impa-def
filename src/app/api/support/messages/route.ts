import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supportConversations, supportMessages } from '@/lib/db/schema';
import { and, asc, eq } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

async function getConversationForUser(conversationId: string, userId: string) {
  const rows = await db
    .select()
    .from(supportConversations)
    .where(eq(supportConversations.id, conversationId))
    .limit(1);

  const conversation = rows[0];
  if (!conversation) return null;

  const isOwner = conversation.userId === userId;
  const isAdmin = await canManageAdmin(userId);

  if (!isOwner && !isAdmin) {
    return 'forbidden' as const;
  }

  return { conversation, isAdmin } as const;
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId mancante' },
        { status: 400 }
      );
    }

    const convResult = await getConversationForUser(conversationId, userId);
    if (convResult === null) {
      return NextResponse.json({ error: 'Conversazione non trovata' }, { status: 404 });
    }
    if (convResult === 'forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const messages = await db
      .select()
      .from(supportMessages)
      .where(eq(supportMessages.conversationId, conversationId))
      .orderBy(asc(supportMessages.createdAt))
      .limit(500);

    return NextResponse.json(
      {
        conversation: convResult.conversation,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching support messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const conversationId = body?.conversationId as string | undefined;
    const content = body?.content as string | undefined;

    if (!conversationId || !content || !content.trim()) {
      return NextResponse.json(
        { error: 'conversationId e contenuto sono obbligatori' },
        { status: 400 }
      );
    }

    const convResult = await getConversationForUser(conversationId, userId);
    if (convResult === null) {
      return NextResponse.json({ error: 'Conversazione non trovata' }, { status: 404 });
    }
    if (convResult === 'forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { conversation, isAdmin } = convResult;
    const now = new Date();

    const [inserted] = await db
      .insert(supportMessages)
      .values({
        conversationId,
        senderType: isAdmin ? 'ADMIN' : 'USER',
        senderUserId: userId,
        content: content.trim(),
        createdAt: now,
      })
      .returning();

    const newStatus =
      isAdmin && conversation.status === 'OPEN' ? 'IN_PROGRESS' : conversation.status;

    await db
      .update(supportConversations)
      .set({
        status: newStatus,
        lastMessageAt: now,
        updatedAt: now,
        assignedAdminId: isAdmin ? userId : conversation.assignedAdminId,
      })
      .where(and(eq(supportConversations.id, conversationId)));

    return NextResponse.json(
      {
        message: inserted,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error posting support message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

