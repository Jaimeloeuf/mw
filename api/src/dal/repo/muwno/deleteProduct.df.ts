import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";

export async function deleteProduct(productID: MuwnoProduct["id"]) {
  await apiDB.deleteFrom("muwno_product").where("id", "=", productID).execute();
}
