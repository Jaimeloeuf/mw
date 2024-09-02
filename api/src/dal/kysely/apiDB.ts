import { createDB } from "./createDB.js";
import { config } from "../../config/index.js";

/**
 * Specific DB instance for all API service usecase.
 */
export const apiDB = createDB({
  connectionString: config.db_conn_string,
  kysely_log_query: config.kysely_log_query,
  kysely_log_error: config.kysely_log_error,
});

/**
 * When needed, you can dispose of the Kysely instance, release resources and
 * close all connections.
 */
export function apiDbCleanup() {
  apiDB.destroy();
}
