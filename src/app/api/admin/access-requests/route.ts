import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";
import { hasDatabase, pool } from "@/lib/db";
import { ensureBetaAccessRequestsTable } from "@/lib/db/ensure-beta-access-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function ensureAdmin(request: NextRequest): Promise<string | null> {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return null;
  if (!hasDatabase && process.env.NODE_ENV !== "production") return userId;
  if (await canManageAdmin(userId)) return userId;
  return null;
}

export async function GET(request: NextRequest) {
  const userId = await ensureAdmin(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDatabase || !pool) {
    return NextResponse.json({ requests: [] });
  }

  await ensureBetaAccessRequestsTable();

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const statusFilter =
    status === "pending" || status === "approved" || status === "rejected" ? status : null;

  const result = await pool.query(
    `
    SELECT
      bar.id,
      bar.user_id,
      bar.email,
      u.username,
      bar.status,
      bar.social_provider,
      bar.social_url,
      bar.social_handle,
      bar.professions,
      bar.crypto_level,
      bar.goals,
      bar.concerns,
      bar.weekly_time,
      bar.previous_experience,
      bar.x_profile_url,
      bar.instagram_profile_url,
      bar.admin_review_notes,
      bar.reviewed_at,
      bar.reviewed_by,
      bar.created_at,
      bar.updated_at,
      ranked.position AS submission_position
    FROM beta_access_requests bar
    LEFT JOIN users u ON u.id = bar.user_id
    LEFT JOIN (
      SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC, id ASC) AS position
      FROM beta_access_requests
    ) ranked ON ranked.id = bar.id
    WHERE ($1::text IS NULL OR bar.status = $1::text)
    ORDER BY
      CASE bar.status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END ASC,
      bar.created_at ASC
    `,
    [statusFilter],
  );

  return NextResponse.json({
    requests: result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      email: row.email,
      username: row.username,
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
      xProfileUrl: row.x_profile_url,
      instagramProfileUrl: row.instagram_profile_url,
      adminReviewNotes: row.admin_review_notes,
      reviewedAt: row.reviewed_at,
      reviewedBy: row.reviewed_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      submissionPosition: Number(row.submission_position || 0),
      eligibleFirst30: Number(row.submission_position || 0) > 0 && Number(row.submission_position || 0) <= 30,
    })),
  });
}
