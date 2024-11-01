import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser } from "../../kysely/index.js";

export async function removeOrgMember(userID: MuwnoUser["id"]) {
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
}
