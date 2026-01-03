import type { Kysely } from "kysely";

import { Migrator } from "kysely";

import { createDB } from "../createDB.js";
import { dbConnectionCheck } from "../dbConnectionCheck.js";
import { createFileMigrationProvider } from "./createFileMigrationProvider.js";

let cached: $Nullable<{
  db: Kysely<any>;
  migrator: Migrator;
  migrationFolder: string;
}> = null;

export async function createDbAndMigrator(dbConnectionString?: string) {
  if (dbConnectionString === undefined) {
    throw new Error("Missing DB connection string");
  }

  if (cached !== null) {
    return cached;
  }

  const db = createDB({
    connectionString: dbConnectionString,
    kysely_log_error: true,
  });

  // Stop running migration immediately if unable to connect to DB
  const dbConnectionOk = await dbConnectionCheck(db);
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
