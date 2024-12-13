export const migrationFileTemplate = `import type { Kysely } from "kysely";

import { sql } from "kysely";

const tableName = "your_table_name";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable(tableName);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(tableName).execute();
}
`;
