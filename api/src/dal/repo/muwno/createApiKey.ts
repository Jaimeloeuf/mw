import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoApiKey } from "../../kysely/index.js";

export async function createApiKey(apiKey: CreateMuwnoApiKey) {
  return apiDB
    .insertInto("muwno_api_key")
    .values(apiKey)
    .returningAll()
    .executeTakeFirstOrThrow();
}
