import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoStripeSetupNext } from "../../kysely/index.js";

export async function createStripeSetupNext(
  stripeSetupNext: CreateMuwnoStripeSetupNext,
) {
  return apiDB
    .insertInto("muwno_stripe_setup_next")
    .values(stripeSetupNext)
    .returningAll()
    .executeTakeFirstOrThrow();
}
