import type { Kysely } from "kysely";

const blogTableName = "blog";
const blogSubscriberTableName = "blog_subscriber";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(blogTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("owner_email", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(blogSubscriberTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(blogSubscriberTableName).execute();
  await db.schema.dropTable(blogTableName).execute();
}
