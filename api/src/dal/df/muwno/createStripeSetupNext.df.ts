import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoStripeSetupNext } from "../../kysely/index.js";

/**
 * Save a Stripe Setup Next action into the database
 */
export default dataFn(function createStripeSetupNext(
  stripeSetupNext: CreateMuwnoStripeSetupNext,
) {
  return apiDB
    .insertInto("muwno_stripe_setup_next")
    .values(stripeSetupNext)
    .returningAll()
    .executeTakeFirstOrThrow();
});
