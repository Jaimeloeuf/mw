import type { MuwnoUser } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get all products of the user's Org.
 */
export default dataFn(async function muwnoGetProductsOfUserOrg(
  userID: MuwnoUser["id"],
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

  const products = await apiDB
    .selectFrom("muwno_product")
    .selectAll()
    .where("org_id", "=", user.org_id)
    .orderBy("created_at desc")
    .execute();

  return products;
});
