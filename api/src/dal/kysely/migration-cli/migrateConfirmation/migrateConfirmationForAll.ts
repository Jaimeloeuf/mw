import type { MigrationInfo } from "kysely";

import { simpleLogger } from "../../../../logging/SimpleLogger.js";

export function migrateConfirmationForAll(
  migrations: ReadonlyArray<MigrationInfo>,
) {
  const unexecutedMigrations = migrations.filter(
    (migration) => migration.executedAt === undefined,
  );

  if (unexecutedMigrations.length === 0) {
    simpleLogger.info(
      migrateConfirmationForAll.name,
      "There is no more Migrations left to migrate up.",
    );
    return false;
  }

  simpleLogger.info(
    migrateConfirmationForAll.name,
    `There is ${unexecutedMigrations.length} migration(s) left to migrate up`,
  );

  for (const [index, migration] of unexecutedMigrations.entries()) {
    simpleLogger.info(
      migrateConfirmationForAll.name,
      `Migration ${index + 1} to migrate up: ${migration.name}`,
    );
  }

  return true;
}
