import type { MigrationInfo } from "kysely";

import { simpleLogger } from "../../../../logging/SimpleLogger.js";

export function migrateConfirmationForDown(
  migrations: ReadonlyArray<MigrationInfo>,
) {
  const lastExecutedMigration = migrations
    .filter((migration) => migration.executedAt !== undefined)
    .at(-1);

  if (lastExecutedMigration === undefined) {
    simpleLogger.info(
      migrateConfirmationForDown.name,
      "There is no executed Migration left to migrate down.",
    );
    return false;
  }

  simpleLogger.info(
    migrateConfirmationForDown.name,
    `Migration to migrate down: ${lastExecutedMigration.name}`,
  );

  return true;
}
