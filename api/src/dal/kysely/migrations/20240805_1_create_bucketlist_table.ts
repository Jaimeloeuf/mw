import type { Kysely } from "kysely";

const bucketlistTableName = "bucketlist";
const bucketlistItemTableName = "bucketlist_item";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(bucketlistTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(bucketlistItemTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("bucketlist_id", "text", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("done", "boolean", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(bucketlistItemTableName).execute();
  await db.schema.dropTable(bucketlistTableName).execute();
}
