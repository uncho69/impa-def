ALTER TABLE "news" ALTER COLUMN "status" SET DEFAULT 'DRAFT';--> statement-breakpoint
ALTER TABLE "whats_new_card" ALTER COLUMN "category" SET DEFAULT 'feature';--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "impressions" bigint DEFAULT 0;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "is_verified" smallint;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "verified_at" timestamp;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "verified_by" varchar(50);--> statement-breakpoint
CREATE INDEX "tweets_is_verified_idx" ON "tweets" USING btree ("is_verified");--> statement-breakpoint
CREATE INDEX "tweets_verified_at_idx" ON "tweets" USING btree ("verified_at");--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_impressions_check" CHECK ("tweets"."impressions" >= 0);--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_is_verified_check" CHECK ("tweets"."is_verified" IS NULL OR "tweets"."is_verified" IN (-1, 1));