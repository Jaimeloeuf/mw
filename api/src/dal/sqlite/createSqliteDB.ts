import type { Database } from "sqlite";

import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { logger } from "../../logging/index.js";

/**
 * Creates a new file based SQLite DB in /api/sqlite-mock-dbs/*.db
 */
export async function createSqliteDB(
  dbFileName: string,
  initFunction?: (db: Database<sqlite3.Database, sqlite3.Statement>) => any,
) {
  sqlite3.verbose();

  const dbPath = path.resolve("./sqlite-mock-dbs", dbFileName);
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  logger.verbose(createSqliteDB.name, `Created mock SQLite DB ${dbFileName}`);

  if (initFunction !== undefined) {
    await initFunction(db);
    logger.verbose(
      createSqliteDB.name,
      `Successfully ran SQLite DB init function`,
    );
  }

  return db;
}
