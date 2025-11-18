ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_identifier_type_unique";--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_identifier_type_unique" UNIQUE("identifier","type");--> statement-breakpoint
DROP INDEX IF EXISTS "users_clerk_id_idx";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "clerk_id";--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_pkey";--> statement-breakpoint
ALTER TABLE "user_roles" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_user_role_unique";--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY("user_id","role");