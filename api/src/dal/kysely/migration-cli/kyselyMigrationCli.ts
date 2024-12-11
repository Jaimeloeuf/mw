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
    await kyselyMigration("Migrate all up?", (migrator) =>
      migrator.migrateToLatest(),
    );
    return;
  }

  if (arg === "up") {
    await kyselyMigration("Migrate one step up?", (migrator) =>
      migrator.migrateUp(),
    );
    return;
  }

  if (arg === "down") {
    await kyselyMigration("Migrate one step down?", (migrator) =>
      migrator.migrateDown(),
    );
    return;
  }

  logger.error(kyselyMigrationCli.name, `Invalid migration type: ${arg}\n`);
  printMigrationCliHelp();
}

kyselyMigrationCli();
