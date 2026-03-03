import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaigns, news, users } from '@/lib/db/schema';
import { eq, desc, sql, and } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

interface ActivityItem {
  timestamp: Date;
  actorUserId: string | null;
  actorUsername: string | null;
  actorEmail: string | null;
  type: 'campaign' | 'news';
  title: string;
  description: string;
}

/**
 * GET: Ultime azioni admin (news + campagne) per la dashboard.
 * Non è un audit log completo, solo una panoramica delle attività recenti.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Campagne: usiamo updatedAt/updatedBy per attività recenti
    const campaignRows = await db
      .select({
        name: campaigns.name,
        isActive: campaigns.isActive,
        deletedAt: campaigns.deletedAt,
        updatedAt: campaigns.updatedAt,
        actorUserId: users.id,
        actorUsername: users.username,
        actorEmail: users.email,
      })
      .from(campaigns)
      .leftJoin(users, eq(campaigns.updatedBy, users.id))
      .orderBy(desc(campaigns.updatedAt))
      .limit(10);

    const campaignActivities: ActivityItem[] = campaignRows.map((row) => {
      let description: string;
      if (row.deletedAt) {
        description = `ha eliminato la campagna "${row.name}"`;
      } else if (row.isActive === 1) {
        description = `ha aggiornato la campagna attiva "${row.name}"`;
      } else {
        description = `ha chiuso la campagna "${row.name}"`;
      }

      return {
        timestamp: row.updatedAt ?? row.deletedAt ?? new Date(),
        actorUserId: row.actorUserId ?? null,
        actorUsername: row.actorUsername ?? null,
        actorEmail: row.actorEmail ?? null,
        type: 'campaign',
        title: row.name,
        description,
      };
    });

    // News: usiamo updatedAt/authorEmail
    const newsRows = await db
      .select({
        title: news.title,
        status: news.status,
        updatedAt: news.updatedAt,
        actorUserId: users.id,
        actorUsername: users.username,
        actorEmail: news.authorEmail,
      })
      .from(news)
      .leftJoin(users, eq(users.email, news.authorEmail))
      .orderBy(desc(news.updatedAt))
      .limit(10);

    const newsActivities: ActivityItem[] = newsRows.map((row) => {
      const statusLabel =
        row.status === 'PUBLISHED'
          ? 'pubblicato'
          : row.status === 'DRAFT'
          ? 'salvato come bozza'
          : 'aggiornato';

      return {
        timestamp: row.updatedAt,
        actorUserId: row.actorUserId ?? null,
        actorUsername: row.actorUsername ?? null,
        actorEmail: row.actorEmail ?? null,
        type: 'news',
        title: row.title,
        description: `${statusLabel} l'articolo "${row.title}"`,
      };
    });

    const allActivities = [...campaignActivities, ...newsActivities]
      .filter((a) => !!a.timestamp)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);

    return NextResponse.json(
      {
        activities: allActivities.map((a) => ({
          type: a.type,
          title: a.title,
          description: a.description,
          actorUserId: a.actorUserId,
          actorUsername: a.actorUsername,
          actorEmail: a.actorEmail,
          timestamp: a.timestamp.toISOString(),
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching admin activity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

