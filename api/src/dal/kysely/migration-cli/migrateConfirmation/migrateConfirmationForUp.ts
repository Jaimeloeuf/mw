import type { MigrationInfo } from "kysely";

import { simpleLogger } from "../../../../logging/SimpleLogger.js";

export function migrateConfirmationForUp(
  migrations: ReadonlyArray<MigrationInfo>,
) {
  const nextUnexecutedMigration = migrations
    .filter((migration) => migration.executedAt === undefined)
    .at(0);

  if (nextUnexecutedMigration === undefined) {
    simpleLogger.info(
      migrateConfirmationForUp.name,
      "There is no unexecuted Migration left to migrate up.",
    );
    return false;
  }

  simpleLogger.info(
    migrateConfirmationForUp.name,
    `Migration to migrate up: ${nextUnexecutedMigration.name}`,
  );

  return true;
}
