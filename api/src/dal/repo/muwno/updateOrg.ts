import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg, UpdateMuwnoOrg } from "../../kysely/index.js";

export async function updateOrg(orgID: MuwnoOrg["id"], org: UpdateMuwnoOrg) {
  return apiDB
    .updateTable("muwno_org")
    .set(org)
    .where("id", "=", orgID)
    .returningAll()
    .executeTakeFirstOrThrow();
}
