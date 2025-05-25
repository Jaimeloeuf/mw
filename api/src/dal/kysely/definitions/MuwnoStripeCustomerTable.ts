import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

import type { CreatedAtColumnType } from "./types/index.js";

export interface MuwnoStripeCustomerTable {
  /**
   * Unique opaque ID that cannot be updated.
   * This is Stripe's unique Customer ID.
   */
  stripe_customer_id: ColumnType<string, string, never>;

  /**
   * Track when was the Stripe Customer created
   */
  created_at: CreatedAtColumnType;

  /**
   * The corresponding Org ID of this Stripe Customer
   */
  org_id: string;

  /**
   * This is Stripe's Subscription ID for the metered product. This is nullable
   * since this is only set once the subscription goes into effect.
   */
  metered_subscription_id: $Nullable<string>;
}

export type MuwnoStripeCustomer = Selectable<MuwnoStripeCustomerTable>;
export type CreateMuwnoStripeCustomer = Insertable<MuwnoStripeCustomerTable>;
export type UpdateMuwnoStripeCustomer = Updateable<MuwnoStripeCustomerTable>;
