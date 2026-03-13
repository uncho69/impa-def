CREATE TABLE "support_conversations" (
  "id" varchar(255) PRIMARY KEY,
  "user_id" varchar(50) NOT NULL,
  "status" varchar(20) NOT NULL DEFAULT 'OPEN',
  "reason" varchar(100) NOT NULL,
  "assigned_admin_id" varchar(50),
  "last_message_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "support_conversations"
  ADD CONSTRAINT "support_conversations_user_id_users_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "support_conversations"
  ADD CONSTRAINT "support_conversations_assigned_admin_id_users_id_fk"
  FOREIGN KEY ("assigned_admin_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "support_conversations_user_idx" ON "support_conversations" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "support_conversations_status_idx" ON "support_conversations" USING btree ("status");
--> statement-breakpoint
CREATE INDEX "support_conversations_last_message_idx" ON "support_conversations" USING btree ("last_message_at");
--> statement-breakpoint

CREATE TABLE "support_messages" (
  "id" serial PRIMARY KEY,
  "conversation_id" varchar(255) NOT NULL,
  "sender_type" varchar(10) NOT NULL,
  "sender_user_id" varchar(50),
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "support_messages"
  ADD CONSTRAINT "support_messages_conversation_id_support_conversations_id_fk"
  FOREIGN KEY ("conversation_id") REFERENCES "public"."support_conversations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "support_messages"
  ADD CONSTRAINT "support_messages_sender_user_id_users_id_fk"
  FOREIGN KEY ("sender_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "support_messages_conversation_idx" ON "support_messages" USING btree ("conversation_id");
--> statement-breakpoint
CREATE INDEX "support_messages_created_at_idx" ON "support_messages" USING btree ("created_at");

