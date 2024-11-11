import type { MuwnoUser, UpdateMuwnoUser } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(function muwnoUpdateUser(
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
