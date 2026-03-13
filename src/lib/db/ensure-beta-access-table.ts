import { pool } from "@/lib/db";

let setupPromise: Promise<void> | null = null;

export async function ensureBetaAccessRequestsTable(): Promise<void> {
  if (!pool) return;
  if (!setupPromise) {
    setupPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS beta_access_requests (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          email VARCHAR(255),
          status VARCHAR(20) NOT NULL DEFAULT 'pending',
          social_provider VARCHAR(20) NOT NULL,
          social_url VARCHAR(512) NOT NULL,
          social_handle VARCHAR(120),
          professions JSONB NOT NULL DEFAULT '[]'::jsonb,
          crypto_level VARCHAR(30) NOT NULL,
          goals JSONB NOT NULL DEFAULT '[]'::jsonb,
          concerns TEXT,
          weekly_time VARCHAR(40),
          previous_experience TEXT,
          x_profile_url VARCHAR(512),
          instagram_profile_url VARCHAR(512),
          admin_review_notes TEXT,
          reviewed_at TIMESTAMP,
          reviewed_by VARCHAR(50),
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          updated_at TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT beta_access_requests_status_check
            CHECK (status IN ('pending', 'approved', 'rejected')),
          CONSTRAINT beta_access_requests_social_provider_check
            CHECK (social_provider IN ('x', 'instagram')),
          CONSTRAINT beta_access_requests_crypto_level_check
            CHECK (crypto_level IN ('zero', 'beginner', 'intermediate', 'advanced'))
        );
      `);

      await pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS beta_access_requests_user_unique
        ON beta_access_requests (user_id);
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS beta_access_requests_status_idx
        ON beta_access_requests (status);
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS beta_access_requests_created_at_idx
        ON beta_access_requests (created_at);
      `);
    })();
  }
  await setupPromise;
}
