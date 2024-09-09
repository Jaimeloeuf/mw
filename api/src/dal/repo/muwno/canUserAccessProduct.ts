import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser, MuwnoProduct } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function canUserAccessProduct(
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
    .select("id")
    .where("id", "=", productID)
    .where("org_id", "=", user.org_id)
    .executeTakeFirst();

  // If product cannot be loaded (undefined), it means user cannot access it
  return product !== undefined;
}
