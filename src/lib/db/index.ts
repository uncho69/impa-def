import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL || process.env.database_url;
export const hasDatabase = Boolean(DATABASE_URL);

function useSsl(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes("neon.tech") ||
    u.includes("neondb") ||
    u.includes("rds.") ||
    u.includes("amazonaws.com") ||
    u.includes("supabase.co") ||
    u.includes("vercel-storage.com") ||
    u.includes("vercel.postgres") ||
    /\bproduction\b/.test(u) ||
    /prod\.(postgres|db)/.test(u)
  );
}

export const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: useSsl(DATABASE_URL) ? { rejectUnauthorized: false } : undefined,
      max: 1,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })
  : null;

export const db = pool ? drizzle(pool, { schema }) : null;

