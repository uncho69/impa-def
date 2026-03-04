CREATE TABLE "campaign_participation_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"project_id" varchar(50) NOT NULL,
	"campaign_index" integer NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_at" timestamp,
	"reviewed_by" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "campaign_participation_requests_user_campaign_unique" UNIQUE("user_id","project_id","campaign_index"),
	CONSTRAINT "campaign_participation_requests_status_check" CHECK ("campaign_participation_requests"."status" IN ('pending', 'approved', 'rejected'))
);
--> statement-breakpoint
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_post_id_unique";--> statement-breakpoint
ALTER TABLE "campaign_participation_requests" ADD CONSTRAINT "campaign_participation_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "campaign_participation_requests_user_idx" ON "campaign_participation_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "campaign_participation_requests_campaign_idx" ON "campaign_participation_requests" USING btree ("project_id","campaign_index");--> statement-breakpoint
CREATE INDEX "campaign_participation_requests_status_idx" ON "campaign_participation_requests" USING btree ("status");--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_post_id_epoch_unique" UNIQUE("post_id","project_id","campaign_index","epoch_index");