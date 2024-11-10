import type { CreateMuwnoStripeCustomer } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Create and save a new `StripeCustomer` object in data source. If `Org`
 * already have a StripeCustomer, replace it with this new one.
 */
export default dataFn(function createStripeCustomer(
  stripeCustomer: CreateMuwnoStripeCustomer,
) {
  return apiDB
    .insertInto("muwno_stripe_customer")
    .values(stripeCustomer)
    .returningAll()
    .executeTakeFirstOrThrow();
});
