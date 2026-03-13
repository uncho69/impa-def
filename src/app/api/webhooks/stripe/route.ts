import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { pool } from "@/lib/db";
import { ensureAccessControlTables } from "@/lib/db/ensure-access-control-tables";

export const dynamic = "force-dynamic";

function getStripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

async function upsertEntitlementsFromSubscription(params: {
  userId: string;
  subscriptionId: string;
  stripeCustomerId: string | null;
  status: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}) {
  if (!pool) return;
  await ensureAccessControlTables();
  const isActive = ["active", "trialing"].includes(params.status);

  await pool.query(
    `
    INSERT INTO subscriptions (
      id,
      user_id,
      stripe_customer_id,
      status,
      current_period_end,
      cancel_at_period_end,
      created_at,
      updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, now(), now())
    ON CONFLICT (id)
    DO UPDATE SET
      user_id = EXCLUDED.user_id,
      stripe_customer_id = EXCLUDED.stripe_customer_id,
      status = EXCLUDED.status,
      current_period_end = EXCLUDED.current_period_end,
      cancel_at_period_end = EXCLUDED.cancel_at_period_end,
      updated_at = now()
    `,
    [
      params.subscriptionId,
      params.userId,
      params.stripeCustomerId,
      params.status,
      params.currentPeriodEnd,
      params.cancelAtPeriodEnd ? 1 : 0,
    ],
  );

  await pool.query(
    `
    INSERT INTO entitlements (user_id, plan, can_view_premium, max_projects_per_category, updated_at)
    VALUES ($1, $2, $3, $4, now())
    ON CONFLICT (user_id)
    DO UPDATE SET
      plan = EXCLUDED.plan,
      can_view_premium = EXCLUDED.can_view_premium,
      max_projects_per_category = EXCLUDED.max_projects_per_category,
      updated_at = now()
    `,
    [params.userId, isActive ? "pro" : "free", isActive ? 1 : 0, isActive ? 999 : 1],
  );
}

function getUserIdFromMetadata(subscription: Stripe.Subscription): string | null {
  const metadataUserId = subscription.metadata?.userId?.trim();
  return metadataUserId && metadataUserId.length > 0 ? metadataUserId : null;
}

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook non configurato" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature", details: String(error) }, { status: 400 });
  }

  try {
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = getUserIdFromMetadata(subscription);
      if (userId) {
        await upsertEntitlementsFromSubscription({
          userId,
          subscriptionId: subscription.id,
          stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : null,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000)
            : null,
          cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end),
        });
      }
    }
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

