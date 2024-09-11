import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg } from "../../kysely/index.js";

export async function getOrgMembers(orgID: MuwnoOrg["id"]) {
  return apiDB
    .selectFrom("muwno_user")
    .where("org_id", "=", orgID)
    .orderBy("created_at desc")
    .execute();
}
