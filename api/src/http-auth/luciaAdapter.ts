import type { Adapter, DatabaseUser, DatabaseSession, UserId } from "lucia";

import { df } from "../__generated/index.js";
import { config } from "../config/index.js";
import { logBeforeRun } from "../utils/index.js";

async function getSessionAndUser(
  sessionId: string,
): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
  const [getSessionError, session] = await df.authGetSession.run(sessionId);

  if (getSessionError !== null) {
    return [null, null];
  }

  const [getUserError, user] = await df.authGetUser.run(session.userId);

  if (getUserError !== null) {
    return [null, null];
  }

  return [
    session,
    {
      id: session.userId,
      attributes: {
        ...user,
      },
    },
  ];
}

async function getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
  const [getSessionError, session] = await df.authGetUserSession.run(userId);

  if (getSessionError !== null) {
    return [];
  }

  const user = await df.authGetUser.runAndThrowOnError(session.userId);

  return [
    {
      ...session,
      attributes: {
        ...user,
      },
    },
  ];
}

async function setSession(session: DatabaseSession): Promise<void> {
  await df.authUpsertSession.runAndThrowOnError(session.id, session);
  await df.authUpsertSessionForUser.runAndThrowOnError(session.userId, session);
}

async function updateSessionExpiration(
  sessionId: string,
  expiresAt: Date,
): Promise<void> {
  const [getSessionError, session] = await df.authGetSession.run(sessionId);

  if (getSessionError !== null) {
    return;
  }

  await df.authUpsertSession.runAndThrowOnError(session.id, {
    ...session,
    expiresAt,
  });
}

async function deleteSession(sessionId: string): Promise<void> {
  await df.authDeleteSession.runAndThrowOnError(sessionId);
}

async function deleteUserSessions(userID: UserId): Promise<void> {
  await df.authDeleteSessionForUser.runAndThrowOnError(userID);
}

async function deleteExpiredSessions(): Promise<void> {
  //
}

const logBeforeRunIfNotProd = <T extends (...args: any) => any>(fn: T) =>
  config.env === "production" ? fn : logBeforeRun(fn);

export const adapter: Adapter = {
  getSessionAndUser: logBeforeRunIfNotProd(getSessionAndUser),
  getUserSessions: logBeforeRunIfNotProd(getUserSessions),
  setSession: logBeforeRunIfNotProd(setSession),
  updateSessionExpiration: logBeforeRunIfNotProd(updateSessionExpiration),
  deleteSession: logBeforeRunIfNotProd(deleteSession),
  deleteUserSessions: logBeforeRunIfNotProd(deleteUserSessions),
  deleteExpiredSessions: logBeforeRunIfNotProd(deleteExpiredSessions),
};
