import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function createNewsTables() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('ERROR: DATABASE_URL environment variable is not set!');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  
  try {
    console.log('Creating news and whats_new_card tables...\n');

    // Create news table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "news" (
        "id" varchar(255) PRIMARY KEY NOT NULL,
        "title" varchar(500) NOT NULL,
        "summary" text NOT NULL,
        "content" text NOT NULL,
        "category" varchar(50) NOT NULL,
        "author" varchar(255) NOT NULL,
        "author_email" varchar(255) NOT NULL,
        "image_url" varchar(500),
        "featured" smallint DEFAULT 0 NOT NULL,
        "status" varchar(50) DEFAULT 'DRAFT' NOT NULL,
        "read_time" varchar(50) NOT NULL,
        "tags" text,
        "published_at" timestamp,
        "views" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "news_featured_check" CHECK ("news"."featured" IN (0, 1)),
        CONSTRAINT "news_status_check" CHECK ("news"."status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
        CONSTRAINT "news_views_check" CHECK ("news"."views" >= 0)
      );
    `);
    console.log('✓ Created news table');

    // Create indexes for news
    await pool.query(`CREATE INDEX IF NOT EXISTS "news_category_idx" ON "news" USING btree ("category");`);
    await pool.query(`CREATE INDEX IF NOT EXISTS "news_status_idx" ON "news" USING btree ("status");`);
    await pool.query(`CREATE INDEX IF NOT EXISTS "news_featured_idx" ON "news" USING btree ("featured");`);
    await pool.query(`CREATE INDEX IF NOT EXISTS "news_published_at_idx" ON "news" USING btree ("published_at");`);
    await pool.query(`CREATE INDEX IF NOT EXISTS "news_created_at_idx" ON "news" USING btree ("created_at");`);
    console.log('✓ Created news indexes');

    // Create whats_new_card table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "whats_new_card" (
        "id" varchar(255) PRIMARY KEY NOT NULL,
        "title" varchar(255) NOT NULL,
        "description" text NOT NULL,
        "category" varchar(50) DEFAULT 'feature' NOT NULL,
        "image_url" varchar(500),
        "link" varchar(500),
        "is_active" smallint DEFAULT 1 NOT NULL,
        "show_in_landing" smallint DEFAULT 0 NOT NULL,
        "order" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "whats_new_card_is_active_check" CHECK ("whats_new_card"."is_active" IN (0, 1)),
        CONSTRAINT "whats_new_card_show_in_landing_check" CHECK ("whats_new_card"."show_in_landing" IN (0, 1))
      );
    `);
    console.log('✓ Created whats_new_card table');

    // Create indexes for whats_new_card
    await pool.query(`CREATE INDEX IF NOT EXISTS "whats_new_card_is_active_idx" ON "whats_new_card" USING btree ("is_active");`);
    await pool.query(`CREATE INDEX IF NOT EXISTS "whats_new_card_show_in_landing_idx" ON "whats_new_card" USING btree ("show_in_landing");`);
    await pool.query(`CREATE INDEX IF NOT EXISTS "whats_new_card_order_idx" ON "whats_new_card" USING btree ("order");`);
    await pool.query(`CREATE INDEX IF NOT EXISTS "whats_new_card_created_at_idx" ON "whats_new_card" USING btree ("created_at");`);
    console.log('✓ Created whats_new_card indexes');

    console.log('\n✅ All tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createNewsTables();

