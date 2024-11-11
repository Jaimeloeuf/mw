import type { MuwnoProduct, UpdateMuwnoProduct } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(function muwnoUpdateProduct(
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
