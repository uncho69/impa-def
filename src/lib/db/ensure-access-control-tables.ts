import { pool } from "@/lib/db";

let setupPromise: Promise<void> | null = null;

export async function ensureAccessControlTables(): Promise<void> {
  if (!pool) return;
  if (!setupPromise) {
    setupPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS subscriptions (
          id VARCHAR(255) PRIMARY KEY,
          user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          stripe_customer_id VARCHAR(255),
          status VARCHAR(30) NOT NULL DEFAULT 'inactive',
          current_period_end TIMESTAMP NULL,
          cancel_at_period_end SMALLINT NOT NULL DEFAULT 0,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          updated_at TIMESTAMP NOT NULL DEFAULT now()
        );
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id);
      `);
      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_stripe_customer_unique ON subscriptions(stripe_customer_id);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS entitlements (
          user_id VARCHAR(50) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          plan VARCHAR(30) NOT NULL DEFAULT 'free',
          can_view_premium SMALLINT NOT NULL DEFAULT 0,
          max_projects_per_category INTEGER NOT NULL DEFAULT 1,
          updated_at TIMESTAMP NOT NULL DEFAULT now(),
          CHECK (can_view_premium IN (0, 1))
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS social_accounts (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          provider VARCHAR(30) NOT NULL,
          provider_user_id VARCHAR(255),
          status VARCHAR(30) NOT NULL DEFAULT 'connected',
          verified_at TIMESTAMP NULL,
          last_revalidated_at TIMESTAMP NULL,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          updated_at TIMESTAMP NOT NULL DEFAULT now()
        );
      `);
      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS social_accounts_user_provider_unique
        ON social_accounts(user_id, provider);
      `);
    })();
  }
  await setupPromise;
}

