import type { Kysely } from "kysely";

import fs from "fs/promises";
import { Migrator, FileMigrationProvider } from "kysely";
import path from "path";

import { config } from "../../../config/index.js";
import { createDB } from "../createDB.js";
import { dbConnectionCheck } from "../dbConnectionCheck.js";

let cached: $Nullable<{
  db: Kysely<any>;
  migrator: Migrator;
  migrationFolder: string;
}> = null;

export async function createDbAndMigrator() {
  if (cached !== null) {
    return cached;
  }

  const db = createDB({
    connectionString: config.db_conn_string(),
    kysely_log_error: true,
  });

  // Stop running migration immediately if unable to connect to DB
  const dbConnectionOk = await dbConnectionCheck(db, false);
  if (!dbConnectionOk) {
    process.exit(1);
  }

  /** This needs to be an absolute path */
  const migrationFolder = path.join(import.meta.dirname, "../migrations");

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, path, migrationFolder }),
  });

  cached = {
    db,
    migrator,
    migrationFolder,
  };

  return cached;
}
