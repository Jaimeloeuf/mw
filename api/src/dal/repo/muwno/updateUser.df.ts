import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser, UpdateMuwnoUser } from "../../kysely/index.js";

export default dataFn(function updateUser(
  userID: MuwnoUser["id"],
  user: UpdateMuwnoUser,
) {
  return apiDB
    .updateTable("muwno_user")
    .set(user)
    .where("id", "=", userID)
    .returningAll()
    .executeTakeFirstOrThrow();
});
