import type { MuwnoProduct } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function muwnoDeleteProduct(
  productID: MuwnoProduct["id"],
) {
  await apiDB.deleteFrom("muwno_product").where("id", "=", productID).execute();
});
