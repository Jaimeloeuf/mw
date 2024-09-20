import { apiDB } from "../../kysely/index.js";
import type { MuwnoApiKey } from "../../kysely/index.js";

export async function getApiKeyOrg(apiKeyHash: MuwnoApiKey["hash"]) {
  return apiDB
    .selectFrom("muwno_api_key")
    .where("hash", "=", apiKeyHash)
    .rightJoin("muwno_org", "muwno_api_key.org_id", "muwno_org.id")
    .selectAll("muwno_org")
    .executeTakeFirst();
}
