import type {
  ColumnType,
  JSONColumnType,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

/**
 * Table for next actions to execute on Stripe SetupIntent completing
 * successfully.
 */
export interface MuwnoStripeSetupNextTable {
  /**
   * Unique opaque ID that cannot be updated.
   * This is Stripe's unique setup intent ID.
   */
  stripe_setup_intent_id: ColumnType<string, string, never>;

  /**
   * Track when was the Stripe setup intent next action created
   */
  created_at: ColumnType<Date, string, never>;

  /**
   * Next action is stored as a JSON object since different next actions can
   * be structured differently. Not JSONB because we dont care about parsing
   * it as the DB level, we just need basic read/write on this can already
   */
  next: JSONColumnType<any>;
}

export type MuwnoStripeSetupNext = Selectable<MuwnoStripeSetupNextTable>;
export type CreateMuwnoStripeSetupNext = Insertable<MuwnoStripeSetupNextTable>;
export type UpdateMuwnoStripeSetupNext = Updateable<MuwnoStripeSetupNextTable>;
