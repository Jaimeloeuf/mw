import type { MuwnoTeamMemberInvitation } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function muwnoGetPendingJoinOrgInvitation(
  invitationID: MuwnoTeamMemberInvitation["id"],
) {
  const invitation = await apiDB
    .selectFrom("muwno_team_member_invitation")
    .selectAll()
    .where("id", "=", invitationID)
    .executeTakeFirst();

  if (invitation === undefined) {
    throw new NotFoundException(`Cannot find invitation: ${invitationID}`);
  }

  return invitation;
});
