import type { CreateMuwnoCustomer } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

// @todo Make sure this is idempotent for the same user with upsert or smth
/**
 * Add a new Customer to data source.
 */
export default dataFn(async function createCustomer(
  customer: OptionalID<CreateMuwnoCustomer>,
) {
  return apiDB
    .insertInto("muwno_customer")
    .values(injectID(customer))
    .returningAll()
    .executeTakeFirstOrThrow();
});
