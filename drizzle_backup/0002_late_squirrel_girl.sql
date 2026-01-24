CREATE TABLE "news" (
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
--> statement-breakpoint
CREATE TABLE "whats_new_card" (
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
--> statement-breakpoint
CREATE INDEX "news_category_idx" ON "news" USING btree ("category");--> statement-breakpoint
CREATE INDEX "news_status_idx" ON "news" USING btree ("status");--> statement-breakpoint
CREATE INDEX "news_featured_idx" ON "news" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "news_published_at_idx" ON "news" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "whats_new_card_is_active_idx" ON "whats_new_card" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "whats_new_card_show_in_landing_idx" ON "whats_new_card" USING btree ("show_in_landing");--> statement-breakpoint
CREATE INDEX "whats_new_card_order_idx" ON "whats_new_card" USING btree ("order");--> statement-breakpoint
CREATE INDEX "whats_new_card_created_at_idx" ON "whats_new_card" USING btree ("created_at");