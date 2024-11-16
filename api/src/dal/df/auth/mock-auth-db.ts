/**
 * MOCK AUTH DB, to replace with an actual DB.
 */

import { createSqliteDB } from "../../sqlite/index.js";

export const db = await createSqliteDB("mock-auth.db", async function (db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        github_id INTEGER NOT NULL UNIQUE
      )`,
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        expires_at TEXT NOT NULL,
        attributes BLOB NOT NULL
      )`,
  );
});

export interface SqliteDbSessionType {
  id: string;
  user_id: string;
  expires_at: string;
  attributes: string;
}

export interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}
