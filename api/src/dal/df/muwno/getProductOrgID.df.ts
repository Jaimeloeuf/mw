import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

/**
 * Get a product's Org ID.
 */
export default dataFn(async function getProductOrgID(
  productID: MuwnoProduct["id"],
) {
  const product = await apiDB
    .selectFrom("muwno_product")
    .select("org_id")
    .where("id", "=", productID)
    .executeTakeFirst();

  if (product === undefined) {
    throw new NotFoundException(`Cannot find product: ${productID}`);
  }

  return product.org_id;
});