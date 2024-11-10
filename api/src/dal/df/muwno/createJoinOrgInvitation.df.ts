import type { CreateMuwnoTeamMemberInvitation } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

export default dataFn(async function createJoinOrgInvitation(
  teamMemberInvitation: OptionalID<CreateMuwnoTeamMemberInvitation>,
) {
  // @todo Upsert...
  return apiDB
    .insertInto("muwno_team_member_invitation")
    .values(injectID(teamMemberInvitation))
    .returningAll()
    .executeTakeFirstOrThrow();
});
