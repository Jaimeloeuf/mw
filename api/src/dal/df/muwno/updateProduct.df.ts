import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct, UpdateMuwnoProduct } from "../../kysely/index.js";

export default dataFn(function updateProduct(
  productID: MuwnoProduct["id"],
  product: UpdateMuwnoProduct,
) {
  return apiDB
    .updateTable("muwno_product")
    .set(product)
    .where("id", "=", productID)
    .returningAll()
    .executeTakeFirstOrThrow();
});