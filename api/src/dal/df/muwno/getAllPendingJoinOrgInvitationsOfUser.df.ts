import type { MuwnoTeamMemberInvitation } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get all pending team invitations of a given user.
 */
export default dataFn(function getAllPendingJoinOrgInvitationsOfUser(
  invitee_email: MuwnoTeamMemberInvitation["invitee_email"],
) {
  return apiDB
    .selectFrom("muwno_team_member_invitation")
    .selectAll("muwno_team_member_invitation")
    .where("muwno_team_member_invitation.invitee_email", "=", invitee_email)
    .rightJoin(
      "muwno_user",
      "muwno_team_member_invitation.inviter_user_id",
      "muwno_user.id",
    )
    .select([
      "muwno_user.name as inviter_name",
      "muwno_user.role as inviter_role",
    ])
    .rightJoin(
      "muwno_org",
      "muwno_team_member_invitation.org_id",
      "muwno_org.id",
    )
    .select("muwno_org.name as org_name")
    .execute();
});
