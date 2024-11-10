import type { CreateMuwnoApiKey } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

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
