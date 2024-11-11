import type { MuwnoUser, MuwnoProduct } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Loads product only if user can access it.
 */
export default dataFn(async function muwnoGetProduct(
  userID: MuwnoUser["id"],
  productID: MuwnoProduct["id"],
) {
  const user = await apiDB
    .selectFrom("muwno_user")
    .select("org_id")
    .where("id", "=", userID)
    .executeTakeFirstOrThrow();

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user: ${userID}`);
  }

  if (user.org_id === null) {
    throw new NotFoundException(`User '${userID}' does not have an Org`);
  }

  const product = await apiDB
    .selectFrom("muwno_product")
    .selectAll()
    .where("id", "=", productID)
    .where("org_id", "=", user.org_id)
    .executeTakeFirst();

  if (product === undefined) {
    throw new NotFoundException(`Cannot find product: ${productID}`);
  }

  return product;
});
