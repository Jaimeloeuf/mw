import { apiDB } from "../../kysely/index.js";
import type { MuwnoApiKey } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getApiKey(apiKeyID: MuwnoApiKey["id"]) {
  const apiKey = await apiDB
    .selectFrom("muwno_api_key")
    .selectAll()
    .where("id", "=", apiKeyID)
    .executeTakeFirst();

  if (apiKey === undefined) {
    throw new NotFoundException(`Cannot find API Key: ${apiKeyID}`);
  }

  return apiKey;
}
