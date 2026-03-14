import { pool } from "@/lib/db";

let setupPromise: Promise<void> | null = null;

export async function ensureAccessGateTables(): Promise<void> {
  if (!pool) return;
  if (!setupPromise) {
    setupPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS access_gate_passwords (
          id SERIAL PRIMARY KEY,
          code VARCHAR(64) NOT NULL UNIQUE,
          status VARCHAR(20) NOT NULL DEFAULT 'active',
          used_at TIMESTAMP,
          revoked_at TIMESTAMP,
          created_by VARCHAR(50),
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          updated_at TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT access_gate_passwords_status_check
            CHECK (status IN ('active', 'used', 'revoked'))
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS access_gate_passwords_status_idx
        ON access_gate_passwords (status);
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS access_gate_passwords_created_at_idx
        ON access_gate_passwords (created_at DESC);
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS access_gate_sessions (
          id SERIAL PRIMARY KEY,
          token VARCHAR(128) NOT NULL UNIQUE,
          password_id INTEGER REFERENCES access_gate_passwords(id) ON DELETE SET NULL,
          is_admin_bypass SMALLINT NOT NULL DEFAULT 0,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          CHECK (is_admin_bypass IN (0, 1))
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS access_gate_sessions_expires_idx
        ON access_gate_sessions (expires_at);
      `);

      await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'access_gate_passwords' AND column_name = 'recipient_name'
          ) THEN
            ALTER TABLE access_gate_passwords ADD COLUMN recipient_name VARCHAR(255);
          END IF;
        END $$;
      `);
    })();
  }
  await setupPromise;
}

