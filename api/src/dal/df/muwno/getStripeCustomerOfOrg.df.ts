import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

/**
 * Get a `StripeCustomer` object back using a `OrgID`.
 */
export default dataFn(async function getStripeCustomerOfOrg(
  orgID: MuwnoOrg["id"],
) {
  const stripeCustomer = await apiDB
    .selectFrom("muwno_stripe_customer")
    .selectAll()
    .where("org_id", "=", orgID)
    .executeTakeFirst();

  if (stripeCustomer === undefined) {
    throw new NotFoundException(
      `Cannot find stripe customer of org '${orgID}'`,
    );
  }

  return stripeCustomer;
});