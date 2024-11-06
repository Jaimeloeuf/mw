import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg, UpdateMuwnoOrg } from "../../kysely/index.js";

export default dataFn(function updateOrg(
  orgID: MuwnoOrg["id"],
  org: UpdateMuwnoOrg,
) {
  return apiDB
    .updateTable("muwno_org")
    .set(org)
    .where("id", "=", orgID)
    .returningAll()
    .executeTakeFirstOrThrow();
});
