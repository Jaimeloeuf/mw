import { sql } from "kysely";
import type { Kysely } from "kysely";

const bucketlistTableName = "bucketlist";
const bucketlistItemTableName = "bucketlist_item";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(bucketlistTableName)
    .addColumn("id", "varchar", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("name", "varchar")
    .addColumn("description", "varchar")
    .execute();

  await db.schema
    .createTable(bucketlistItemTableName)
    .addColumn("id", "varchar", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("bucketlist_id", "varchar")
    .addColumn("name", "varchar")
    .addColumn("done", "boolean")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(bucketlistItemTableName).execute();
  await db.schema.dropTable(bucketlistTableName).execute();
}
