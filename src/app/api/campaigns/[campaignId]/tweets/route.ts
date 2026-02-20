import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tweets, campaigns, epochs, users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canAddTweetsToCampaign } from '@/lib/auth/permissions';

export async function POST(
  request: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      console.error('Unauthorized: getUserIdFromRequest returned null');
      return NextResponse.json(
        { error: 'Unauthorized: Please sign in to add tweets' },
        { status: 401 }
      );
    }

    const canAdd = await canAddTweetsToCampaign(userId);
    if (!canAdd) {
      console.error(`Forbidden: User ${userId} does not have permission to add tweets`);
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions to add tweets. Please ensure you are registered and active.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      postId,
      content,
      twitterUserId,
      userId: tweetUserId,
      postedAt,
      likes = 0,
      replies = 0,
      retweets = 0,
      quotes = 0,
      hashtags,
      taggedUsers,
      hasImage = false,
      hasVideo = false,
      projectId,
      campaignIndex,
      epochIndex,
    } = body;

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      );
    }

    // Parse campaignId: projectId can contain hyphens, so parse from the end
    // Format: projectId-campaignIndex (campaignIndex is always a number)
    const campaignIdStr = params.campaignId;
    const lastDashIndex = campaignIdStr.lastIndexOf('-');
    
    if (lastDashIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid campaignId format. Expected: projectId-campaignIndex' },
        { status: 400 }
      );
    }

    const parsedCampaignIndex = campaignIndex || parseInt(campaignIdStr.substring(lastDashIndex + 1), 10);
    const parsedProjectId = projectId || campaignIdStr.substring(0, lastDashIndex);

    if (isNaN(parsedCampaignIndex)) {
      return NextResponse.json(
        { error: 'Invalid campaignIndex' },
        { status: 400 }
      );
    }

    const campaign = await db
      .select()
      .from(campaigns)
      .where(
        and(
          eq(campaigns.projectId, parsedProjectId),
          eq(campaigns.index, parsedCampaignIndex),
          eq(campaigns.isActive, 1)
        )
      )
      .limit(1);

    if (campaign.length === 0) {
      return NextResponse.json(
        { error: 'Campaign not found or inactive' },
        { status: 404 }
      );
    }

    if (epochIndex !== undefined && epochIndex !== null) {
      const epoch = await db
        .select()
        .from(epochs)
        .where(
          and(
            eq(epochs.projectId, parsedProjectId),
            eq(epochs.campaignIndex, parsedCampaignIndex),
            eq(epochs.index, epochIndex),
            eq(epochs.isActive, 1)
          )
        )
        .limit(1);

      if (epoch.length === 0) {
        return NextResponse.json(
          { error: 'Epoch not found or inactive' },
          { status: 404 }
        );
      }

      // Check if epoch is still open (endDate > now)
      const now = new Date();
      const epochEndDate = new Date(epoch[0].endDate);
      
      if (epochEndDate <= now) {
        return NextResponse.json(
          { error: 'Epoch is closed. You can only add tweets to open epochs.' },
          { status: 403 }
        );
      }
    }

    const existingTweet = await db
      .select()
      .from(tweets)
      .where(eq(tweets.postId, postId))
      .limit(1);

    if (existingTweet.length > 0) {
      return NextResponse.json(
        { error: 'Tweet already exists', tweet: existingTweet[0] },
        { status: 409 }
      );
    }

    // Get authenticated user's info from database
    const authenticatedUser = await db
      .select({
        id: users.id,
        twitterId: users.twitterId,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (authenticatedUser.length === 0) {
      return NextResponse.json(
        { error: 'Authenticated user not found in database' },
        { status: 404 }
      );
    }

    // Use authenticated user's ID and Twitter ID
    const finalUserId = authenticatedUser[0].id;
    const finalTwitterUserId = authenticatedUser[0].twitterId || null;

    const tweetData = {
      projectId: parsedProjectId,
      campaignIndex: parsedCampaignIndex,
      epochIndex: epochIndex !== undefined ? epochIndex : null,
      userId: finalUserId,
      twitterUserId: finalTwitterUserId,
      postId: postId,
      content: content || null,
      postedAt: postedAt ? new Date(postedAt) : null,
      likes: likes || 0,
      replies: replies || 0,
      retweets: retweets || 0,
      quotes: quotes || 0,
      hashtags: hashtags ? JSON.stringify(hashtags) : null,
      taggedUsers: taggedUsers ? JSON.stringify(taggedUsers) : null,
      hasImage: hasImage ? 1 : 0,
      hasVideo: hasVideo ? 1 : 0,
      isActive: 1,
      createdBy: userId,
      updatedBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [newTweet] = await db
      .insert(tweets)
      .values(tweetData)
      .returning();

    return NextResponse.json(
      {
        message: 'Tweet added successfully',
        tweet: newTweet,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding tweet to campaign:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    // Parse campaignId: projectId can contain hyphens, so parse from the end
    // Format: projectId-campaignIndex (campaignIndex is always a number)
    const campaignIdStr = params.campaignId;
    const lastDashIndex = campaignIdStr.lastIndexOf('-');
    
    if (lastDashIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid campaignId format. Expected: projectId-campaignIndex' },
        { status: 400 }
      );
    }

    const campaignIndex = parseInt(campaignIdStr.substring(lastDashIndex + 1), 10);
    const projectId = campaignIdStr.substring(0, lastDashIndex);

    if (isNaN(campaignIndex)) {
      return NextResponse.json(
        { error: 'Invalid campaignIndex' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const epochIndex = searchParams.get('epochIndex');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const conditions = [
      eq(tweets.projectId, projectId),
      eq(tweets.campaignIndex, campaignIndex),
      eq(tweets.isActive, 1),
    ];

    if (epochIndex !== null) {
      conditions.push(eq(tweets.epochIndex, parseInt(epochIndex, 10)));
    }

    const tweetList = await db
      .select()
      .from(tweets)
      .where(and(...conditions))
      .limit(limit)
      .offset(offset)
      .orderBy(tweets.createdAt);

    return NextResponse.json(
      {
        tweets: tweetList,
        pagination: {
          limit,
          offset,
          total: tweetList.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

