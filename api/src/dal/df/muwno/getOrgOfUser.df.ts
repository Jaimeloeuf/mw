import type { MuwnoUser } from "../../kysely/index.js";

import {
  NotFoundException,
  InvalidInternalStateException,
} from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get a user's Org Entity object back if they belong to an Org
 *
 * ### Internal notes
 * Implementing this as a multi-part query instead of a single right join like
 * ```typescript
 * return apiDB
 *   .selectFrom("muwno_user")
 *   .where("muwno_user.id", "=", userID)
 *   .rightJoin("muwno_org", "muwno_user.org_id", "muwno_org.id")
 *   .selectAll("muwno_org")
 *   .executeTakeFirst();
 * ```
 * so that the error messages can be more detailed on where the error originated
 * from rather than just a simple Org not found.
 */
export default dataFn(async function muwnoGetOrgOfUser(userID: MuwnoUser["id"]) {
  const user = await apiDB
    .selectFrom("muwno_user")
    .select("org_id")
    .where("id", "=", userID)
    .executeTakeFirst();

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user: ${userID}`);
  }

  if (user.org_id === null) {
    throw new NotFoundException(`User '${userID}' does not have an Org`);
  }

  const org = await apiDB
    .selectFrom("muwno_org")
    .selectAll()
    .where("id", "=", user.org_id)
    .executeTakeFirst();

  if (org === undefined) {
    throw new InvalidInternalStateException(
      `User '${userID}' has an invalid org_id '${user.org_id}'`,
    );
  }

  return org;
});
