import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct, UpdateMuwnoProduct } from "../../kysely/index.js";

export async function updateProduct(
  productID: MuwnoProduct["id"],
  product: UpdateMuwnoProduct,
) {
  return apiDB
    .updateTable("muwno_product")
    .set(product)
    .where("id", "=", productID)
    .returningAll()
    .executeTakeFirstOrThrow();
}
