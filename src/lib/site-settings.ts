import { hasDatabase, pool } from "@/lib/db";
import { ensureSiteSettingsTable } from "@/lib/db/ensure-site-settings-table";
import {
  DEFAULT_SITE_SETTINGS,
  normalizeSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings-shared";

const SITE_SETTINGS_CACHE_KEY = "__idfSiteSettings";

function loadNoDbSiteSettings(): SiteSettings {
  const store = globalThis as Record<string, unknown>;
  if (!store[SITE_SETTINGS_CACHE_KEY]) {
    store[SITE_SETTINGS_CACHE_KEY] = DEFAULT_SITE_SETTINGS;
  }
  return normalizeSiteSettings(store[SITE_SETTINGS_CACHE_KEY]);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasDatabase || !pool) {
    return loadNoDbSiteSettings();
  }

  await ensureSiteSettingsTable();
  const result = await pool.query<{ value: unknown }>(
    `SELECT value FROM site_settings WHERE key = 'global' LIMIT 1`,
  );
  if (result.rows.length === 0) {
    return DEFAULT_SITE_SETTINGS;
  }
  return normalizeSiteSettings(result.rows[0]?.value ?? {});
}

export async function saveSiteSettings(input: unknown): Promise<SiteSettings> {
  const normalized = normalizeSiteSettings(input);

  if (!hasDatabase || !pool) {
    const store = globalThis as Record<string, unknown>;
    store[SITE_SETTINGS_CACHE_KEY] = normalized;
    return normalized;
  }

  await ensureSiteSettingsTable();
  await pool.query(
    `
      INSERT INTO site_settings (key, value, updated_at)
      VALUES ('global', $1::jsonb, now())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `,
    [JSON.stringify(normalized)],
  );
  return normalized;
}
