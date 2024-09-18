import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoCustomer } from "../../kysely/index.js";

export async function createCustomer(customer: CreateMuwnoCustomer) {
  return apiDB
    .insertInto("muwno_customer")
    .values(customer)
    .returningAll()
    .executeTakeFirstOrThrow();
}
