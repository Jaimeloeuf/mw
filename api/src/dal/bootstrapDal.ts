import { sql } from "kysely";
import { db } from "./kysely/index.js";
import { config } from "../config/index.js";
import { logger } from "../logging/index.js";

/**
 * Bootstrap function to import and setup kysely `db`, and do a connection check
 * by running a no-op query against the DB.
 *
 * Will only run connection check in production environment.
 *
 * Will exit current process if connection check fails.
 */
export async function bootstrapDal() {
  if (config.env !== "production") {
    logger.info(
      bootstrapDal.name,
      `DB connection check SKIPPED in ${config.env} (non production) environment`
    );
    return;
  }

  try {
    // No-Op query to check connection. This only works for PostgreSQL
    // https://stackoverflow.com/questions/3668506/efficient-sql-test-query-or-validation-query-that-will-work-across-all-or-most
    await sql`SELECT 1;`.execute(db);

    logger.info(bootstrapDal.name, `DB connection check PASSED`);
  } catch (error) {
    logger.error(bootstrapDal.name, `DB connection check FAILED`, error);

    // Stop running service since nothing should continue on failure
    process.exit(1);
  }
}
