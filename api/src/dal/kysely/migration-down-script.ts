import { kyselyMigration } from "./kyselyMigration.js";

/**
 * Migrate one step down.
 */
kyselyMigration((migrator) => migrator.migrateDown());
