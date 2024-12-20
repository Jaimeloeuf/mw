import type { MuwnoOrg } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get all members of the Org team, sorted by newest member first.
 */
export default dataFn(function muwnoGetOrgMembers(orgID: MuwnoOrg["id"]) {
  return apiDB
    .selectFrom("muwno_user")
    .where("org_id", "=", orgID)
    .orderBy("created_at desc")
    .execute();
});
