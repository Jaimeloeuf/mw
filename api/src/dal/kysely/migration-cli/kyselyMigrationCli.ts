import { logger } from "../../../logging/index.js";
import { kyselyMigration } from "./kyselyMigration.js";
import { printAllMigrations } from "./printAllMigrations.js";
import { printMigrationCliHelp } from "./printMigrationCliHelp.js";

async function kyselyMigrationCli() {
  // No extra arguments, show help menu
  if (process.argv.length === 2) {
    printMigrationCliHelp();
    return;
  }

  const arg = process.argv.at(-1) ?? "";

  if (arg === "list") {
    await printAllMigrations();
    return;
  }

  if (arg === "all") {
    await kyselyMigration(
      function (migrations) {
        const unexecutedMigrations = migrations.filter(
          (migration) => migration.executedAt === undefined,
        );

        if (unexecutedMigrations.length === 0) {
          logger.info(
            kyselyMigrationCli.name,
            "There is no more Migrations left to migrate up.",
          );
          return false;
        }

        logger.info(
          kyselyMigrationCli.name,
          `There is ${unexecutedMigrations.length} migration(s) left to migrate up`,
        );

        for (const [index, migration] of unexecutedMigrations.entries()) {
          logger.info(
            kyselyMigrationCli.name,
            `Migration ${index + 1} to migrate up: ${migration.name}`,
          );
        }

        return true;
      },
      (migrator) => migrator.migrateToLatest(),
    );
    return;
  }

  if (arg === "up") {
    await kyselyMigration(
      function (migrations) {
        const nextUnexecutedMigration = migrations
          .filter((migration) => migration.executedAt === undefined)
          .at(0);

        if (nextUnexecutedMigration === undefined) {
          logger.info(
            kyselyMigrationCli.name,
            "There is no unexecuted Migration left to migrate up.",
          );
          return false;
        }

        logger.info(
          kyselyMigrationCli.name,
          `Migration to migrate up: ${nextUnexecutedMigration.name}`,
        );

        return true;
      },
      (migrator) => migrator.migrateUp(),
    );
    return;
  }

  if (arg === "down") {
    await kyselyMigration(
      function (migrations) {
        const lastExecutedMigration = migrations
          .filter((migration) => migration.executedAt !== undefined)
          .at(-1);

        if (lastExecutedMigration === undefined) {
          logger.info(
            kyselyMigrationCli.name,
            "There is no executed Migration left to migrate down.",
          );
          return false;
        }

        logger.info(
          kyselyMigrationCli.name,
          `Migration to migrate down: ${lastExecutedMigration.name}`,
        );

        return true;
      },
      (migrator) => migrator.migrateDown(),
    );
    return;
  }

  logger.error(kyselyMigrationCli.name, `Invalid migration type: ${arg}\n`);
  printMigrationCliHelp();
}

kyselyMigrationCli();
