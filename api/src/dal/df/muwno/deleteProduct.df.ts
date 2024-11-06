import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";

export default dataFn(async function deleteProduct(
  productID: MuwnoProduct["id"],
) {
  await apiDB.deleteFrom("muwno_product").where("id", "=", productID).execute();
});
