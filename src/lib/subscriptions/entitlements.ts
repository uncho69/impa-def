import { pool } from "@/lib/db";
import { ensureAccessControlTables } from "@/lib/db/ensure-access-control-tables";

export type UserEntitlements = {
  plan: "free" | "pro";
  canViewPremium: boolean;
  maxProjectsPerCategory: number;
};

const FREE_DEFAULT: UserEntitlements = {
  plan: "free",
  canViewPremium: false,
  maxProjectsPerCategory: 1,
};

export async function getUserEntitlements(userId: string): Promise<UserEntitlements> {
  if (!pool) return FREE_DEFAULT;
  await ensureAccessControlTables();

  const result = await pool.query(
    `
    SELECT plan, can_view_premium, max_projects_per_category
    FROM entitlements
    WHERE user_id = $1
    LIMIT 1
    `,
    [userId],
  );

  if (result.rows.length === 0) {
    await pool.query(
      `
      INSERT INTO entitlements (user_id, plan, can_view_premium, max_projects_per_category, updated_at)
      VALUES ($1, 'free', 0, 1, now())
      ON CONFLICT (user_id) DO NOTHING
      `,
      [userId],
    );
    return FREE_DEFAULT;
  }

  const row = result.rows[0];
  return {
    plan: row.plan === "pro" ? "pro" : "free",
    canViewPremium: Number(row.can_view_premium) === 1,
    maxProjectsPerCategory: Number(row.max_projects_per_category || 1),
  };
}

