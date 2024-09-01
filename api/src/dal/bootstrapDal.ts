import { dbConnectionCheck } from "./kysely/index.js";
import { apiDB } from "./kysely/apiDB.js";
import { config } from "../config/index.js";
import { logger } from "../logging/index.js";

/**
 * Bootstrap function to import and setup kysely `db`.
 *
 * Will only run connection check in production environment.
 *
 * Will exit current process if connection check fails.
 */
export async function bootstrapDal() {
  if (config.env !== "production") {
    logger.info(
      bootstrapDal.name,
      `DB connection check SKIPPED in ${config.env} (non production) environment`,
    );
    return;
  }

  const dbConnectionOk = await dbConnectionCheck(apiDB);
  if (!dbConnectionOk) {
    // Stop running service since nothing should continue on failure
    process.exit(1);
  }
}
