import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoCustomer } from "../../kysely/index.js";

export async function createCustomer(
  customer: OptionalID<CreateMuwnoCustomer>,
) {
  return apiDB
    .insertInto("muwno_customer")
    .values(injectID(customer))
    .returningAll()
    .executeTakeFirstOrThrow();
}
