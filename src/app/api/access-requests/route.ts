import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { ensureBetaAccessRequestsTable } from "@/lib/db/ensure-beta-access-table";
import { ensureAccessControlTables } from "@/lib/db/ensure-access-control-tables";
import { hasDatabase, pool } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CryptoLevel = "zero" | "beginner" | "intermediate" | "advanced";
type SocialProvider = "x" | "instagram";

type AccessRequestPayload = {
  contactEmail?: string;
  professions: string[];
  cryptoLevel: CryptoLevel;
  goals: string[];
  concerns?: string;
  weeklyTime?: string;
  previousExperience?: string;
  socialProvider: SocialProvider;
  socialUrl: string;
  socialHandle?: string;
};

type StoredAccessRequest = AccessRequestPayload & {
  userId: string;
  email: string | null;
  status: "pending" | "approved" | "rejected";
  reviewedAt: string | null;
  reviewedBy: string | null;
  adminReviewNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

const MEMORY_STORE_KEY = "__idfBetaAccessRequests";

function readMemoryStore(): Map<string, StoredAccessRequest> {
  const g = globalThis as Record<string, unknown>;
  if (!g[MEMORY_STORE_KEY]) {
    g[MEMORY_STORE_KEY] = new Map<string, StoredAccessRequest>();
  }
  return g[MEMORY_STORE_KEY] as Map<string, StoredAccessRequest>;
}

function sanitizeArray(value: unknown, max = 8): string[] {
  if (!Array.isArray(value)) return [];
  const cleaned = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0)
    .slice(0, max);
  return Array.from(new Set(cleaned));
}

