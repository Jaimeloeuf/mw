import { apiDB } from "../../kysely/index.js";
import type { MuwnoApiKey } from "../../kysely/index.js";

export async function deleteApiKey(apiKeyID: MuwnoApiKey["id"]) {
  await apiDB.deleteFrom("muwno_api_key").where("id", "=", apiKeyID).execute();
}
