import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoApiKey } from "../../kysely/index.js";

export async function createApiKey(apiKey: OptionalID<CreateMuwnoApiKey>) {
  return apiDB
    .insertInto("muwno_api_key")
    .values(injectID(apiKey))
    .returningAll()
    .executeTakeFirstOrThrow();
}
