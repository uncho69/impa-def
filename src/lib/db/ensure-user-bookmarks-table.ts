import { pool } from "@/lib/db";

let ensured = false;

export async function ensureUserBookmarksTable(): Promise<void> {
  if (ensured) return;
  if (!pool) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_bookmarks (
      id varchar(64) PRIMARY KEY,
      user_id varchar(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      url varchar(700) NOT NULL,
      title varchar(255) NOT NULL,
      bookmark_type varchar(30) NOT NULL DEFAULT 'page',
      project_id varchar(120),
      section_id varchar(120),
      created_at timestamp NOT NULL DEFAULT now(),
      CONSTRAINT user_bookmarks_type_check CHECK (bookmark_type IN ('page', 'section', 'content'))
    )
  `);

  await pool.query(`CREATE INDEX IF NOT EXISTS user_bookmarks_user_idx ON user_bookmarks(user_id, created_at DESC)`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS user_bookmarks_user_url_uidx ON user_bookmarks(user_id, url)`);
  await pool.query(`ALTER TABLE user_bookmarks ADD COLUMN IF NOT EXISTS project_id varchar(120)`);
  await pool.query(`ALTER TABLE user_bookmarks ADD COLUMN IF NOT EXISTS section_id varchar(120)`);
  await pool.query(`ALTER TABLE user_bookmarks ADD COLUMN IF NOT EXISTS bookmark_type varchar(30)`);

  ensured = true;
}

