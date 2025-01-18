import type { Kysely } from "kysely";

const AssocTableName = "assoc";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(AssocTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("from", "text", (col) => col.notNull())
    .addColumn("to", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(AssocTableName).execute();
}
