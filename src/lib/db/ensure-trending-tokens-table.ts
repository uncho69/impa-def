import { pool } from "@/lib/db";

let setupPromise: Promise<void> | null = null;

export async function ensureTrendingTokensTable(): Promise<void> {
  if (!pool) return;
  if (!setupPromise) {
    setupPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS trending_tokens (
          id SERIAL PRIMARY KEY,
          project_id VARCHAR(80) NOT NULL,
          coingecko_id VARCHAR(120) NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 100,
          is_active SMALLINT NOT NULL DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          updated_at TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT trending_tokens_project_unique UNIQUE (project_id),
          CONSTRAINT trending_tokens_coingecko_unique UNIQUE (coingecko_id),
          CONSTRAINT trending_tokens_is_active_check CHECK (is_active IN (0, 1))
        );
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS trending_tokens_active_order_idx
        ON trending_tokens(is_active, sort_order, id);
      `);
    })();
  }
  await setupPromise;
}
