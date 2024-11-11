import type { CreateMuwnoStripeSetupNext } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Save a Stripe Setup Next action into the database
 */
export default dataFn(function muwnoCreateStripeSetupNext(
  stripeSetupNext: CreateMuwnoStripeSetupNext,
) {
  return apiDB
    .insertInto("muwno_stripe_setup_next")
    .values(stripeSetupNext)
    .returningAll()
    .executeTakeFirstOrThrow();
});
