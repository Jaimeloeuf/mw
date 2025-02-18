import type { Adapter, DatabaseUser, DatabaseSession, UserId } from "lucia";

import { df } from "../__generated/index.js";
import { config } from "../config/index.js";
import { logBeforeRun } from "../utils/index.js";

async function getSessionAndUser(
  sessionId: string,
): Promise<
  [session: $Nullable<DatabaseSession>, user: $Nullable<DatabaseUser>]
> {
  const [err, sessionAndUser] = await df.authGetSessionAndUser.run(sessionId);

  if (err !== null) {
    return [null, null];
  }

  return [sessionAndUser.session, sessionAndUser.user as any];
}

async function getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
  const [getSessionError, session] = await df.authGetUserSession.run(userId);

  if (getSessionError !== null) {
    return [];
  }

  return [session];
}

async function setSession(session: DatabaseSession): Promise<void> {
  await df.authUpsertSession.runAndThrowOnError(session);
}

async function updateSessionExpiration(
  sessionId: string,
  expiresAt: Date,
): Promise<void> {
  const [getSessionError, session] = await df.authGetSession.run(sessionId);

  if (getSessionError !== null) {
    return;
  }

  await df.authUpsertSession.runAndThrowOnError({
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
  config.env() === "production" ? fn : logBeforeRun(fn);

export const adapter: Adapter = {
  getSessionAndUser: logBeforeRunIfNotProd(getSessionAndUser),
  getUserSessions: logBeforeRunIfNotProd(getUserSessions),
  setSession: logBeforeRunIfNotProd(setSession),
  updateSessionExpiration: logBeforeRunIfNotProd(updateSessionExpiration),
  deleteSession: logBeforeRunIfNotProd(deleteSession),
  deleteUserSessions: logBeforeRunIfNotProd(deleteUserSessions),
  deleteExpiredSessions: logBeforeRunIfNotProd(deleteExpiredSessions),
};
