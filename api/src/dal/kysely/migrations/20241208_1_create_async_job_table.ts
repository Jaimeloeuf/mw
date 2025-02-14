import type { Kysely } from "kysely";

const asyncJobTableName = "async_job";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(asyncJobTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("job_type_id", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("machine_type", "text", (col) => col.notNull())
    .addColumn("priority", "int2", (col) => col.notNull())
    .addColumn("caller", "text", (col) => col.notNull())
    .addColumn("stack_trace", "text", (col) => col.notNull())
    .addColumn("timeout", "integer")
    .addColumn("time_scheduled", "timestamp", (col) => col.notNull())
    .addColumn("time_start_after", "timestamp")
    .addColumn("time_preprocess", "timestamp")
    .addColumn("time_start", "timestamp")
    .addColumn("time_finish", "timestamp")
    .addColumn("time_cancelled", "timestamp")
    .addColumn("job_arguments", "text")
    .addColumn("job_result", "text")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(asyncJobTableName).execute();
}
