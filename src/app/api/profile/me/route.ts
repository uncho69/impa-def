import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { pool, hasDatabase } from "@/lib/db";
import { ensureUserProfileSettingsTable } from "@/lib/db/ensure-user-profile-settings-table";

export const dynamic = "force-dynamic";

function sanitizeUsername(input: string | null | undefined): string | null {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if (!value) return null;
  if (value.length < 3 || value.length > 30) return null;
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return null;
  return value;
}

function sanitizeSocialUrl(input: string | null | undefined, allowedHosts: string[]): string | null {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase();
  const isAllowed = allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
  if (!isAllowed) return null;
  return url.toString();
}

function sanitizeWalletAddresses(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const cleaned = input
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter((v) => v.length > 0 && v.length <= 255)
    .map((v) => v.toLowerCase());
  return Array.from(new Set(cleaned)).slice(0, 20);
}

function parseWalletAddresses(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    return sanitizeWalletAddresses(JSON.parse(value));
  } catch {
    return [];
  }
}

function buildFallbackProfilePayload(userId: string, message?: string) {
  return {
    degraded: true,
    degradedReason: message ?? null,
    profile: {
      userId,
      email: null,
      username: `user_${userId.slice(-6)}`,
      defaultUsername: null,
      customUsername: null,
      instagramUrl: null,
      tiktokUrl: null,
      youtubeUrl: null,
      xProfileUrl: null,
      walletAddress: null,
      walletAddresses: [],
      showWalletAddressPublic: false,
      ranking: {
        globalRank: 0,
        totalPoints: 0,
        totalTweets: 0,
      },
      totals: {
        likes: 0,
        replies: 0,
        retweets: 0,
        quotes: 0,
      },
    },
    contents: [],
  };
}

async function upsertClerkAuthAccount(userId: string, clerkUserId: string): Promise<void> {
  if (!pool) return;
  await pool.query(
    `
    INSERT INTO auth_accounts (user_id, provider, provider_account_id, provider_user_id, is_active, created_at, updated_at)
    VALUES ($1, 'clerk', $2, $2, 1, now(), now())
    ON CONFLICT (provider, provider_account_id)
    DO UPDATE SET
      user_id = EXCLUDED.user_id,
      provider_user_id = EXCLUDED.provider_user_id,
      is_active = 1,
      updated_at = now()
    `,
    [userId, clerkUserId]
  );
}

async function resolveAuthenticatedUserId(): Promise<string | null> {
  // Identita canonica del profilo: Clerk userId.
  // Evita definitivamente conflitti con sessioni app/Privy residue.
  try {
    const authResult = await auth();
    const clerkUserId = authResult.userId;
    if (!clerkUserId) return null;
    if (!pool) return clerkUserId;

    await pool.query(
      `
      INSERT INTO users (id, is_active, created_at, updated_at)
      VALUES ($1, 1, now(), now())
      ON CONFLICT (id)
      DO UPDATE SET
        is_active = 1,
        deleted_at = NULL,
        updated_at = now()
      `,
      [clerkUserId]
    );
    await upsertClerkAuthAccount(clerkUserId, clerkUserId);
    return clerkUserId;
  } catch {
    return null;
  }
}

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

