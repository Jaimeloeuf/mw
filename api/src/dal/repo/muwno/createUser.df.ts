import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoUser } from "../../kysely/index.js";

export async function createUser(user: OptionalID<CreateMuwnoUser>) {
  return apiDB
    .insertInto("muwno_user")
    .values(injectID(user))
    .returningAll()
    .executeTakeFirstOrThrow();
}
