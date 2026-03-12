import { pool } from "@/lib/db";

let setupPromise: Promise<void> | null = null;

export async function ensureSiteSettingsTable(): Promise<void> {
  if (!pool) return;
  if (!setupPromise) {
    setupPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          key TEXT PRIMARY KEY,
          value JSONB NOT NULL DEFAULT '{}'::jsonb,
          updated_at TIMESTAMP NOT NULL DEFAULT now()
        );
      `);
    })();
  }
  await setupPromise;
}
