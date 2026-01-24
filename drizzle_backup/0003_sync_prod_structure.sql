-- Migration to sync production database with expected structure
-- This migration adds missing indexes, foreign keys, and constraints
-- All operations use IF NOT EXISTS to be idempotent

-- Add missing indexes
CREATE INDEX IF NOT EXISTS "api_keys_user_id_idx" ON "api_keys" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "api_keys_key_hash_idx" ON "api_keys" USING btree ("key_hash");
CREATE INDEX IF NOT EXISTS "api_keys_key_prefix_idx" ON "api_keys" USING btree ("key_prefix");
CREATE INDEX IF NOT EXISTS "api_keys_expires_at_idx" ON "api_keys" USING btree ("expires_at");
CREATE INDEX IF NOT EXISTS "auth_accounts_user_id_idx" ON "auth_accounts" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "auth_accounts_provider_idx" ON "auth_accounts" USING btree ("provider");
CREATE INDEX IF NOT EXISTS "auth_accounts_provider_account_id_idx" ON "auth_accounts" USING btree ("provider_account_id");
CREATE INDEX IF NOT EXISTS "auth_accounts_wallet_address_idx" ON "auth_accounts" USING btree ("wallet_address");
CREATE INDEX IF NOT EXISTS "auth_accounts_email_idx" ON "auth_accounts" USING btree ("email");
CREATE INDEX IF NOT EXISTS "auth_accounts_lookup_idx" ON "auth_accounts" USING btree ("provider","provider_account_id");
CREATE INDEX IF NOT EXISTS "campaigns_project_id_idx" ON "campaigns" USING btree ("project_id");
CREATE INDEX IF NOT EXISTS "campaigns_created_at_idx" ON "campaigns" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "campaigns_epoch_count_idx" ON "campaigns" USING btree ("epoch_count");
CREATE INDEX IF NOT EXISTS "campaigns_active_filter_idx" ON "campaigns" USING btree ("is_active","deleted_at");
CREATE INDEX IF NOT EXISTS "epochs_project_id_idx" ON "epochs" USING btree ("project_id");
CREATE INDEX IF NOT EXISTS "epochs_campaign_idx" ON "epochs" USING btree ("project_id","campaign_index");
CREATE INDEX IF NOT EXISTS "epochs_start_date_idx" ON "epochs" USING btree ("start_date");
CREATE INDEX IF NOT EXISTS "epochs_end_date_idx" ON "epochs" USING btree ("end_date");
CREATE INDEX IF NOT EXISTS "epochs_created_at_idx" ON "epochs" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "epochs_active_filter_idx" ON "epochs" USING btree ("is_active","deleted_at");
CREATE INDEX IF NOT EXISTS "otp_codes_user_id_idx" ON "otp_codes" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "otp_codes_identifier_idx" ON "otp_codes" USING btree ("identifier");
CREATE INDEX IF NOT EXISTS "otp_codes_code_idx" ON "otp_codes" USING btree ("code");
CREATE INDEX IF NOT EXISTS "otp_codes_type_idx" ON "otp_codes" USING btree ("type");
CREATE INDEX IF NOT EXISTS "otp_codes_expires_at_idx" ON "otp_codes" USING btree ("expires_at");
CREATE INDEX IF NOT EXISTS "projects_campaign_count_idx" ON "projects" USING btree ("campaign_count");
CREATE INDEX IF NOT EXISTS "refresh_tokens_user_id_idx" ON "refresh_tokens" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "refresh_tokens_token_idx" ON "refresh_tokens" USING btree ("token");
CREATE INDEX IF NOT EXISTS "refresh_tokens_expires_at_idx" ON "refresh_tokens" USING btree ("expires_at");
CREATE INDEX IF NOT EXISTS "refresh_tokens_device_id_idx" ON "refresh_tokens" USING btree ("device_id");
CREATE INDEX IF NOT EXISTS "rewards_campaign_idx" ON "rewards" USING btree ("project_id","campaign_index");
CREATE INDEX IF NOT EXISTS "rewards_token_idx" ON "rewards" USING btree ("token");
CREATE INDEX IF NOT EXISTS "rewards_amount_idx" ON "rewards" USING btree ("amount");
CREATE INDEX IF NOT EXISTS "rewards_active_filter_idx" ON "rewards" USING btree ("is_active","deleted_at");
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "sessions_session_token_idx" ON "sessions" USING btree ("session_token");
CREATE INDEX IF NOT EXISTS "sessions_expires_at_idx" ON "sessions" USING btree ("expires_at");
CREATE INDEX IF NOT EXISTS "sessions_device_id_idx" ON "sessions" USING btree ("device_id");
CREATE INDEX IF NOT EXISTS "tweets_epoch_idx" ON "tweets" USING btree ("project_id","campaign_index","epoch_index");
CREATE INDEX IF NOT EXISTS "tweets_user_id_idx" ON "tweets" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "tweets_user_epoch_idx" ON "tweets" USING btree ("user_id","project_id","campaign_index","epoch_index");
CREATE INDEX IF NOT EXISTS "tweets_twitter_user_id_idx" ON "tweets" USING btree ("twitter_user_id");
CREATE INDEX IF NOT EXISTS "tweets_post_id_idx" ON "tweets" USING btree ("post_id");
CREATE INDEX IF NOT EXISTS "tweets_posted_at_idx" ON "tweets" USING btree ("posted_at");
CREATE INDEX IF NOT EXISTS "tweets_created_at_idx" ON "tweets" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "tweets_likes_idx" ON "tweets" USING btree ("likes");
CREATE INDEX IF NOT EXISTS "tweets_retweets_idx" ON "tweets" USING btree ("retweets");
CREATE INDEX IF NOT EXISTS "tweets_active_filter_idx" ON "tweets" USING btree ("is_active","deleted_at");
CREATE INDEX IF NOT EXISTS "user_epoch_scores_epoch_idx" ON "user_epoch_scores" USING btree ("project_id","campaign_index","epoch_index");
CREATE INDEX IF NOT EXISTS "user_epoch_scores_user_id_idx" ON "user_epoch_scores" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "user_epoch_scores_points_idx" ON "user_epoch_scores" USING btree ("points");
CREATE INDEX IF NOT EXISTS "user_epoch_scores_epoch_points_idx" ON "user_epoch_scores" USING btree ("project_id","campaign_index","epoch_index","points");
CREATE INDEX IF NOT EXISTS "user_epoch_scores_created_at_idx" ON "user_epoch_scores" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "user_epoch_scores_active_filter_idx" ON "user_epoch_scores" USING btree ("is_active","deleted_at");
CREATE INDEX IF NOT EXISTS "user_roles_user_id_idx" ON "user_roles" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "user_roles_role_idx" ON "user_roles" USING btree ("role");
CREATE INDEX IF NOT EXISTS "user_roles_user_role_idx" ON "user_roles" USING btree ("user_id","role");
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
CREATE INDEX IF NOT EXISTS "users_twitter_id_idx" ON "users" USING btree ("twitter_id");
CREATE INDEX IF NOT EXISTS "users_username_idx" ON "users" USING btree ("username");
CREATE INDEX IF NOT EXISTS "users_wallet_address_idx" ON "users" USING btree ("wallet_address");
CREATE INDEX IF NOT EXISTS "users_privy_id_idx" ON "users" USING btree ("privy_id");
CREATE INDEX IF NOT EXISTS "users_total_points_idx" ON "users" USING btree ("total_points");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "users_active_filter_idx" ON "users" USING btree ("is_active","deleted_at");
CREATE INDEX IF NOT EXISTS "verification_tokens_identifier_idx" ON "verification_tokens" USING btree ("identifier");
CREATE INDEX IF NOT EXISTS "verification_tokens_token_idx" ON "verification_tokens" USING btree ("token");
CREATE INDEX IF NOT EXISTS "verification_tokens_type_idx" ON "verification_tokens" USING btree ("type");
CREATE INDEX IF NOT EXISTS "verification_tokens_user_id_idx" ON "verification_tokens" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "verification_tokens_expires_at_idx" ON "verification_tokens" USING btree ("expires_at");

