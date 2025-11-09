CREATE TABLE "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50),
	"name" varchar(255),
	"key_hash" varchar(255) NOT NULL,
	"key_prefix" varchar(20),
	"scopes" text,
	"last_used_at" timestamp,
	"expires_at" timestamp,
	"is_active" smallint DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "api_keys_key_hash_unique" UNIQUE("key_hash"),
	CONSTRAINT "api_keys_is_active_check" CHECK ("api_keys"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "auth_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"provider" varchar(50) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"provider_user_id" varchar(255),
	"wallet_address" varchar(255),
	"email" varchar(255),
	"access_token" text,
	"refresh_token" text,
	"expires_at" timestamp,
	"token_type" varchar(50),
	"scope" text,
	"id_token" text,
	"provider_data" text,
	"is_active" smallint DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "auth_accounts_provider_unique" UNIQUE("provider","provider_account_id"),
	CONSTRAINT "auth_accounts_is_active_check" CHECK ("auth_accounts"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"project_id" varchar(50) NOT NULL,
	"index" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"epoch_count" integer DEFAULT 0 NOT NULL,
	"epoch_size" integer DEFAULT 0 NOT NULL,
	"is_active" smallint DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"created_by" varchar(50),
	"updated_by" varchar(50),
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "id" PRIMARY KEY("project_id","index"),
	CONSTRAINT "campaigns_epoch_count_check" CHECK ("campaigns"."epoch_count" >= 0),
	CONSTRAINT "campaigns_epoch_size_check" CHECK ("campaigns"."epoch_size" >= 0),
	CONSTRAINT "campaigns_is_active_check" CHECK ("campaigns"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "epochs" (
	"project_id" varchar(50) NOT NULL,
	"campaign_index" integer NOT NULL,
	"index" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"user_count" integer DEFAULT 0 NOT NULL,
	"tweet_count" bigint DEFAULT 0 NOT NULL,
	"total_likes" bigint DEFAULT 0 NOT NULL,
	"total_replies" bigint DEFAULT 0 NOT NULL,
	"total_retweets" bigint DEFAULT 0 NOT NULL,
	"total_quotes" bigint DEFAULT 0 NOT NULL,
	"total_points" bigint DEFAULT 0 NOT NULL,
	"is_active" smallint DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"created_by" varchar(50),
	"updated_by" varchar(50),
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "id" PRIMARY KEY("project_id","campaign_index","index"),
	CONSTRAINT "epochs_date_check" CHECK ("epochs"."end_date" > "epochs"."start_date"),
	CONSTRAINT "epochs_user_count_check" CHECK ("epochs"."user_count" >= 0),
	CONSTRAINT "epochs_tweet_count_check" CHECK ("epochs"."tweet_count" >= 0),
	CONSTRAINT "epochs_total_likes_check" CHECK ("epochs"."total_likes" >= 0),
	CONSTRAINT "epochs_total_replies_check" CHECK ("epochs"."total_replies" >= 0),
	CONSTRAINT "epochs_total_retweets_check" CHECK ("epochs"."total_retweets" >= 0),
	CONSTRAINT "epochs_total_quotes_check" CHECK ("epochs"."total_quotes" >= 0),
	CONSTRAINT "epochs_total_points_check" CHECK ("epochs"."total_points" >= 0),
	CONSTRAINT "epochs_is_active_check" CHECK ("epochs"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "otp_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50),
	"identifier" varchar(255) NOT NULL,
	"code" varchar(10) NOT NULL,
	"type" varchar(50) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"max_attempts" integer DEFAULT 3 NOT NULL,
	"used" smallint DEFAULT 0 NOT NULL,
	"used_at" timestamp,
	"ip_address" varchar(45),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "otp_codes_attempts_check" CHECK ("otp_codes"."attempts" >= 0),
	CONSTRAINT "otp_codes_max_attempts_check" CHECK ("otp_codes"."max_attempts" > 0),
	CONSTRAINT "otp_codes_used_check" CHECK ("otp_codes"."used" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"campaign_count" integer DEFAULT 0 NOT NULL,
	"is_active" smallint DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"created_by" varchar(50),
	"updated_by" varchar(50),
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_campaign_count_check" CHECK ("projects"."campaign_count" >= 0),
	CONSTRAINT "projects_is_active_check" CHECK ("projects"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"token" varchar(500) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"device_id" varchar(255),
	"ip_address" varchar(45),
	"user_agent" text,
	"is_revoked" smallint DEFAULT 0 NOT NULL,
	"revoked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "refresh_tokens_token_unique" UNIQUE("token"),
	CONSTRAINT "refresh_tokens_is_revoked_check" CHECK ("refresh_tokens"."is_revoked" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "rewards" (
	"project_id" varchar(50) NOT NULL,
	"campaign_index" integer NOT NULL,
	"amount" bigint NOT NULL,
	"token" varchar(50) NOT NULL,
	"per_epoch" smallint DEFAULT 0 NOT NULL,
	"is_active" smallint DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"created_by" varchar(50),
	"updated_by" varchar(50),
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "id" PRIMARY KEY("project_id","campaign_index","amount","token"),
	CONSTRAINT "rewards_amount_check" CHECK ("rewards"."amount" > 0),
	CONSTRAINT "rewards_per_epoch_check" CHECK ("rewards"."per_epoch" IN (0, 1)),
	CONSTRAINT "rewards_is_active_check" CHECK ("rewards"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"session_token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"device_id" varchar(255),
	"is_active" smallint DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_session_token_unique" UNIQUE("session_token"),
	CONSTRAINT "sessions_is_active_check" CHECK ("sessions"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "tweets" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" varchar(50),
	"campaign_index" integer,
	"epoch_index" integer,
	"user_id" varchar(50),
	"twitter_user_id" varchar(50),
	"post_id" varchar(50),
	"content" text,
	"posted_at" timestamp,
	"has_image" smallint DEFAULT 0,
	"has_video" smallint DEFAULT 0,
	"hashtags" text,
	"tagged_users" text,
	"likes" bigint DEFAULT 0,
	"replies" bigint DEFAULT 0,
	"retweets" bigint DEFAULT 0,
	"quotes" bigint DEFAULT 0,
	"is_active" smallint DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"created_by" varchar(50),
	"updated_by" varchar(50),
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tweets_post_id_unique" UNIQUE("post_id"),
	CONSTRAINT "tweets_likes_check" CHECK ("tweets"."likes" >= 0),
	CONSTRAINT "tweets_replies_check" CHECK ("tweets"."replies" >= 0),
	CONSTRAINT "tweets_retweets_check" CHECK ("tweets"."retweets" >= 0),
	CONSTRAINT "tweets_quotes_check" CHECK ("tweets"."quotes" >= 0),
	CONSTRAINT "tweets_is_active_check" CHECK ("tweets"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "user_epoch_scores" (
	"project_id" varchar(50) NOT NULL,
	"campaign_index" integer NOT NULL,
	"epoch_index" integer NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"points" bigint DEFAULT 0 NOT NULL,
	"tweet_count" integer DEFAULT 0 NOT NULL,
	"total_likes" bigint DEFAULT 0 NOT NULL,
	"total_replies" bigint DEFAULT 0 NOT NULL,
	"total_retweets" bigint DEFAULT 0 NOT NULL,
	"total_quotes" bigint DEFAULT 0 NOT NULL,
	"is_active" smallint DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"created_by" varchar(50),
	"updated_by" varchar(50),
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "id" PRIMARY KEY("project_id","campaign_index","epoch_index","user_id"),
	CONSTRAINT "user_epoch_scores_points_check" CHECK ("user_epoch_scores"."points" >= 0),
	CONSTRAINT "user_epoch_scores_tweet_count_check" CHECK ("user_epoch_scores"."tweet_count" >= 0),
	CONSTRAINT "user_epoch_scores_total_likes_check" CHECK ("user_epoch_scores"."total_likes" >= 0),
	CONSTRAINT "user_epoch_scores_total_replies_check" CHECK ("user_epoch_scores"."total_replies" >= 0),
	CONSTRAINT "user_epoch_scores_total_retweets_check" CHECK ("user_epoch_scores"."total_retweets" >= 0),
	CONSTRAINT "user_epoch_scores_total_quotes_check" CHECK ("user_epoch_scores"."total_quotes" >= 0),
	CONSTRAINT "user_epoch_scores_is_active_check" CHECK ("user_epoch_scores"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"role" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_user_role_unique" UNIQUE("user_id","role"),
	CONSTRAINT "user_roles_role_check" CHECK ("user_roles"."role" IN ('admin', 'moderator', 'participant', 'base_user'))
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"email_verified" smallint DEFAULT 0 NOT NULL,
	"twitter_id" varchar(50),
	"username" varchar(50),
	"wallet_address" varchar(255),
	"privy_id" varchar(255),
	"clerk_id" varchar(255),
	"total_points" bigint DEFAULT 0 NOT NULL,
	"total_likes" bigint DEFAULT 0 NOT NULL,
	"total_replies" bigint DEFAULT 0 NOT NULL,
	"total_retweets" bigint DEFAULT 0 NOT NULL,
	"total_quotes" bigint DEFAULT 0 NOT NULL,
	"is_active" smallint DEFAULT 1 NOT NULL,
	"deleted_at" timestamp,
	"created_by" varchar(50),
	"updated_by" varchar(50),
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_twitter_id_unique" UNIQUE("twitter_id"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_privy_id_unique" UNIQUE("privy_id"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_verified_check" CHECK ("users"."email_verified" IN (0, 1)),
	CONSTRAINT "users_total_points_check" CHECK ("users"."total_points" >= 0),
	CONSTRAINT "users_total_likes_check" CHECK ("users"."total_likes" >= 0),
	CONSTRAINT "users_total_replies_check" CHECK ("users"."total_replies" >= 0),
	CONSTRAINT "users_total_retweets_check" CHECK ("users"."total_retweets" >= 0),
	CONSTRAINT "users_total_quotes_check" CHECK ("users"."total_quotes" >= 0),
	CONSTRAINT "users_is_active_check" CHECK ("users"."is_active" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"user_id" varchar(50),
	"used" smallint DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token"),
	CONSTRAINT "verification_tokens_identifier_type_unique" UNIQUE("identifier","token","type"),
	CONSTRAINT "verification_tokens_used_check" CHECK ("verification_tokens"."used" IN (0, 1))
);
--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "epochs" ADD CONSTRAINT "epochs_project_id_campaign_index_campaigns_project_id_index_fk" FOREIGN KEY ("project_id","campaign_index") REFERENCES "public"."campaigns"("project_id","index") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "otp_codes" ADD CONSTRAINT "otp_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_project_id_campaign_index_campaigns_project_id_index_fk" FOREIGN KEY ("project_id","campaign_index") REFERENCES "public"."campaigns"("project_id","index") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_project_id_campaign_index_epoch_index_epochs_project_id_campaign_index_index_fk" FOREIGN KEY ("project_id","campaign_index","epoch_index") REFERENCES "public"."epochs"("project_id","campaign_index","index") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_epoch_scores" ADD CONSTRAINT "user_epoch_scores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_epoch_scores" ADD CONSTRAINT "user_epoch_scores_project_id_campaign_index_epoch_index_epochs_project_id_campaign_index_index_fk" FOREIGN KEY ("project_id","campaign_index","epoch_index") REFERENCES "public"."epochs"("project_id","campaign_index","index") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "api_keys_user_id_idx" ON "api_keys" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "api_keys_key_hash_idx" ON "api_keys" USING btree ("key_hash");--> statement-breakpoint
CREATE INDEX "api_keys_key_prefix_idx" ON "api_keys" USING btree ("key_prefix");--> statement-breakpoint
CREATE INDEX "api_keys_expires_at_idx" ON "api_keys" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "auth_accounts_user_id_idx" ON "auth_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "auth_accounts_provider_idx" ON "auth_accounts" USING btree ("provider");--> statement-breakpoint
CREATE INDEX "auth_accounts_provider_account_id_idx" ON "auth_accounts" USING btree ("provider_account_id");--> statement-breakpoint
CREATE INDEX "auth_accounts_wallet_address_idx" ON "auth_accounts" USING btree ("wallet_address");--> statement-breakpoint
CREATE INDEX "auth_accounts_email_idx" ON "auth_accounts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "auth_accounts_lookup_idx" ON "auth_accounts" USING btree ("provider","provider_account_id");--> statement-breakpoint
CREATE INDEX "campaigns_project_id_idx" ON "campaigns" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "campaigns_created_at_idx" ON "campaigns" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "campaigns_epoch_count_idx" ON "campaigns" USING btree ("epoch_count");--> statement-breakpoint
CREATE INDEX "campaigns_active_filter_idx" ON "campaigns" USING btree ("is_active","deleted_at");--> statement-breakpoint
CREATE INDEX "epochs_project_id_idx" ON "epochs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "epochs_campaign_idx" ON "epochs" USING btree ("project_id","campaign_index");--> statement-breakpoint
CREATE INDEX "epochs_start_date_idx" ON "epochs" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "epochs_end_date_idx" ON "epochs" USING btree ("end_date");--> statement-breakpoint
CREATE INDEX "epochs_created_at_idx" ON "epochs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "epochs_active_filter_idx" ON "epochs" USING btree ("is_active","deleted_at");--> statement-breakpoint
CREATE INDEX "otp_codes_user_id_idx" ON "otp_codes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "otp_codes_identifier_idx" ON "otp_codes" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "otp_codes_code_idx" ON "otp_codes" USING btree ("code");--> statement-breakpoint
CREATE INDEX "otp_codes_type_idx" ON "otp_codes" USING btree ("type");--> statement-breakpoint
CREATE INDEX "otp_codes_expires_at_idx" ON "otp_codes" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "projects_campaign_count_idx" ON "projects" USING btree ("campaign_count");--> statement-breakpoint
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "refresh_tokens_token_idx" ON "refresh_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX "refresh_tokens_expires_at_idx" ON "refresh_tokens" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "refresh_tokens_device_id_idx" ON "refresh_tokens" USING btree ("device_id");--> statement-breakpoint
CREATE INDEX "rewards_campaign_idx" ON "rewards" USING btree ("project_id","campaign_index");--> statement-breakpoint
CREATE INDEX "rewards_token_idx" ON "rewards" USING btree ("token");--> statement-breakpoint
CREATE INDEX "rewards_amount_idx" ON "rewards" USING btree ("amount");--> statement-breakpoint
CREATE INDEX "rewards_active_filter_idx" ON "rewards" USING btree ("is_active","deleted_at");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_session_token_idx" ON "sessions" USING btree ("session_token");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "sessions_device_id_idx" ON "sessions" USING btree ("device_id");--> statement-breakpoint
CREATE INDEX "tweets_epoch_idx" ON "tweets" USING btree ("project_id","campaign_index","epoch_index");--> statement-breakpoint
CREATE INDEX "tweets_user_id_idx" ON "tweets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "tweets_user_epoch_idx" ON "tweets" USING btree ("user_id","project_id","campaign_index","epoch_index");--> statement-breakpoint
CREATE INDEX "tweets_twitter_user_id_idx" ON "tweets" USING btree ("twitter_user_id");--> statement-breakpoint
CREATE INDEX "tweets_post_id_idx" ON "tweets" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "tweets_posted_at_idx" ON "tweets" USING btree ("posted_at");--> statement-breakpoint
CREATE INDEX "tweets_created_at_idx" ON "tweets" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "tweets_likes_idx" ON "tweets" USING btree ("likes");--> statement-breakpoint
CREATE INDEX "tweets_retweets_idx" ON "tweets" USING btree ("retweets");--> statement-breakpoint
CREATE INDEX "tweets_active_filter_idx" ON "tweets" USING btree ("is_active","deleted_at");--> statement-breakpoint
CREATE INDEX "user_epoch_scores_epoch_idx" ON "user_epoch_scores" USING btree ("project_id","campaign_index","epoch_index");--> statement-breakpoint
CREATE INDEX "user_epoch_scores_user_id_idx" ON "user_epoch_scores" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_epoch_scores_points_idx" ON "user_epoch_scores" USING btree ("points");--> statement-breakpoint
CREATE INDEX "user_epoch_scores_epoch_points_idx" ON "user_epoch_scores" USING btree ("project_id","campaign_index","epoch_index","points");--> statement-breakpoint
CREATE INDEX "user_epoch_scores_created_at_idx" ON "user_epoch_scores" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "user_epoch_scores_active_filter_idx" ON "user_epoch_scores" USING btree ("is_active","deleted_at");--> statement-breakpoint
CREATE INDEX "user_roles_user_id_idx" ON "user_roles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_roles_role_idx" ON "user_roles" USING btree ("role");--> statement-breakpoint
CREATE INDEX "user_roles_user_role_idx" ON "user_roles" USING btree ("user_id","role");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_twitter_id_idx" ON "users" USING btree ("twitter_id");--> statement-breakpoint
CREATE INDEX "users_username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "users_wallet_address_idx" ON "users" USING btree ("wallet_address");--> statement-breakpoint
CREATE INDEX "users_privy_id_idx" ON "users" USING btree ("privy_id");--> statement-breakpoint
CREATE INDEX "users_clerk_id_idx" ON "users" USING btree ("clerk_id");--> statement-breakpoint
CREATE INDEX "users_total_points_idx" ON "users" USING btree ("total_points");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "users_active_filter_idx" ON "users" USING btree ("is_active","deleted_at");--> statement-breakpoint
CREATE INDEX "verification_tokens_identifier_idx" ON "verification_tokens" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "verification_tokens_token_idx" ON "verification_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX "verification_tokens_type_idx" ON "verification_tokens" USING btree ("type");--> statement-breakpoint
CREATE INDEX "verification_tokens_user_id_idx" ON "verification_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_tokens_expires_at_idx" ON "verification_tokens" USING btree ("expires_at");