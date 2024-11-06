import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoApiKey } from "../../kysely/index.js";

/**
 * Get API Key's corresponding Org.
 */
export default dataFn(function getApiKeyOrg(apiKeyHash: MuwnoApiKey["hash"]) {
  return apiDB
    .selectFrom("muwno_api_key")
    .where("hash", "=", apiKeyHash)
    .rightJoin("muwno_org", "muwno_api_key.org_id", "muwno_org.id")
    .selectAll("muwno_org")
    .executeTakeFirst();
});
