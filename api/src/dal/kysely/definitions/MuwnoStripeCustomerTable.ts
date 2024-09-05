import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export interface MuwnoStripeCustomerTable {
  /**
   * Unique opaque ID that cannot be updated.
   * This is Stripe's unique Customer ID.
   */
  stripe_customer_id: ColumnType<string, string, never>;

  /**
   * Track when was the Stripe Customer created
   */
  created_at: ColumnType<Date, string | undefined, never>;

  /**
   * The corresponding Org ID of this Stripe Customer
   */
  org_id: string;

  /**
   * The metered product's Stripe Subscription ID
   */
  metered_subscription_id: string;
}

export type MuwnoStripeCustomer = Selectable<MuwnoStripeCustomerTable>;
export type CreateMuwnoStripeCustomer = Insertable<MuwnoStripeCustomerTable>;
export type UpdateMuwnoStripeCustomer = Updateable<MuwnoStripeCustomerTable>;
