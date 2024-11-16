import type { DatabaseSession } from "lucia";

import type { SqliteDbSessionType } from "./mock-auth-db.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

/**
 * Get the session using a session ID directly.
 */
export default dataFn(async function authGetSession(sessionID: string) {
  const session = await db.get<SqliteDbSessionType>(
    `SELECT * FROM sessions WHERE id = ?;`,
    [sessionID],
  );

  if (session === undefined) {
    throw new NotFoundException(`Cannot find session '${sessionID}'`);
  }

  return {
    id: session.id,
    userId: session.user_id,
    expiresAt: new Date(session.expires_at),
    attributes: JSON.parse(session.attributes),
  } as DatabaseSession;
});
