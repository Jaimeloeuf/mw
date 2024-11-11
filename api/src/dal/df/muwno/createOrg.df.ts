import type { CreateMuwnoOrg } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

export default dataFn(function muwnoCreateOrg(org: OptionalID<CreateMuwnoOrg>) {
  return apiDB
    .insertInto("muwno_org")
    .values(injectID(org))
    .returningAll()
    .executeTakeFirstOrThrow();
});
