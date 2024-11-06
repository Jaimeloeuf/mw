import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser } from "../../kysely/index.js";

/**
 * Deactivate a User account to act as a soft delete.
 */
export default dataFn(async function deactivateUser(userID: MuwnoUser["id"]) {
  await apiDB
    .updateTable("muwno_user")
    .set({
      deactivated: true,
    })
    .where("id", "=", userID)
    .execute();
});
