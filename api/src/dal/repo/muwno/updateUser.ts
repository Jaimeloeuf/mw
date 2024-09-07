import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser, UpdateMuwnoUser } from "../../kysely/index.js";

export async function updateUser(
  userID: MuwnoUser["id"],
  user: UpdateMuwnoUser,
) {
  return apiDB
    .updateTable("muwno_user")
    .set(user)
    .where("id", "=", userID)
    .returningAll()
    .executeTakeFirstOrThrow();
}
