import type { MigrationInfo, MigrationResultSet } from "kysely";
import type { Migrator } from "kysely";

import { performance } from "perf_hooks";

import { logger } from "../../../logging/index.js";
import { confirmMigrationWithUser } from "./confirmMigrationWithUser.js";
import { createDbAndMigrator } from "./createDbAndMigrator.js";

/**
 * Use kysely migrator to migrate DB to latest migration change as defined by
 * migration files.
 */
export async function kyselyMigration(
  migrationConfirmationQuestion: string,
  migrateConfirmationFunction: (
    migrations: ReadonlyArray<MigrationInfo>,
  ) => unknown,
  migrateFunction: (migrator: Migrator) => Promise<MigrationResultSet>,
) {
  const confirm = await confirmMigrationWithUser(
    migrateConfirmationFunction,
    migrationConfirmationQuestion,
  );
  if (!confirm) {
    return;
  }

  const startTime = performance.now();

  const { db, migrator, migrationFolder } = await createDbAndMigrator();

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
