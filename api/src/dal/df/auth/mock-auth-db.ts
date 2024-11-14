/**
 * MOCK AUTH IN MEMORY DB, to replace with an actual DB.
 */

import type { DatabaseSession } from "lucia";

interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}

// Mapping of userID to User
export const users = new Map<string, DatabaseUser>();

// Mapping of sessionID to Session
export const sessions = new Map<string, DatabaseSession>();

// Mapping of userID to Session
export const userToSession = new Map<string, DatabaseSession>();
