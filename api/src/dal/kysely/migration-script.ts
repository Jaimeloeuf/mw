import { kyselyMigration } from "./kyselyMigration.js";

/**
 * Migrate to the latest step.
 */
kyselyMigration((migrator) => migrator.migrateToLatest());
