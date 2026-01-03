import type { MigrationInfo } from "kysely";

import { logger } from "../../../logging/index.js";
import { createDbAndMigrator } from "./createDbAndMigrator.js";
import { getCliConfirmationYesNoInput } from "./getCliConfirmationYesNoInput.js";

export async function confirmMigrationWithUser(options: {
  dbConnectionString?: string | undefined;
  migrateConfirmationFunction: (
    migrations: ReadonlyArray<MigrationInfo>,
  ) => boolean | Promise<boolean>;
}) {
  const { db, migrator } = await createDbAndMigrator(
    options.dbConnectionString,
  );
  const migrations = await migrator.getMigrations();

  const shouldContinue = await options.migrateConfirmationFunction(migrations);
  if (!shouldContinue) {
    // Destroy DB connection so that the CLI program can exit.
    await db.destroy();
    return false;
  }

  const isKyeselyMigrationRanInCI = process.argv.includes("--ci");
  if (isKyeselyMigrationRanInCI) {
    logger.info(
      confirmMigrationWithUser.name,
      "Skipping confirmation validation in CI environment...",
    );
    return true;
  }

  const confirmed = await getCliConfirmationYesNoInput("Confirm migration?");
  if (confirmed) {
    logger.info(confirmMigrationWithUser.name, "Thank you for confirming...");
    return true;
  }

  logger.info(confirmMigrationWithUser.name, "Aborting...");

  // Destroy DB connection so that the CLI program can exit.
  await db.destroy();

  return false;
}
