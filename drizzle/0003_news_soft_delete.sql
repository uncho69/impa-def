ALTER TABLE "news" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "deleted_by" varchar(50);--> statement-breakpoint
CREATE INDEX "news_deleted_at_idx" ON "news" USING btree ("deleted_at");
