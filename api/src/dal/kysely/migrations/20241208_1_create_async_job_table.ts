import type { Kysely } from "kysely";

import { sql } from "kysely";

const asyncJobStatusEnumName = "async_job_status";
const asyncJobMachineTypeEnumName = "async_job_machine_type";
const asyncJobTableName = "async_job";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType(asyncJobStatusEnumName)
    .asEnum([
      "queued",
      "pre-processing",
      "started",
      "finish-success",
      "finish-fail",
    ])
    .execute();

  await db.schema
    .createType(asyncJobMachineTypeEnumName)
    .asEnum(["web"])
    .execute();

  await db.schema
    .createTable(asyncJobTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("job_type_id", "text", (col) => col.notNull())
    .addColumn("status", sql.raw(asyncJobStatusEnumName), (col) =>
      col.notNull(),
    )
    .addColumn("machine_type", sql.raw(asyncJobMachineTypeEnumName), (col) =>
      col.notNull(),
    )
    .addColumn("priority", "int2", (col) => col.notNull())
    .addColumn("caller", "text", (col) => col.notNull())
    .addColumn("stack_trace", "text", (col) => col.notNull())
    .addColumn("timeout", "integer")
    .addColumn("time_scheduled", "timestamp", (col) => col.notNull())
    .addColumn("time_start_after", "timestamp")
    .addColumn("time_preprocess", "timestamp")
    .addColumn("time_start", "timestamp")
    .addColumn("time_finish", "timestamp")
    .addColumn("job_arguments", "text")
    .addColumn("job_result", "text")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(asyncJobTableName).execute();

  // Delete the enum types
  await db.schema.dropType(asyncJobMachineTypeEnumName).execute();
  await db.schema.dropType(asyncJobStatusEnumName).execute();
}
