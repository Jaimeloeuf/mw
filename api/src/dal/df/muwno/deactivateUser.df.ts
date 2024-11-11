import type { MuwnoUser } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Deactivate a User account to act as a soft delete.
 */
export default dataFn(async function muwnoDeactivateUser(userID: MuwnoUser["id"]) {
  await apiDB
    .updateTable("muwno_user")
    .set({
      deactivated: true,
    })
    .where("id", "=", userID)
    .execute();
});
