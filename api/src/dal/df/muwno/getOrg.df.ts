import type { MuwnoOrg } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get a single Org Entity object back
 */
export default dataFn(async function muwnoGetOrg(orgID: MuwnoOrg["id"]) {
  const org = await apiDB
    .selectFrom("muwno_org")
    .selectAll()
    .where("id", "=", orgID)
    .executeTakeFirst();

  if (org === undefined) {
    throw new NotFoundException(`Cannot find org: ${orgID}`);
  }

  return org;
});
