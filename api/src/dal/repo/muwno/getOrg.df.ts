import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getOrg(orgID: MuwnoOrg["id"]) {
  const org = await apiDB
    .selectFrom("muwno_org")
    .selectAll()
    .where("id", "=", orgID)
    .executeTakeFirst();

  if (org === undefined) {
    throw new NotFoundException(`Cannot find org: ${orgID}`);
  }

  return org;
}
