import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL || process.env.database_url;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL (or database_url) environment variable is not set");
}

function useSsl(): boolean {
  const u = DATABASE_URL.toLowerCase();
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

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: useSsl() ? { rejectUnauthorized: false } : undefined,
  max: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export const db = drizzle(pool, { schema });

export { pool };

