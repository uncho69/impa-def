import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, campaigns, rewards, epochs } from '@/lib/db/schema';
import { eq, and, sql, desc } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';
import { PLATFORM_PROJECTS } from '@/lib/platform-projects';

export const dynamic = 'force-dynamic';

/** Token disponibili per le reward */
export const REWARD_TOKENS = ['ETH', 'USDC', 'IDF'] as const;
/** Durate epoch consigliate (giorni) */
export const EPOCH_DURATIONS = [7, 30] as const; // 1 settimana, 1 mese

/**
 * GET: Lista tutte le campagne (admin) con progetto e rewards.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const campaignsList = await db
      .select({
        projectId: campaigns.projectId,
        index: campaigns.index,
        name: campaigns.name,
        epochCount: campaigns.epochCount,
        epochSize: campaigns.epochSize,
        isActive: campaigns.isActive,
        deletedAt: campaigns.deletedAt,
        createdAt: campaigns.createdAt,
        projectName: projects.name,
      })
      .from(campaigns)
      .innerJoin(projects, eq(campaigns.projectId, projects.id))
      .orderBy(desc(campaigns.createdAt));

    const rewardsList = await db
      .select({
        projectId: rewards.projectId,
        campaignIndex: rewards.campaignIndex,
        token: rewards.token,
        amount: rewards.amount,
      })
      .from(rewards);

    const rewardsByCampaign = new Map<string, { token: string; amount: number }[]>();
    for (const r of rewardsList) {
      const key = `${r.projectId}-${r.campaignIndex}`;
      if (!rewardsByCampaign.has(key)) rewardsByCampaign.set(key, []);
      rewardsByCampaign.get(key)!.push({ token: r.token, amount: Number(r.amount) });
    }

    const campaignsWithRewards = campaignsList.map((c) => ({
      ...c,
      campaignId: `${c.projectId}-${c.index}`,
      rewards: rewardsByCampaign.get(`${c.projectId}-${c.index}`) ?? [],
    }));

    return NextResponse.json({ campaigns: campaignsWithRewards }, { status: 200 });
  } catch (error) {
    console.error('Error listing admin campaigns:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST: Crea una nuova campagna (progetto + epoch size + rewards) e primo epoch. Solo admin.
 * Body: { projectId, epochSizeDays, rewards: [{ token: 'ETH'|'USDC'|'IDF', amount: number }] }
 * amount: per IDF = punti, per ETH/USDC = valore umano (es. 0.1 ETH, 10 USDC) convertito in unità minime.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { projectId, epochSizeDays, rewards: rewardsBody } = body as {
      projectId?: string;
      epochSizeDays?: number;
      rewards?: { token: string; amount: number }[];
    };

    if (!projectId || typeof epochSizeDays !== 'number' || epochSizeDays < 1) {
      return NextResponse.json(
        { error: 'projectId e epochSizeDays (>= 1) obbligatori' },
        { status: 400 }
      );
    }

    let project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (project.length === 0) {
      const platformEntry = PLATFORM_PROJECTS.find((p) => p.id === projectId);
      if (!platformEntry) {
        return NextResponse.json({ error: 'Progetto non trovato sulla piattaforma' }, { status: 404 });
      }
      await db.insert(projects).values({
        id: platformEntry.id,
        name: platformEntry.name,
        isActive: 1,
        campaignCount: 0,
        createdBy: userId,
        updatedBy: userId,
      });
      project = await db.select().from(projects).where(eq(projects.id, projectId)).limit(1);
    }

    if (project.length === 0 || project[0].isActive !== 1) {
      return NextResponse.json({ error: 'Progetto non attivo' }, { status: 400 });
    }

    const nextIndexResult = await db
      .select({ max: sql<number>`coalesce(max(${campaigns.index}), -1) + 1` })
      .from(campaigns)
      .where(eq(campaigns.projectId, projectId));
    const campaignIndex = Number(nextIndexResult[0]?.max ?? 0);

    const projectName = project[0].name;
    const durationLabel = epochSizeDays === 7 ? '1 settimana' : epochSizeDays === 30 ? '1 mese' : `${epochSizeDays} giorni`;
    const rewardsLabel =
      Array.isArray(rewardsBody) && rewardsBody.length > 0
        ? rewardsBody
            .map((r: { token: string; amount: number }) => `${r.amount} ${r.token}`)
            .join(', ')
        : 'Nessuna reward';
    const campaignName = `${projectName} - ${rewardsLabel} - ${durationLabel}`;

    await db.insert(campaigns).values({
      projectId,
      index: campaignIndex,
      name: campaignName,
      epochCount: 0,
      epochSize: epochSizeDays,
      isActive: 1,
      createdBy: userId,
      updatedBy: userId,
    });

    if (Array.isArray(rewardsBody) && rewardsBody.length > 0) {
      for (const r of rewardsBody) {
        if (!REWARD_TOKENS.includes(r.token as (typeof REWARD_TOKENS)[number])) continue;
        let amount: number;
        if (r.token === 'IDF') amount = Math.floor(Number(r.amount)) || 1;
        else if (r.token === 'ETH') amount = Math.floor(Number(r.amount) * 1e18) || 1;
        else if (r.token === 'USDC') amount = Math.floor(Number(r.amount) * 1e6) || 1;
        else continue;
        if (amount <= 0) continue;
        await db.insert(rewards).values({
          projectId,
          campaignIndex,
          amount,
          token: r.token,
          perEpoch: 1,
          isActive: 1,
          createdBy: userId,
          updatedBy: userId,
        });
      }
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + epochSizeDays * 24 * 60 * 60 * 1000);
    await db.insert(epochs).values({
      projectId,
      campaignIndex,
      index: 0,
      startDate,
      endDate,
      isActive: 1,
      createdBy: userId,
      updatedBy: userId,
    });

    await db
      .update(campaigns)
      .set({ epochCount: 1, updatedAt: new Date(), updatedBy: userId })
      .where(and(eq(campaigns.projectId, projectId), eq(campaigns.index, campaignIndex)));

    await db
      .update(projects)
      .set({
        campaignCount: project[0].campaignCount + 1,
        updatedAt: new Date(),
        updatedBy: userId,
      })
      .where(eq(projects.id, projectId));

    return NextResponse.json(
      {
        message: 'Campagna creata',
        campaign: { projectId, campaignIndex, name: campaignName, epochSizeDays },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
