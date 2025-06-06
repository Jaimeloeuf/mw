import type { MuwnoApiKey } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get API Key's corresponding Org.
 */
export default dataFn(function muwnoGetApiKeyOrg(apiKeyHash: MuwnoApiKey["hash"]) {
  return apiDB
    .selectFrom("muwno_api_key")
    .where("hash", "=", apiKeyHash)
    .rightJoin("muwno_org", "muwno_api_key.org_id", "muwno_org.id")
    .selectAll("muwno_org")
    .executeTakeFirst();
});
