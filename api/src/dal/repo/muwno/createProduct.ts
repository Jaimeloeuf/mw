import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoProduct } from "../../kysely/index.js";

export async function createProduct(product: CreateMuwnoProduct) {
  return apiDB
    .insertInto("muwno_product")
    .values(product)
    .returningAll()
    .executeTakeFirstOrThrow();
}
