import path from "path";
import fs from "fs/promises";
import { Migrator, FileMigrationProvider } from "kysely";
import { db, dbCleanup } from "./db.js";
import { logger } from "../../logging/index.js";

/**
 * Use kysely migrator to migrate DB to latest migration change as defined by
 * migration files.
 */
async function kyselyMigrateToLatest() {
  /** This needs to be an absolute path */
  const migrationFolder = path.join(import.meta.dirname, "./migrations");

  logger.info(
    kyselyMigrateToLatest.name,
    `Running migrations in: ${migrationFolder}`
  );

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, path, migrationFolder }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((migrationResult) => {
    if (migrationResult.status === "Success") {
      logger.info(
        kyselyMigrateToLatest.name,
        `Successfully executed migration: ${migrationResult.migrationName}`
      );
    } else if (migrationResult.status === "Error") {
      logger.error(
        kyselyMigrateToLatest.name,
        `Failed to executed migration: ${migrationResult.migrationName}`
      );
    } else if (migrationResult.status === "NotExecuted") {
      logger.error(
        kyselyMigrateToLatest.name,
        `Migration skipped due to previous failure: ${migrationResult.migrationName}`
      );
    }
  });

  if (error) {
    logger.error(kyselyMigrateToLatest.name, `Migration failed: ${error}`);
  }

  await dbCleanup();
}

kyselyMigrateToLatest();
