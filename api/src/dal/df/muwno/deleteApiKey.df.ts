import type { MuwnoApiKey } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Delete an API Key.
 */
export default dataFn(async function deleteApiKey(apiKeyID: MuwnoApiKey["id"]) {
  await apiDB.deleteFrom("muwno_api_key").where("id", "=", apiKeyID).execute();
});
