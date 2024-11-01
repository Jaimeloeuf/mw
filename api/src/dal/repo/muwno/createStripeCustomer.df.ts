import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoStripeCustomer } from "../../kysely/index.js";

export async function createStripeCustomer(
  stripeCustomer: CreateMuwnoStripeCustomer,
) {
  return apiDB
    .insertInto("muwno_stripe_customer")
    .values(stripeCustomer)
    .returningAll()
    .executeTakeFirstOrThrow();
}
