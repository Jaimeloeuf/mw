import fs from "fs/promises";
import { Migrator, FileMigrationProvider } from "kysely";
import path from "path";
import { performance } from "perf_hooks";

import { config } from "../../config/index.js";
import { logger } from "../../logging/index.js";
import { createDB } from "./createDB.js";
import { dbConnectionCheck } from "./dbConnectionCheck.js";

/**
 * Use kysely migrator to migrate DB one step down as defined by the migration
 * files.
 */
async function kyselyMigrateDown() {
  const startTime = performance.now();

  /** This needs to be an absolute path */
  const migrationFolder = path.join(import.meta.dirname, "./migrations");

  const db = createDB({
    connectionString: config.db_conn_string(),
    kysely_log_error: true,
  });

  const dbConnectionOk = await dbConnectionCheck(db);
  if (!dbConnectionOk) {
    // Stop running migration immediately
    process.exit(1);
  }

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, path, migrationFolder }),
  });

  logger.info(kyselyMigrateDown.name, `Running down migration (1 step down)`);

  const { error, results } = await migrator.migrateDown();

  if (error) {
    logger.error(kyselyMigrateDown.name, `Migration failed: ${error}`);
  }

  // `results` could be undefined if Kysely is unable to even run migrations
  results?.forEach((migrationResult) => {
    if (migrationResult.status === "Success") {
      logger.info(
        kyselyMigrateDown.name,
        `Successfully executed migration: ${migrationResult.migrationName}`,
      );
    } else if (migrationResult.status === "Error") {
      logger.error(
        kyselyMigrateDown.name,
        `Failed to executed migration: ${migrationResult.migrationName}`,
      );
    } else if (migrationResult.status === "NotExecuted") {
      logger.error(
        kyselyMigrateDown.name,
        `Migration skipped due to previous failure: ${migrationResult.migrationName}`,
      );
    }
  });

  // Close all connections and release resources
  await db.destroy();

  const endTime = performance.now();
  const time = Math.round(endTime - startTime);

  logger.info(kyselyMigrateDown.name, `Ran ${results?.length ?? 0} migrations`);
  logger.info(kyselyMigrateDown.name, `Migration completed in ${time} ms`);
}

kyselyMigrateDown();
