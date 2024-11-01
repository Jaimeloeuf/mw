import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getFeedbackform(productID: MuwnoProduct["id"]) {
  const product = await apiDB
    .selectFrom("muwno_product")
    .select(["name", "link"])
    .where("id", "=", productID)
    .executeTakeFirst();

  if (product === undefined) {
    throw new NotFoundException(`Cannot find product: ${productID}`);
  }

  return product;
}
