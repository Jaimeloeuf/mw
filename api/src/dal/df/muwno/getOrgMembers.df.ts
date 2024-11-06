import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg } from "../../kysely/index.js";

/**
 * Get all members of the Org team, sorted by newest member first.
 */
export default dataFn(function getOrgMembers(orgID: MuwnoOrg["id"]) {
  return apiDB
    .selectFrom("muwno_user")
    .where("org_id", "=", orgID)
    .orderBy("created_at desc")
    .execute();
});
