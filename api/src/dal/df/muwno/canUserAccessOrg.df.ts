import type { MuwnoUser, MuwnoOrg } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Check if user have access permission to this Org.
 */
export default dataFn(async function muwnoCanUserAccessOrg(
  userID: MuwnoUser["id"],
  orgID: MuwnoOrg["id"],
) {
  const user = await apiDB
    .selectFrom("muwno_user")
    .select("org_id")
    .where("id", "=", userID)
    .executeTakeFirstOrThrow();

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user: ${userID}`);
  }

  return user.org_id === orgID;
});
