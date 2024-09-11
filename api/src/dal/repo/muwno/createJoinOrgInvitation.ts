import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoTeamMemberInvitation } from "../../kysely/index.js";

export async function createJoinOrgInvitation(
  teamMemberInvitation: CreateMuwnoTeamMemberInvitation,
) {
  return apiDB
    .insertInto("muwno_team_member_invitation")
    .values(teamMemberInvitation)
    .returningAll()
    .executeTakeFirstOrThrow();
}
