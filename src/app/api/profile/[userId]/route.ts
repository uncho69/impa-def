import { NextRequest, NextResponse } from "next/server";
import { pool, hasDatabase } from "@/lib/db";
import { ensureUserProfileSettingsTable } from "@/lib/db/ensure-user-profile-settings-table";

export const dynamic = "force-dynamic";

type WalletVisibilityColumn = "show_wallet_address_public" | "show_wallet_address_pub";

async function resolveWalletVisibilityColumn(): Promise<WalletVisibilityColumn | null> {
  if (!pool) return null;
  try {
    const result = await pool.query(
      `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'user_profile_settings'
        AND column_name IN ('show_wallet_address_public', 'show_wallet_address_pub')
      `
    );
    const columns = new Set(result.rows.map((row) => String(row.column_name)));
    if (columns.has("show_wallet_address_public")) return "show_wallet_address_public";
    if (columns.has("show_wallet_address_pub")) return "show_wallet_address_pub";
    return null;
  } catch {
    return null;
  }
}

function parseWalletAddresses(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((v) => (typeof v === "string" ? v.trim().toLowerCase() : ""))
      .filter((v) => v.length > 0 && v.length <= 255)
      .slice(0, 20);
  } catch {
    return [];
  }
}

function buildPublicFallbackProfilePayload(userId: string, message?: string) {
  return {
    degraded: true,
    degradedReason: message ?? null,
    profile: {
      userId,
      username: userId || "utente",
      xProfileUrl: null,
      instagramUrl: null,
      tiktokUrl: null,
      youtubeUrl: null,
      walletAddress: null,
      walletAddresses: [],
      ranking: {
        globalRank: 0,
        totalPoints: 0,
        totalTweets: 0,
      },
    },
    contents: [],
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    if (!hasDatabase || !pool) {
      return NextResponse.json({
        noDatabase: true,
        profile: {
          userId,
          username: `user_${userId.slice(-6)}`,
          xProfileUrl: null,
          instagramUrl: null,
          tiktokUrl: null,
          youtubeUrl: null,
          walletAddress: null,
          walletAddresses: [],
          ranking: {
            globalRank: 0,
            totalPoints: 0,
            totalTweets: 0,
          },
        },
        contents: [],
      });
    }

    try {
      let hasProfileSettingsTable = false;
      let walletVisibilityColumn: WalletVisibilityColumn | null = null;
      try {
        hasProfileSettingsTable = await ensureUserProfileSettingsTable();
        walletVisibilityColumn = hasProfileSettingsTable ? await resolveWalletVisibilityColumn() : null;
      } catch {
        hasProfileSettingsTable = false;
        walletVisibilityColumn = null;
      }

      const userResult = await pool.query(
        hasProfileSettingsTable
          ? `
      SELECT
        u.id,
        u.username AS default_username,
        u.twitter_id,
        u.wallet_address,
        ups.wallet_addresses,
        COALESCE(ups.custom_username, u.username) AS display_username,
        ups.instagram_url,
        ups.tiktok_url,
        ups.youtube_url,
        ${walletVisibilityColumn ? `COALESCE(ups.${walletVisibilityColumn}, 0)` : "0"} AS show_wallet_address_public
      FROM users u
      LEFT JOIN user_profile_settings ups ON ups.user_id = u.id
      WHERE u.id = $1 AND u.is_active = 1 AND u.deleted_at IS NULL
      LIMIT 1
      `
          : `
      SELECT
        u.id,
        u.username AS default_username,
        u.twitter_id,
        u.wallet_address,
        '[]'::text AS wallet_addresses,
        u.username AS display_username,
        NULL::varchar AS instagram_url,
        NULL::varchar AS tiktok_url,
        NULL::varchar AS youtube_url,
        0 AS show_wallet_address_public
      FROM users u
      WHERE u.id = $1 AND u.is_active = 1 AND u.deleted_at IS NULL
      LIMIT 1
      `,
        [userId]
      );
      if (userResult.rows.length === 0) {
        return NextResponse.json({ error: "Profilo non trovato" }, { status: 404 });
      }

      const user = userResult.rows[0];

      const rankResult = await pool.query(
        `
      WITH totals AS (
        SELECT
          user_id,
          COALESCE(SUM(points), 0) AS points,
          COALESCE(SUM(tweet_count), 0) AS tweet_count
        FROM user_epoch_scores
        WHERE is_active = 1 AND deleted_at IS NULL
        GROUP BY user_id
      ),
      me AS (
        SELECT COALESCE(points, 0) AS my_points
        FROM totals
        WHERE user_id = $1
      )
      SELECT
        (SELECT COUNT(*) FROM totals t WHERE t.points > COALESCE((SELECT my_points FROM me), 0)) + 1 AS rank,
        COALESCE((SELECT points FROM me), 0) AS total_points,
        COALESCE((SELECT tweet_count FROM totals WHERE user_id = $1), 0) AS total_tweets
      `,
        [userId]
      );

      const contentsResult = await pool.query(
        `
      SELECT
        t.id,
        t.post_id,
        t.content,
        t.project_id,
        t.campaign_index,
        t.epoch_index,
        t.likes,
        t.replies,
        t.retweets,
        t.quotes,
        t.posted_at
      FROM tweets t
      WHERE
        t.user_id = $1
        AND t.is_active = 1
        AND t.deleted_at IS NULL
      ORDER BY t.posted_at DESC NULLS LAST, t.created_at DESC
      LIMIT 100
      `,
        [userId]
      );

      const rankRow = rankResult.rows[0] || { rank: 0, total_points: 0, total_tweets: 0 };
      const displayUsername = user.display_username || `user_${user.id.slice(-6)}`;
      const xProfileUrl = user.twitter_id ? `https://x.com/i/user/${user.twitter_id}` : null;
      const walletPublic = Number(user.show_wallet_address_public) === 1;
      const walletAddresses = walletPublic ? parseWalletAddresses(user.wallet_addresses) : [];

      return NextResponse.json({
        profile: {
          userId: user.id,
          username: displayUsername,
          xProfileUrl,
          instagramUrl: user.instagram_url,
          tiktokUrl: user.tiktok_url,
          youtubeUrl: user.youtube_url,
          walletAddress: walletPublic ? user.wallet_address : null,
          walletAddresses,
          ranking: {
            globalRank: Number(rankRow.rank || 0),
            totalPoints: Number(rankRow.total_points || 0),
            totalTweets: Number(rankRow.total_tweets || 0),
          },
        },
        contents: contentsResult.rows.map((row) => ({
          id: row.id,
          postId: row.post_id,
          tweetUrl: row.post_id ? `https://x.com/i/web/status/${row.post_id}` : null,
          text: row.content,
          projectId: row.project_id,
          campaignIndex: row.campaign_index,
          epochIndex: row.epoch_index,
          likes: Number(row.likes || 0),
          replies: Number(row.replies || 0),
          retweets: Number(row.retweets || 0),
          quotes: Number(row.quotes || 0),
          postedAt: row.posted_at,
        })),
      });
    } catch (dbError) {
      console.error("Public profile degraded fallback:", dbError);
      return NextResponse.json(buildPublicFallbackProfilePayload(userId, "db_query_failed"));
    }
  } catch (error) {
    console.error("Error fetching public profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

