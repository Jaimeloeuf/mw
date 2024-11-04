import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoApiKey } from "../../kysely/index.js";

/**
 * Save a newly created API Key.
 */
export default dataFn(async function createApiKey(
  apiKey: OptionalID<CreateMuwnoApiKey>,
) {
  return apiDB
    .insertInto("muwno_api_key")
    .values(injectID(apiKey))
    .returningAll()
    .executeTakeFirstOrThrow();
});
