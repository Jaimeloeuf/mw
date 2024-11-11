import type { MuwnoStripeSetupNext } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Delete one from the database
 */
export default dataFn(async function muwnoDeleteStripeSetupNext(
  stripeSetupNextID: MuwnoStripeSetupNext["stripe_setup_intent_id"],
) {
  await apiDB
    .deleteFrom("muwno_stripe_setup_next")
    .where("stripe_setup_intent_id", "=", stripeSetupNextID)
    .execute();
});
