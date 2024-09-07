import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser, UpdateMuwnoUser } from "../../kysely/index.js";

export async function deactivateUser(userID: MuwnoUser["id"]) {
  await apiDB
    .updateTable("muwno_user")
    .set({
      deactivated: true,
    })
    .where("id", "=", userID)
    .execute();
}
