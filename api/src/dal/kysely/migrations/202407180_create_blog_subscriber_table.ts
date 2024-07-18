import { sql } from "kysely";
import type { Kysely } from "kysely";

const tableName = "blog_subscriber";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(tableName)
    .addColumn("id", "varchar", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(tableName).execute();
}
