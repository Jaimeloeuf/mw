import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoUser } from "../../kysely/index.js";

export async function createUser(user: CreateMuwnoUser) {
  return apiDB
    .insertInto("muwno_user")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}