function sanitizeText(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function normalizeEmail(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildGuestUserId(email: string): string {
  const digest = crypto.createHash("sha256").update(email).digest("hex").slice(0, 32);
  return `beta_guest_${digest}`;
}

function buildAuthFallbackUserId(seed: string): string {
  const digest = crypto.createHash("sha256").update(seed).digest("hex").slice(0, 44);
  return `auth_${digest}`;
}

async function resolveRequestUserId(authUserId: string | null, contactEmail: string): Promise<string> {
  if (!authUserId) return buildGuestUserId(contactEmail);
  if (authUserId.length <= 50) return authUserId;
  if (!pool) return buildAuthFallbackUserId(authUserId);

  try {
    const byPrivyId = await pool.query<{ id: string }>(
      `
      SELECT id
      FROM users
      WHERE privy_id = $1
      LIMIT 1
      `,
      [authUserId],
    );
    const candidateByPrivy = byPrivyId.rows[0]?.id ?? "";
    if (candidateByPrivy && candidateByPrivy.length <= 50) return candidateByPrivy;

    const byAuthAccount = await pool.query<{ user_id: string }>(
      `
      SELECT user_id
      FROM auth_accounts
      WHERE provider = 'privy'
        AND provider_account_id = $1
      LIMIT 1
      `,
      [authUserId],
    );
    const candidateByAccount = byAuthAccount.rows[0]?.user_id ?? "";
    if (candidateByAccount && candidateByAccount.length <= 50) return candidateByAccount;
  } catch {
    // Fallback below.
  }

  return buildAuthFallbackUserId(authUserId);
}

function parseProvider(value: unknown): SocialProvider | null {
  if (value === "x" || value === "instagram") return value;
  return null;
}

function parseCryptoLevel(value: unknown): CryptoLevel | null {
  if (value === "zero" || value === "beginner" || value === "intermediate" || value === "advanced") {
    return value;
  }
  return null;
}

function isValidSocialUrl(provider: SocialProvider, rawUrl: string): boolean {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  const host = url.hostname.toLowerCase();
  if (provider === "x") {
    return host === "x.com" || host.endsWith(".x.com") || host === "twitter.com" || host.endsWith(".twitter.com");
  }
  return host === "instagram.com" || host.endsWith(".instagram.com");
}

async function getUserEmail(userId: string): Promise<string | null> {
  if (!pool) return null;
  const row = await pool.query<{ email: string | null }>(
    `SELECT email FROM users WHERE id = $1 LIMIT 1`,
    [userId],
  );
  return row.rows[0]?.email ?? null;
}

async function ensureUserRow(userId: string, email: string | null): Promise<void> {
  if (!pool) return;
  const upsertSql = `
    INSERT INTO users (id, email, is_active, created_at, updated_at)
    VALUES ($1, $2, 1, now(), now())
    ON CONFLICT (id)
    DO UPDATE SET
      email = COALESCE(EXCLUDED.email, users.email),
      is_active = 1,
      deleted_at = NULL,
      updated_at = now()
  `;
  const isEmailUniqueViolation = (error: unknown): boolean => {
    const err = error as { code?: string; constraint?: string; message?: string } | null;
    const code = err?.code ?? "";
    const constraint = (err?.constraint ?? "").toLowerCase();
    const message = (err?.message ?? "").toLowerCase();
    return (
      code === "23505" &&
      (constraint.includes("users_email_unique") ||
        message.includes("users_email_unique") ||
        (message.includes("duplicate key value") && message.includes("email")))
    );
  };

  try {
    await pool.query(upsertSql, [userId, email]);
  } catch (error) {
    if (!email || !isEmailUniqueViolation(error)) throw error;
    await pool.query(upsertSql, [userId, null]);
  }
}

async function hasVerifiedX(userId: string): Promise<boolean> {
  if (!pool) return false;
  await ensureAccessControlTables();
  const result = await pool.query(
    `
    SELECT 1
    FROM social_accounts
    WHERE user_id = $1
      AND provider = 'x'
      AND status = 'verified'
    LIMIT 1
    `,
    [userId],
  );
  return result.rows.length > 0;
}

async function getSubmissionPosition(userId: string): Promise<number | null> {
  if (!pool) return null;
  const result = await pool.query<{ position: number }>(
    `
    SELECT position
    FROM (
      SELECT user_id, ROW_NUMBER() OVER (ORDER BY created_at ASC, id ASC) AS position
      FROM beta_access_requests
    ) ranked
    WHERE user_id = $1
    LIMIT 1
    `,
    [userId],
  );
  return result.rows[0]?.position ?? null;
}

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDatabase || !pool) {
    const store = readMemoryStore();
    const existing = store.get(userId) ?? null;
    if (!existing) {
      return NextResponse.json({ request: null, submissionPosition: null, eligibleFirst30: false });
    }
    const position = Array.from(store.keys()).indexOf(userId) + 1;
    return NextResponse.json({
      request: existing,
      submissionPosition: position,
      eligibleFirst30: position > 0 && position <= 30,
    });
  }

  await ensureBetaAccessRequestsTable();
  const result = await pool.query(
    `
    SELECT
      user_id,
      email,
      status,
      social_provider,
      social_url,
      social_handle,
      professions,
      crypto_level,
      goals,
      concerns,
      weekly_time,
      previous_experience,
      admin_review_notes,
      reviewed_at,
      reviewed_by,
      created_at,
      updated_at
    FROM beta_access_requests
    WHERE user_id = $1
    LIMIT 1
    `,
    [userId],
  );
  const row = result.rows[0];
  if (!row) {
    return NextResponse.json({ request: null, submissionPosition: null, eligibleFirst30: false });
  }

  const submissionPosition = await getSubmissionPosition(userId);
  return NextResponse.json({
    request: {
      userId: row.user_id,
      email: row.email,
      status: row.status,
      socialProvider: row.social_provider,
      socialUrl: row.social_url,
      socialHandle: row.social_handle,
      professions: Array.isArray(row.professions) ? row.professions : [],
      cryptoLevel: row.crypto_level,
      goals: Array.isArray(row.goals) ? row.goals : [],
      concerns: row.concerns,
      weeklyTime: row.weekly_time,
      previousExperience: row.previous_experience,
      adminReviewNotes: row.admin_review_notes,
      reviewedAt: row.reviewed_at,
      reviewedBy: row.reviewed_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
    submissionPosition,
    eligibleFirst30: typeof submissionPosition === "number" && submissionPosition <= 30,
  });
}

export async function POST(request: NextRequest) {
  try {
    const authUserId = await getUserIdFromRequest(request);
    const body = (await request.json().catch(() => ({}))) as Partial<AccessRequestPayload>;
    const contactEmail = normalizeEmail(body.contactEmail);
    const professions = sanitizeArray(body.professions, 12);
    const goals = sanitizeArray(body.goals, 8);
    const concerns = sanitizeText(body.concerns, 600);
    const weeklyTime = sanitizeText(body.weeklyTime, 60);
    const previousExperience = sanitizeText(body.previousExperience, 600);
    const socialHandle = sanitizeText(body.socialHandle, 120);
    const socialUrl = sanitizeText(body.socialUrl, 512);
    const socialProvider = parseProvider(body.socialProvider);
    const cryptoLevel = parseCryptoLevel(body.cryptoLevel);

    if (!authUserId && !isValidEmail(contactEmail)) {
      return NextResponse.json({ error: "Inserisci una email valida per inviare la richiesta." }, { status: 400 });
    }
    if (professions.length === 0) {
      return NextResponse.json({ error: "Seleziona almeno una professione." }, { status: 400 });
    }
    if (!cryptoLevel) {
      return NextResponse.json({ error: "Seleziona il tuo livello di esperienza crypto." }, { status: 400 });
    }
    if (!socialProvider) {
      return NextResponse.json({ error: "Seleziona un social (X o Instagram)." }, { status: 400 });
    }
    if (!socialUrl || !isValidSocialUrl(socialProvider, socialUrl)) {
      return NextResponse.json({ error: "Inserisci un link social valido (https)." }, { status: 400 });
    }

    if (hasDatabase && pool && socialProvider === "x" && authUserId) {
      const verifiedX = await hasVerifiedX(authUserId);
      if (!verifiedX) {
        const canonicalUserId = await resolveRequestUserId(authUserId, contactEmail);
        const verifiedOnCanonical = canonicalUserId !== authUserId ? await hasVerifiedX(canonicalUserId) : false;
        if (!verifiedOnCanonical) {
          return NextResponse.json(
            { error: "Per usare X devi prima collegare il tuo account X nel profilo." },
            { status: 400 },
          );
        }
      }
    }

    let requestUserId = await resolveRequestUserId(authUserId, contactEmail);
    let resolvedEmail: string | null = null;
    let requestEmail: string | null = null;

    if (!hasDatabase || !pool) {
      resolvedEmail = authUserId ? (contactEmail || null) : contactEmail;
      requestEmail = isValidEmail(contactEmail) ? contactEmail : resolvedEmail;
      const nowIso = new Date().toISOString();
      const store = readMemoryStore();
      const existing = store.get(requestUserId);
      const payload: StoredAccessRequest = {
        userId: requestUserId,
        email: requestEmail || existing?.email || null,
        professions,
        cryptoLevel,
        goals,
        concerns,
        weeklyTime,
        previousExperience,
        socialProvider,
        socialUrl,
        socialHandle,
        status: existing?.status === "approved" ? "approved" : "pending",
        reviewedAt: existing?.status === "approved" ? existing.reviewedAt : null,
        reviewedBy: existing?.status === "approved" ? existing.reviewedBy : null,
        adminReviewNotes: existing?.status === "approved" ? existing.adminReviewNotes : null,
        createdAt: existing?.createdAt ?? nowIso,
        updatedAt: nowIso,
      };
      store.set(requestUserId, payload);
      const submissionPosition = Array.from(store.keys()).indexOf(requestUserId) + 1;
      return NextResponse.json({
        ok: true,
        request: payload,
        submissionPosition,
        eligibleFirst30: submissionPosition > 0 && submissionPosition <= 30,
      });
    }

    await ensureBetaAccessRequestsTable();
    if (authUserId) {
      resolvedEmail = (await getUserEmail(authUserId)) ?? null;
      if (!resolvedEmail && isValidEmail(contactEmail)) {
        resolvedEmail = contactEmail;
      }
      requestEmail = isValidEmail(contactEmail) ? contactEmail : resolvedEmail;
      await ensureUserRow(requestUserId, resolvedEmail);
    } else {
      const existingUser = await pool.query<{ id: string }>(
        `
        SELECT id
        FROM users
        WHERE LOWER(email) = LOWER($1)
        LIMIT 1
        `,
        [contactEmail],
      );
      if (existingUser.rows[0]?.id) {
        requestUserId = existingUser.rows[0].id;
      }
      resolvedEmail = contactEmail;
      requestEmail = contactEmail;
      await ensureUserRow(requestUserId, resolvedEmail);
    }

    await pool.query(
    `
    INSERT INTO beta_access_requests (
      user_id,
      email,
      status,
      social_provider,
      social_url,
      social_handle,
      professions,
      crypto_level,
      goals,
      concerns,
      weekly_time,
      previous_experience,
      updated_at
    )
    VALUES (
      $1, $2, 'pending', $3, $4, $5, $6::jsonb, $7, $8::jsonb, $9, $10, $11,
      now()
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
      email = EXCLUDED.email,
      status = CASE WHEN beta_access_requests.status = 'approved' THEN 'approved' ELSE 'pending' END,
      social_provider = EXCLUDED.social_provider,
      social_url = EXCLUDED.social_url,
      social_handle = EXCLUDED.social_handle,
      professions = EXCLUDED.professions,
      crypto_level = EXCLUDED.crypto_level,
      goals = EXCLUDED.goals,
      concerns = EXCLUDED.concerns,
      weekly_time = EXCLUDED.weekly_time,
      previous_experience = EXCLUDED.previous_experience,
      admin_review_notes = CASE WHEN beta_access_requests.status = 'approved' THEN beta_access_requests.admin_review_notes ELSE NULL END,
      reviewed_at = CASE WHEN beta_access_requests.status = 'approved' THEN beta_access_requests.reviewed_at ELSE NULL END,
      reviewed_by = CASE WHEN beta_access_requests.status = 'approved' THEN beta_access_requests.reviewed_by ELSE NULL END,
      updated_at = now()
    `,
    [
      requestUserId,
      requestEmail,
      socialProvider,
      socialUrl,
      socialHandle || null,
      JSON.stringify(professions),
      cryptoLevel,
      JSON.stringify(goals),
      concerns || null,
      weeklyTime || null,
      previousExperience || null,
    ],
    );

    const payload = await pool.query(
    `
    SELECT
      user_id,
      email,
      status,
      social_provider,
      social_url,
      social_handle,
      professions,
      crypto_level,
      goals,
      concerns,
      weekly_time,
      previous_experience,
      admin_review_notes,
      reviewed_at,
      reviewed_by,
      created_at,
      updated_at
    FROM beta_access_requests
    WHERE user_id = $1
    LIMIT 1
    `,
    [requestUserId],
    );

    const submissionPosition = await getSubmissionPosition(requestUserId);
    return NextResponse.json({
      ok: true,
      request: payload.rows[0] ?? null,
      submissionPosition,
      eligibleFirst30: typeof submissionPosition === "number" && submissionPosition <= 30,
    });
  } catch (error) {
    console.error("Failed to submit beta access request:", error);
    return NextResponse.json(
      { error: "Invio non riuscito. Riprova tra qualche secondo." },
      { status: 500 },
    );
  }
}
