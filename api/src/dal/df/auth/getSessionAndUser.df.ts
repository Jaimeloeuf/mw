import type { DatabaseSession } from "lucia";

import type { SqliteDbSessionType, DatabaseUser } from "./mock-auth-db.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

/**
 * Get session and `User` at the same time.
 */
export default dataFn(async function authGetSessionAndUser(sessionID: string) {
  const session = await db.get<SqliteDbSessionType>(
    `SELECT * FROM sessions WHERE id = ?;`,
    [sessionID],
  );

  if (session === undefined) {
    throw new NotFoundException(`Cannot find session '${sessionID}'`);
  }

  const user = await db.get<DatabaseUser>(`SELECT * FROM users WHERE id = ?;`, [
    session.user_id,
  ]);

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user '${session.user_id}'`);
  }

  return {
    user,
    session: {
      id: session.id,
      userId: session.user_id,
      expiresAt: new Date(session.expires_at),
      attributes: JSON.parse(session.attributes),
    } as DatabaseSession,
  };
});
