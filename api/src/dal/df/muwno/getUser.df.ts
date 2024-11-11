import type { MuwnoUser } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get User Entity object, throws `NotFoundException` if not found.
 */
export default dataFn(async function muwnoGetUser(userID: MuwnoUser["id"]) {
  const user = await apiDB
    .selectFrom("muwno_user")
    .selectAll()
    .where("id", "=", userID)
    .executeTakeFirst();

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user: ${userID}`);
  }

  return user;
});
