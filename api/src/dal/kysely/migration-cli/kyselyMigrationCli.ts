import "../../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../../logging/index.js";
import { createKyselyMigration } from "./createKyselyMigrationFile/createKyselyMigration.js";
import { kyselyMigration } from "./kyselyMigration.js";
import { migrateConfirmationForAll } from "./migrateConfirmation/migrateConfirmationForAll.js";
import { migrateConfirmationForDown } from "./migrateConfirmation/migrateConfirmationForDown.js";
import { migrateConfirmationForUp } from "./migrateConfirmation/migrateConfirmationForUp.js";
import { printAllMigrations } from "./printAllMigrations.js";
import { printMigrationCliHelp } from "./printMigrationCliHelp.js";

async function kyselyMigrationCli() {
  // No extra arguments, show help menu
  if (process.argv.length === 2) {
    printMigrationCliHelp();
    return;
  }

  const [command, dbConnectionString, ciFlag] = process.argv.slice(2);

  if (command === "create") {
    await createKyselyMigration();
    return;
  }

  if (command === "list") {
    await printAllMigrations();
    return;
  }

  if (command === "all") {
    await kyselyMigration({
      migrateConfirmationFunction: migrateConfirmationForAll,
      migrateFunction: (migrator) => migrator.migrateToLatest(),
    });
    return;
  }

  if (command === "up") {
    await kyselyMigration({
      migrateConfirmationFunction: migrateConfirmationForUp,
      migrateFunction: (migrator) => migrator.migrateUp(),
    });
    return;
  }

  if (command === "down") {
    await kyselyMigration({
      migrateConfirmationFunction: migrateConfirmationForDown,
      migrateFunction: (migrator) => migrator.migrateDown(),
    });
    return;
  }

  logger.error(kyselyMigrationCli.name, `Invalid migration type: ${command}\n`);
  printMigrationCliHelp();
}

kyselyMigrationCli();
