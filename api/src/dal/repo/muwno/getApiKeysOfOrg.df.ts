import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg } from "../../kysely/index.js";

export async function getApiKeysOfOrg(orgID: MuwnoOrg["id"]) {
  return apiDB
    .selectFrom("muwno_api_key")
    .selectAll()
    .where("org_id", "=", orgID)
    .orderBy("created_at desc")
    .execute();
}
