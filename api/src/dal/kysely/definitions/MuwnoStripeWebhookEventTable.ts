import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { CreatedAtColumnType } from "./types/index.js";

export interface MuwnoStripeWebhookEventTable {
  /**
   * Unique opaque ID that cannot be updated. This is Stripe's unique event ID,
   * which is also used as the indempotency key.
   */
  stripe_event_id: ColumnType<string, string, never>;

  /**
   * Track the time of DB insertion, not time where Stripe created the event.
   */
  created_at: CreatedAtColumnType;

  /**
   * Event type
   */
  type: string;

  /**
   * Is the event a live event or a testing event
   */
  livemode: boolean;

  /**
   * Is the event already processed
   */
  processed: boolean;
}

export type MuwnoStripeWebhookEvent = Selectable<MuwnoStripeWebhookEventTable>;
export type CreateMuwnoStripeWebhookEvent =
  Insertable<MuwnoStripeWebhookEventTable>;
export type UpdateMuwnoStripeWebhookEvent =
  Updateable<MuwnoStripeWebhookEventTable>;
