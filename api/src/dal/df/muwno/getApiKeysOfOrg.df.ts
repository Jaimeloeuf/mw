import type { MuwnoOrg } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get all API Key Detail objects of the Org.
 */
export default dataFn(function muwnoGetApiKeysOfOrg(orgID: MuwnoOrg["id"]) {
  return apiDB
    .selectFrom("muwno_api_key")
    .selectAll()
    .where("org_id", "=", orgID)
    .orderBy("created_at desc")
    .execute();
});
