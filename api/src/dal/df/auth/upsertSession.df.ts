import type { DatabaseSession } from "lucia";

import { dataFn } from "../dataFn.js";
import { sessions } from "./mock-auth-db.js";

export default dataFn(async function authUpsertSession(
  sessionID: string,
  session: DatabaseSession,
) {
  sessions.set(sessionID, session);
});
