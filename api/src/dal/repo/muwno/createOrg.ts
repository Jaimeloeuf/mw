import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoOrg } from "../../kysely/index.js";

export async function createOrg(org: CreateMuwnoOrg) {
  return apiDB
    .insertInto("muwno_org")
    .values(org)
    .returningAll()
    .executeTakeFirstOrThrow();
}
