import type { MigrationInfo } from "kysely";

import readline from "node:readline";

import { logger } from "../../../logging/index.js";
import { createDbAndMigrator } from "./createDbAndMigrator.js";

export async function confirmMigrationWithUser(
  migrateConfirmationFunction: (
    migrations: ReadonlyArray<MigrationInfo>,
  ) => unknown,
  confirmationQuestion: string,
) {
  const isKyeselyMigrationRanInCI = process.argv.includes("--ci");

  if (isKyeselyMigrationRanInCI) {
    logger.info(
      confirmMigrationWithUser.name,
      "Skipping confirmation validation in CI environment...",
    );
    return true;
  }

  const { db, migrator } = await createDbAndMigrator();
  const migrations = await migrator.getMigrations();
  await migrateConfirmationFunction(migrations);
  db.destroy();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise((resolve: (answer: string) => void) =>
    rl.question(confirmationQuestion + " [y/n]: ", resolve),
  );

  rl.close();

  if (answer === "y") {
    logger.info(confirmMigrationWithUser.name, "Thank you for confirming...");
    return true;
  }

  logger.info(confirmMigrationWithUser.name, "Aborting...");
  return false;
}
