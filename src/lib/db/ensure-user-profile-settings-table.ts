import { pool } from "@/lib/db";

/**
 * Crea tabella impostazioni profilo pubblico se non esiste.
 */
export async function ensureUserProfileSettingsTable(): Promise<void> {
  if (!pool) return;
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_profile_settings (
        user_id varchar(50) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        custom_username varchar(50),
        show_wallet_address_public smallint NOT NULL DEFAULT 0,
        wallet_addresses text,
        instagram_url varchar(512),
        tiktok_url varchar(512),
        youtube_url varchar(512),
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        CONSTRAINT user_profile_settings_show_wallet_check CHECK (show_wallet_address_public IN (0, 1))
      )
    `);
    // Migrazioni additive per ambienti dove la tabella esiste gia'
    await client.query(`ALTER TABLE user_profile_settings ADD COLUMN IF NOT EXISTS wallet_addresses text`);
    await client.query(`ALTER TABLE user_profile_settings ADD COLUMN IF NOT EXISTS instagram_url varchar(512)`);
    await client.query(`ALTER TABLE user_profile_settings ADD COLUMN IF NOT EXISTS tiktok_url varchar(512)`);
    await client.query(`ALTER TABLE user_profile_settings ADD COLUMN IF NOT EXISTS youtube_url varchar(512)`);
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS user_profile_settings_custom_username_unique
      ON user_profile_settings (lower(custom_username))
      WHERE custom_username IS NOT NULL
    `);
  } finally {
    client.release();
  }
}

