import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Database } from "./definitions/index.js";
import { config } from "../../config/index.js";

/**
 * The kysely db API.
 *
 * Kysely knows your database structure using the generic Database interface
 * passed to its constructor.
 *
 * Kysely knows how to communicate with your database using the given `dialect`.
 *
 * In most cases, you should only create a single Kysely instance per database
 * as most dialect implementations use a connection pool internally, or no
 * connections at all, so you should not create a new instance for each request.
 */
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: config.db_conn_string,
    }),
  }),
});

/**
 * When needed, you can dispose of the Kysely instance, release resources and
 * close all connections.
 */
export function dbCleanup() {
  db.destroy();
}
