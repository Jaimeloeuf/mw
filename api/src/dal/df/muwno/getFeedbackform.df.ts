import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

/**
 * Get a feedback form object.
 */
export default dataFn(async function getFeedbackform(
  productID: MuwnoProduct["id"],
) {
  const product = await apiDB
    .selectFrom("muwno_product")
    .select(["name", "link"])
    .where("id", "=", productID)
    .executeTakeFirst();

  if (product === undefined) {
    throw new NotFoundException(`Cannot find product: ${productID}`);
  }

  return product;
});
