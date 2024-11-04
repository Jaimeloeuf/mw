import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoUser } from "../../kysely/index.js";

export default dataFn(function createUser(user: OptionalID<CreateMuwnoUser>) {
  return apiDB
    .insertInto("muwno_user")
    .values(injectID(user))
    .returningAll()
    .executeTakeFirstOrThrow();
});
