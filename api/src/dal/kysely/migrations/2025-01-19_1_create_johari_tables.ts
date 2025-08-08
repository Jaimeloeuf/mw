import type { Kysely } from "kysely";

const johariTableName = "johari";
const johariAnswerTableName = "johari_answer";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(johariTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("words", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(johariAnswerTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) => col.notNull())
    .addColumn("johari_id", "text", (col) => col.notNull())
    .addColumn("name", "text")
    .addColumn("words", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(johariAnswerTableName).execute();
  await db.schema.dropTable(johariTableName).execute();
}