export async function GET() {
  try {
    const userId = await resolveAuthenticatedUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!hasDatabase || !pool) {
      return NextResponse.json({
        noDatabase: true,
        profile: {
          userId,
          email: null,
          username: `user_${userId.slice(-6)}`,
          defaultUsername: null,
          customUsername: null,
          instagramUrl: null,
          tiktokUrl: null,
          youtubeUrl: null,
          xProfileUrl: null,
          walletAddress: null,
          walletAddresses: [],
          showWalletAddressPublic: false,
          ranking: {
            globalRank: 0,
            totalPoints: 0,
            totalTweets: 0,
          },
          totals: {
            likes: 0,
            replies: 0,
            retweets: 0,
            quotes: 0,
          },
        },
        contents: [],
      });
    }

    try {
      const hasProfileSettingsTable = await ensureUserProfileSettingsTable();
      const walletVisibilityColumn = hasProfileSettingsTable ? await resolveWalletVisibilityColumn() : null;

      let userResult = await pool.query(
      hasProfileSettingsTable
        ? `
      SELECT
        u.id,
        u.email,
        u.username AS default_username,
        u.twitter_id,
        u.wallet_address,
        u.total_points,
        u.total_likes,
        u.total_replies,
        u.total_retweets,
        u.total_quotes,
        ups.custom_username,
        ups.wallet_addresses,
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
        u.email,
        u.username AS default_username,
        u.twitter_id,
        u.wallet_address,
        u.total_points,
        u.total_likes,
        u.total_replies,
        u.total_retweets,
        u.total_quotes,
        NULL::varchar AS custom_username,
        '[]'::text AS wallet_addresses,
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
        // In ambienti keyless/dev l'utente puo' essere autenticato ma non ancora creato nel DB.
        await pool.query(
        `
        INSERT INTO users (id, is_active, created_at, updated_at)
        VALUES ($1, 1, now(), now())
        ON CONFLICT (id)
        DO UPDATE SET
          is_active = 1,
          deleted_at = NULL,
          updated_at = now()
        `,
          [userId]
        );

        userResult = await pool.query(
        hasProfileSettingsTable
          ? `
        SELECT
          u.id,
          u.email,
          u.username AS default_username,
          u.twitter_id,
          u.wallet_address,
          u.total_points,
          u.total_likes,
          u.total_replies,
          u.total_retweets,
          u.total_quotes,
          ups.custom_username,
          ups.wallet_addresses,
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
          u.email,
          u.username AS default_username,
          u.twitter_id,
          u.wallet_address,
          u.total_points,
          u.total_likes,
          u.total_replies,
          u.total_retweets,
          u.total_quotes,
          NULL::varchar AS custom_username,
          '[]'::text AS wallet_addresses,
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
      }

      if (userResult.rows.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
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
        t.posted_at,
        t.is_verified
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
      const displayUsername = user.custom_username || user.default_username || `user_${user.id.slice(-6)}`;
      const xProfileUrl = user.twitter_id ? `https://x.com/i/user/${user.twitter_id}` : null;

      return NextResponse.json({
        profile: {
          userId: user.id,
          email: user.email,
          username: displayUsername,
          defaultUsername: user.default_username,
          customUsername: user.custom_username,
          instagramUrl: user.instagram_url,
          tiktokUrl: user.tiktok_url,
          youtubeUrl: user.youtube_url,
          xProfileUrl,
          walletAddress: user.wallet_address,
          walletAddresses: parseWalletAddresses(user.wallet_addresses),
          showWalletAddressPublic: Number(user.show_wallet_address_public) === 1,
          ranking: {
            globalRank: Number(rankRow.rank || 0),
            totalPoints: Number(rankRow.total_points || 0),
            totalTweets: Number(rankRow.total_tweets || 0),
          },
          totals: {
            likes: Number(user.total_likes || 0),
            replies: Number(user.total_replies || 0),
            retweets: Number(user.total_retweets || 0),
            quotes: Number(user.total_quotes || 0),
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
          isVerified: row.is_verified,
        })),
      });
    } catch (dbError) {
      console.error("Profile GET degraded fallback:", dbError);
      return NextResponse.json(buildFallbackProfilePayload(userId, "db_query_failed"));
    }
  } catch (error) {
    console.error("Error fetching profile me:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await resolveAuthenticatedUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!hasDatabase || !pool) {
      return NextResponse.json({
        ok: false,
        noDatabase: true,
        message: "Database non configurato: modifiche profilo non persistibili.",
      });
    }

    // Allinea il comportamento al GET: se l'utente non e' ancora presente nel DB
    // (casi clerk/keyless), lo creiamo/riattiviamo prima di salvare il profilo.
    await pool.query(
      `
      INSERT INTO users (id, is_active, created_at, updated_at)
      VALUES ($1, 1, now(), now())
      ON CONFLICT (id)
      DO UPDATE SET
        is_active = 1,
        deleted_at = NULL,
        updated_at = now()
      `,
      [userId]
    );

    const body = (await request.json().catch(() => ({}))) as {
      customUsername?: string | null;
      showWalletAddressPublic?: boolean;
      instagramUrl?: string | null;
      tiktokUrl?: string | null;
      youtubeUrl?: string | null;
      walletAddresses?: string[];
    };

    const hasCustomUsername = Object.prototype.hasOwnProperty.call(body, "customUsername");
    const hasWalletVisibility = Object.prototype.hasOwnProperty.call(body, "showWalletAddressPublic");
    const hasInstagram = Object.prototype.hasOwnProperty.call(body, "instagramUrl");
    const hasTikTok = Object.prototype.hasOwnProperty.call(body, "tiktokUrl");
    const hasYoutube = Object.prototype.hasOwnProperty.call(body, "youtubeUrl");
    const hasWalletAddresses = Object.prototype.hasOwnProperty.call(body, "walletAddresses");
    if (!hasCustomUsername && !hasWalletVisibility && !hasInstagram && !hasTikTok && !hasYoutube && !hasWalletAddresses) {
      return NextResponse.json({ error: "Nessun campo da aggiornare" }, { status: 400 });
    }

    const hasProfileSettingsTable = await ensureUserProfileSettingsTable();
    const walletVisibilityColumn = hasProfileSettingsTable ? await resolveWalletVisibilityColumn() : null;

    let nextCustomUsername: string | null | undefined = undefined;
    if (hasCustomUsername) {
      if (body.customUsername === null || body.customUsername === "") {
        nextCustomUsername = null;
      } else {
        const valid = sanitizeUsername(body.customUsername);
        if (!valid) {
          return NextResponse.json(
            { error: "Username non valido. Usa 3-30 caratteri: lettere, numeri o underscore." },
            { status: 400 }
          );
        }
        nextCustomUsername = valid.toLowerCase();
      }
    }

    const normalizeOptional = (value: string | null | undefined): string | null | undefined => {
      if (value === undefined) return undefined;
      if (value === null || value.trim() === "") return null;
      return value;
    };
    const instagramCandidate = normalizeOptional(body.instagramUrl);
    const tiktokCandidate = normalizeOptional(body.tiktokUrl);
    const youtubeCandidate = normalizeOptional(body.youtubeUrl);

    const finalInstagramInput =
      instagramCandidate === undefined
        ? undefined
        : instagramCandidate === null
          ? null
          : sanitizeSocialUrl(instagramCandidate, ["instagram.com"]);
    if (instagramCandidate !== undefined && instagramCandidate !== null && !finalInstagramInput) {
      return NextResponse.json({ error: "URL Instagram non valida (usa https://instagram.com/...)." }, { status: 400 });
    }
    const finalTikTokInput =
      tiktokCandidate === undefined
        ? undefined
        : tiktokCandidate === null
          ? null
          : sanitizeSocialUrl(tiktokCandidate, ["tiktok.com"]);
    if (tiktokCandidate !== undefined && tiktokCandidate !== null && !finalTikTokInput) {
      return NextResponse.json({ error: "URL TikTok non valida (usa https://tiktok.com/...)." }, { status: 400 });
    }
    const finalYoutubeInput =
      youtubeCandidate === undefined
        ? undefined
        : youtubeCandidate === null
          ? null
          : sanitizeSocialUrl(youtubeCandidate, ["youtube.com", "youtu.be"]);
    if (youtubeCandidate !== undefined && youtubeCandidate !== null && !finalYoutubeInput) {
      return NextResponse.json({ error: "URL YouTube non valida (usa https://youtube.com/...)." }, { status: 400 });
    }

    // Persistiamo sempre anche su users.username quando viene passato customUsername,
    // cosi il valore resta disponibile al refresh anche se la tabella settings e' instabile.
    if (hasCustomUsername && typeof nextCustomUsername === "string") {
      const updated = await pool.query(
        `
        UPDATE users
        SET username = $2, updated_at = now()
        WHERE id = $1 AND is_active = 1 AND deleted_at IS NULL
        `,
        [userId, nextCustomUsername]
      );
      if (!updated.rowCount) {
        return NextResponse.json({ error: "Impossibile aggiornare lo username utente." }, { status: 500 });
      }
    }

    if (!hasProfileSettingsTable || !walletVisibilityColumn) {
      // Fallback resiliente: in ambienti con tabella settings non disponibile
      // consenti almeno il salvataggio username nel campo users.username.
      if (!hasCustomUsername) {
        return NextResponse.json(
          { error: "Impostazioni profilo temporaneamente non disponibili. Riprova tra poco." },
          { status: 503 }
        );
      }

      if (nextCustomUsername === null) {
        return NextResponse.json(
          { error: "Reset username non disponibile temporaneamente. Riprova tra poco." },
          { status: 503 }
        );
      }

      return NextResponse.json({
        ok: true,
        partial: true,
        profileSettings: {
          customUsername: nextCustomUsername ?? null,
          showWalletAddressPublic: false,
          walletAddresses: [],
          instagramUrl: null,
          tiktokUrl: null,
          youtubeUrl: null,
        },
      });
    }

    const rows = await pool.query(
      `
      SELECT custom_username, ${walletVisibilityColumn} AS show_wallet_address_public, wallet_addresses, instagram_url, tiktok_url, youtube_url
      FROM user_profile_settings
      WHERE user_id = $1
      LIMIT 1
      `,
      [userId]
    );
    const current = rows.rows[0] || {
      custom_username: null,
      show_wallet_address_public: 0,
      wallet_addresses: "[]",
      instagram_url: null,
      tiktok_url: null,
      youtube_url: null,
    };
    const finalUsername =
      nextCustomUsername !== undefined ? nextCustomUsername : current.custom_username;
    const finalShowWallet =
      hasWalletVisibility ? (body.showWalletAddressPublic ? 1 : 0) : Number(current.show_wallet_address_public || 0);
    const finalInstagram =
      finalInstagramInput !== undefined ? finalInstagramInput : current.instagram_url;
    const finalTikTok =
      finalTikTokInput !== undefined ? finalTikTokInput : current.tiktok_url;
    const finalYoutube =
      finalYoutubeInput !== undefined ? finalYoutubeInput : current.youtube_url;
    const finalWalletAddresses =
      hasWalletAddresses
        ? JSON.stringify(sanitizeWalletAddresses(body.walletAddresses))
        : (typeof current.wallet_addresses === "string" ? current.wallet_addresses : "[]");

    await pool.query(
      `
      INSERT INTO user_profile_settings (
        user_id,
        custom_username,
        ${walletVisibilityColumn},
        wallet_addresses,
        instagram_url,
        tiktok_url,
        youtube_url,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, now())
      ON CONFLICT (user_id)
      DO UPDATE SET
        custom_username = EXCLUDED.custom_username,
        ${walletVisibilityColumn} = EXCLUDED.${walletVisibilityColumn},
        wallet_addresses = EXCLUDED.wallet_addresses,
        instagram_url = EXCLUDED.instagram_url,
        tiktok_url = EXCLUDED.tiktok_url,
        youtube_url = EXCLUDED.youtube_url,
        updated_at = now()
      `,
      [userId, finalUsername, finalShowWallet, finalWalletAddresses, finalInstagram, finalTikTok, finalYoutube]
    );

    return NextResponse.json({
      ok: true,
      profileSettings: {
        customUsername: finalUsername,
        showWalletAddressPublic: finalShowWallet === 1,
        walletAddresses: parseWalletAddresses(finalWalletAddresses),
        instagramUrl: finalInstagram,
        tiktokUrl: finalTikTok,
        youtubeUrl: finalYoutube,
      },
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "23505") {
      return NextResponse.json({ error: "Username gia in uso" }, { status: 409 });
    }
    console.error("Error updating profile me:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

