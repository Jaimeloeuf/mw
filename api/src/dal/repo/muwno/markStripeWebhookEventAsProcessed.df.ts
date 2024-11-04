import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoStripeWebhookEvent } from "../../kysely/index.js";

/**
 * Mark a given Stripe Webhook Event as processed.
 */
export default dataFn(async function markStripeWebhookEventAsProcessed(
  stripeWebhookEventID: MuwnoStripeWebhookEvent["stripe_event_id"],
) {
  await apiDB
    .updateTable("muwno_stripe_webhook_event")
    .set({
      processed: true,
    })
    .where("stripe_event_id", "=", stripeWebhookEventID)
    .executeTakeFirstOrThrow();
});
