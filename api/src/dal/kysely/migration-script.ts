import path from "path";
import fs from "fs/promises";
import { performance } from "perf_hooks";
import { Migrator, FileMigrationProvider } from "kysely";
import { dbConnectionCheck } from "./dbConnectionCheck.js";
import { apiDB, apiDbCleanup } from "./apiDB.js";
import { logger } from "../../logging/index.js";

/**
 * Use kysely migrator to migrate DB to latest migration change as defined by
 * migration files.
 */
async function kyselyMigrateToLatest() {
  const startTime = performance.now();

  /** This needs to be an absolute path */
  const migrationFolder = path.join(import.meta.dirname, "./migrations");

  const dbConnectionOk = await dbConnectionCheck();
  if (!dbConnectionOk) {
    // Stop running migration immediately
    process.exit(1);
  }

  logger.info(
    kyselyMigrateToLatest.name,
    `Running migrations in: ${migrationFolder}`,
  );

  const migrator = new Migrator({
    db: apiDB,
    provider: new FileMigrationProvider({ fs, path, migrationFolder }),
  });

  const { error, results } = await migrator.migrateToLatest();

  if (error) {
    logger.error(kyselyMigrateToLatest.name, `Migration failed: ${error}`);
  }

  // `results` could be undefined if Kysely is unable to even run migrations
  results?.forEach((migrationResult) => {
    if (migrationResult.status === "Success") {
      logger.info(
        kyselyMigrateToLatest.name,
        `Successfully executed migration: ${migrationResult.migrationName}`,
      );
    } else if (migrationResult.status === "Error") {
      logger.error(
        kyselyMigrateToLatest.name,
        `Failed to executed migration: ${migrationResult.migrationName}`,
      );
    } else if (migrationResult.status === "NotExecuted") {
      logger.error(
        kyselyMigrateToLatest.name,
        `Migration skipped due to previous failure: ${migrationResult.migrationName}`,
      );
    }
  });

  await apiDbCleanup();

  const endTime = performance.now();
  const time = Math.round(endTime - startTime);

  logger.info(
    kyselyMigrateToLatest.name,
    `Ran ${results?.length ?? 0} migrations`,
  );
  logger.info(kyselyMigrateToLatest.name, `Migration completed in ${time} ms`);
}

kyselyMigrateToLatest();
