import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoOrg } from "../../kysely/index.js";

export default dataFn(function createOrg(org: OptionalID<CreateMuwnoOrg>) {
  return apiDB
    .insertInto("muwno_org")
    .values(injectID(org))
    .returningAll()
    .executeTakeFirstOrThrow();
});
