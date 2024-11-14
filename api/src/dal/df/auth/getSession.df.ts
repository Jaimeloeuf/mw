import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { sessions } from "./mock-auth-db.js";

/**
 * Get the session using a session ID directly.
 */
export default dataFn(function authGetSession(sessionID: string) {
  const session = sessions.get(sessionID);

  if (session === undefined) {
    throw new NotFoundException(`Cannot find session '${sessionID}'`);
  }

  return session;
});
