import type { MuwnoApiKey } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get a single API Key Detail object back using its ID.
 */
export default dataFn(async function getApiKey(apiKeyID: MuwnoApiKey["id"]) {
  const apiKey = await apiDB
    .selectFrom("muwno_api_key")
    .selectAll()
    .where("id", "=", apiKeyID)
    .executeTakeFirst();

  if (apiKey === undefined) {
    throw new NotFoundException(`Cannot find API Key: ${apiKeyID}`);
  }

  return apiKey;
});
