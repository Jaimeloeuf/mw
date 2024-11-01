import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoTeamMemberInvitation } from "../../kysely/index.js";

export async function createJoinOrgInvitation(
  teamMemberInvitation: OptionalID<CreateMuwnoTeamMemberInvitation>,
) {
  return apiDB
    .insertInto("muwno_team_member_invitation")
    .values(injectID(teamMemberInvitation))
    .returningAll()
    .executeTakeFirstOrThrow();
}
