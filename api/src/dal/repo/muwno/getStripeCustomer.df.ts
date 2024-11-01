import { apiDB } from "../../kysely/index.js";
import type { MuwnoStripeCustomer } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getStripeCustomer(
  stripeCustomerID: MuwnoStripeCustomer["stripe_customer_id"],
) {
  const stripeCustomer = await apiDB
    .selectFrom("muwno_stripe_customer")
    .selectAll()
    .where("stripe_customer_id", "=", stripeCustomerID)
    .executeTakeFirst();

  if (stripeCustomer === undefined) {
    throw new NotFoundException(
      `Cannot find stripe customer: ${stripeCustomerID}`,
    );
  }

  return stripeCustomer;
}
