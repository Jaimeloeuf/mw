import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoTeamMemberInvitation } from "../../kysely/index.js";

export default dataFn(async function deletePendingJoinOrgInvitation(
  invitationID: MuwnoTeamMemberInvitation["id"],
) {
  await apiDB
    .deleteFrom("muwno_team_member_invitation")
    .where("id", "=", invitationID)
    .execute();
});
