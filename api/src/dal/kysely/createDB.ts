import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import type { Database } from "./definitions/index.js";

/**
 * Creates a new kysely db instance. You should only create one instance per
 * use case, so e.g. for API services, all API services should only share a
 * single instance as this does connection pooling internally already.
 *
 * ## More info on Kysely
 * Kysely knows your database structure using the generic Database interface
 * passed to its constructor.
 *
 * Kysely knows how to communicate with your database using the given `dialect`.
 *
 * In most cases, you should only create a single Kysely instance per database
 * as most dialect implementations use a connection pool internally, or no
 * connections at all, so you should not create a new instance for each request.
 */
export function createDB(config: { connectionString: string }) {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new pg.Pool(config),
    }),
  });
}
