import type { MuwnoUser } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Remove member from team and all their data from the team.
 */
export default dataFn(async function muwnoRemoveOrgMember(userID: MuwnoUser["id"]) {
  await apiDB
    .deleteFrom("muwno_team_member_invitation")
    .where("inviter_user_id", "=", userID)
    .execute();

  await apiDB
    .updateTable("muwno_user")
    .where("id", "=", userID)
    .set({
      org_id: null,
    })
    .execute();
});
