import type { CreateMuwnoUser } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

export default dataFn(function muwnoCreateUser(user: OptionalID<CreateMuwnoUser>) {
  return apiDB
    .insertInto("muwno_user")
    .values(injectID(user))
    .returningAll()
    .executeTakeFirstOrThrow();
});
