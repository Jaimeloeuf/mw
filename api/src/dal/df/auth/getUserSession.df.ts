import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { sessions } from "./mock-auth-db.js";

/**
 * Get the User's current session.
 */
export default dataFn(async function authGetUserSession(userID: string) {
  const session = sessions.get(userID);

  if (session === undefined) {
    throw new NotFoundException(`Cannot find session for user '${userID}'`);
  }

  return session;
});
