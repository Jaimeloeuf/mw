import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoStripeSetupNext } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

/**
 * Get one from the database
 */
export default dataFn(async function getStripeSetupNext(
  stripeSetupNextID: MuwnoStripeSetupNext["stripe_setup_intent_id"],
) {
  const stripeSetupNext = await apiDB
    .selectFrom("muwno_stripe_setup_next")
    .selectAll()
    .where("stripe_setup_intent_id", "=", stripeSetupNextID)
    .executeTakeFirst();

  if (stripeSetupNext === undefined) {
    throw new NotFoundException(
      `Cannot find stripe setup next intent: ${stripeSetupNextID}`,
    );
  }

  return stripeSetupNext;
});