-- Add missing unique constraint for auth_accounts (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'auth_accounts_provider_unique'
    ) THEN
        ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_provider_unique" UNIQUE("provider","provider_account_id");
    END IF;
END $$;

-- Add missing foreign keys (only if they don't exist and data is valid)
-- Note: These will fail if there's orphaned data, so verify data integrity first

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'api_keys_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'auth_accounts_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'campaigns_project_id_projects_id_fk'
    ) THEN
        ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_project_id_projects_id_fk" 
        FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'epochs_project_id_campaign_index_campaigns_project_id_index_fk'
    ) THEN
        ALTER TABLE "epochs" ADD CONSTRAINT "epochs_project_id_campaign_index_campaigns_project_id_index_fk" 
        FOREIGN KEY ("project_id","campaign_index") REFERENCES "public"."campaigns"("project_id","index") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'otp_codes_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "otp_codes" ADD CONSTRAINT "otp_codes_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'refresh_tokens_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'rewards_project_id_campaign_index_campaigns_project_id_index_fk'
    ) THEN
        ALTER TABLE "rewards" ADD CONSTRAINT "rewards_project_id_campaign_index_campaigns_project_id_index_fk" 
        FOREIGN KEY ("project_id","campaign_index") REFERENCES "public"."campaigns"("project_id","index") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'sessions_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'tweets_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "tweets" ADD CONSTRAINT "tweets_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'tweets_project_id_campaign_index_epoch_index_epochs_project_id_campaign_index_index_fk'
    ) THEN
        ALTER TABLE "tweets" ADD CONSTRAINT "tweets_project_id_campaign_index_epoch_index_epochs_project_id_campaign_index_index_fk" 
        FOREIGN KEY ("project_id","campaign_index","epoch_index") REFERENCES "public"."epochs"("project_id","campaign_index","index") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_epoch_scores_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "user_epoch_scores" ADD CONSTRAINT "user_epoch_scores_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_epoch_scores_project_id_campaign_index_epoch_index_epochs_project_id_campaign_index_index_fk'
    ) THEN
        ALTER TABLE "user_epoch_scores" ADD CONSTRAINT "user_epoch_scores_project_id_campaign_index_epoch_index_epochs_project_id_campaign_index_index_fk" 
        FOREIGN KEY ("project_id","campaign_index","epoch_index") REFERENCES "public"."epochs"("project_id","campaign_index","index") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'verification_tokens_user_id_users_id_fk'
    ) THEN
        ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_id_users_id_fk" 
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;

