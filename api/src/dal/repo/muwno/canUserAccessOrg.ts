import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser, MuwnoOrg } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function canUserAccessOrg(
  userID: MuwnoUser["id"],
  orgID: MuwnoOrg["id"],
) {
  const user = await apiDB
    .selectFrom("muwno_user")
    .select("org_id")
    .where("id", "=", userID)
    .executeTakeFirstOrThrow();

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user: ${userID}`);
  }

  return user.org_id === orgID;
}
