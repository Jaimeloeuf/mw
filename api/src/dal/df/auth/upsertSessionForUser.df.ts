import type { DatabaseSession } from "lucia";

import { dataFn } from "../dataFn.js";
import { userToSession } from "./mock-auth-db.js";

export default dataFn(async function authUpsertSessionForUser(
  userID: string,
  session: DatabaseSession,
) {
  userToSession.set(userID, session);
});
