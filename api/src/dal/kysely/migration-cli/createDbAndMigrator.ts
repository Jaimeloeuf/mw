import type { Kysely } from "kysely";

import { Migrator } from "kysely";

import { config } from "../../../config/index.js";
import { createDB } from "../createDB.js";
import { dbConnectionCheck } from "../dbConnectionCheck.js";
import { createFileMigrationProvider } from "./createFileMigrationProvider.js";

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

  const { fileMigrationProvider, migrationFolder } =
    createFileMigrationProvider();

  const migrator = new Migrator({
    db,
    provider: fileMigrationProvider,
  });

  cached = {
    db,
    migrator,
    migrationFolder,
  };

  return cached;
}
