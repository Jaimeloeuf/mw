import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";

export async function deleteProduct(productID: MuwnoProduct["id"]) {
  return apiDB
    .deleteFrom("muwno_product")
    .where("id", "=", productID)
    .execute();
}
