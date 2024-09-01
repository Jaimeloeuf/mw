import { createDB } from "./createDB.js";
import { config } from "../../config/index.js";

/**
 * Specific DB instance for all API service usecase.
 */
export const apiDB = createDB({
  connectionString: config.db_conn_string,
});

/**
 * When needed, you can dispose of the Kysely instance, release resources and
 * close all connections.
 */
export function apiDbCleanup() {
  apiDB.destroy();
}
