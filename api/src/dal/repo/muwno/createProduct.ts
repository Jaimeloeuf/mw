import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoProduct } from "../../kysely/index.js";

export async function createProduct(product: OptionalID<CreateMuwnoProduct>) {
  return apiDB
    .insertInto("muwno_product")
    .values(injectID(product))
    .returningAll()
    .executeTakeFirstOrThrow();
}
