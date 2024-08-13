import { sql } from "kysely";
import { db } from "./db.js";
import { logger } from "../../logging/index.js";

/**
 * Connection check function that runs a no-op query against the DB to check if
 * connection can be made to the DB. This will log the check results and return
 * boolean status.
 */
export async function dbConnectionCheck() {
  try {
    // No-Op query to check connection. This only works for PostgreSQL
    // https://stackoverflow.com/questions/3668506/efficient-sql-test-query-or-validation-query-that-will-work-across-all-or-most
    await sql`SELECT 1;`.execute(db);

    logger.info(dbConnectionCheck.name, `DB connection check PASSED`);

    return true;
  } catch (error) {
    logger.error(dbConnectionCheck.name, `DB connection check FAILED`, error);

    return false;
  }
}