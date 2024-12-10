import type { MigrationResultSet } from "kysely";

import fs from "fs/promises";
import { Migrator, FileMigrationProvider } from "kysely";
import path from "path";
import { performance } from "perf_hooks";

import { config } from "../../config/index.js";
import { logger } from "../../logging/index.js";
import { createDB } from "./createDB.js";
import { dbConnectionCheck } from "./dbConnectionCheck.js";

/**
 * Use kysely migrator to migrate DB to latest migration change as defined by
 * migration files.
 */
export async function kyselyMigration(
  migrateFunction: (migrator: Migrator) => Promise<MigrationResultSet>,
) {
  const startTime = performance.now();

  /** This needs to be an absolute path */
  const migrationFolder = path.join(import.meta.dirname, "./migrations");

  const db = createDB({
    connectionString: config.db_conn_string(),
    kysely_log_error: true,
  });

  // Stop running migration immediately if unable to connect to DB
  const dbConnectionOk = await dbConnectionCheck(db);
  if (!dbConnectionOk) {
    process.exit(1);
  }

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, path, migrationFolder }),
  });

  logger.info(
    kyselyMigration.name,
    `Using migration files in: ${migrationFolder}`,
  );

  const { error, results } = await migrateFunction(migrator);

  if (error) {
    logger.error(kyselyMigration.name, `Migration failed: ${error}`);
  }

  // `results` could be undefined if Kysely is unable to even run migrations
  results?.forEach((migrationResult) => {
    if (migrationResult.status === "Success") {
      logger.info(
        kyselyMigration.name,
        `Successfully executed migration: ${migrationResult.migrationName}`,
      );
    } else if (migrationResult.status === "Error") {
      logger.error(
        kyselyMigration.name,
        `Failed to executed migration: ${migrationResult.migrationName}`,
      );
    } else if (migrationResult.status === "NotExecuted") {
      logger.error(
        kyselyMigration.name,
        `Migration skipped due to previous failure: ${migrationResult.migrationName}`,
      );
    }
  });

  // Close all connections and release resources
  await db.destroy();

  const endTime = performance.now();
  const time = Math.round(endTime - startTime);

  logger.info(kyselyMigration.name, `Ran ${results?.length ?? 0} migrations`);
  logger.info(kyselyMigration.name, `Migration(s) completed in ${time} ms`);
}
