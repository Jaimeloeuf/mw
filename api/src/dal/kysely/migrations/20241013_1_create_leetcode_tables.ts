import type { Kysely } from "kysely";

import { sql } from "kysely";

const leetcodeQuesTableName = "leetcode_ques";
const leetcodeTagTableName = "leetcode_tag";
const leetcodeQuesTagTableName = "leetcode_ques_tag";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(leetcodeQuesTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("url", "text", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable(leetcodeTagTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("tag", "text", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable(leetcodeQuesTagTableName)
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("ques_id", "text", (col) => col.notNull())
    .addColumn("tag_id", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(leetcodeQuesTableName).execute();
  await db.schema.dropTable(leetcodeTagTableName).execute();
  await db.schema.dropTable(leetcodeQuesTagTableName).execute();
}
