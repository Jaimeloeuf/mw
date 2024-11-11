import type { MuwnoTeamMemberInvitation } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function muwnoDeletePendingJoinOrgInvitation(
  invitationID: MuwnoTeamMemberInvitation["id"],
) {
  await apiDB
    .deleteFrom("muwno_team_member_invitation")
    .where("id", "=", invitationID)
    .execute();
});
