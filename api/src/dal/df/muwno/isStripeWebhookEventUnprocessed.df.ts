import type { MuwnoStripeWebhookEvent } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Check if the given Stripe Webhook Event is unprocessed, if it is, return
 * true and record its ID so that it can be used for future checks.
 */
export default dataFn(async function isStripeWebhookEventUnprocessed(
  stripeWebhookEventID: MuwnoStripeWebhookEvent["stripe_event_id"],
  type: string,
  livemode: boolean,
) {
  return (
    apiDB
      .insertInto("muwno_stripe_webhook_event")
      .values({
        stripe_event_id: stripeWebhookEventID,
        type,
        livemode,
        processed: false,
      })

      // Using the DB unique constraint check to see if this event has been
      // processed before, so this needs to throw in order to check it.
      .executeTakeFirstOrThrow()

      // Return true on successful write to indicate that event is unprocessed.
      .then(() => true)

      .catch((err) => {
        // Check to ensure it is primary key constraint violation, if it is,
        // it means that the event has already been sent by Stripe and
        // received by the webhook, therefore there is no need to process it
        // again. Return false to indicate that the event is processed before.
        // 23505 is the PostgreSQL error code for unique constraint violation.
        if (err?.code === "23505") {
          return false;
        }

        // If it is some other error, re throw the error since this method
        // should return neither true nor false.
        throw err;
      })
  );
});
