import fs from "fs";
import path from "path";
import readline from "node:readline/promises";
import { logger } from "../logging/index.js";

const codeTemplate = `import { sql } from "kysely";
import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  //
}

export async function down(db: Kysely<any>): Promise<void> {
  //
}
`;

/** Create date string in the YYYYMMDD format for current UTC time */
function getDateString() {
  const now = new Date();

  const year = now.getUTCFullYear();

  const month = now.getUTCMonth() + 1; // Zero based month
  const monthString = month > 9 ? month : `0${month}`;

  const day = now.getUTCDate();
  const dayString = day > 9 ? day : `0${day}`;

  return `${year}${monthString}${dayString}`;
}

/** Get the migration index, where there can be more than 1 migration a day */
function getMigrationIndex(dateString: string) {
  const migrationFolderPath = path.join(
    import.meta.dirname,
    `../dal/kysely/migrations`
  );

  const migrationFileNames = fs.readdirSync(migrationFolderPath);

  // Get all the `${migrationDate}${migrationIndex}` strings
  const migrationDates = migrationFileNames
    .map((migrationFileName) => migrationFileName.split("_")[0])
    .filter((name) => name !== undefined);

  // Find all the migrations that happened on the same as today's date string
  const migrationDatesWithTheSameDate = migrationDates.filter((migrationDate) =>
    migrationDate.includes(dateString)
  );

  // Get the last migration index of today if any
  const lastUsedMigrationIndex = migrationDatesWithTheSameDate
    .map((dateWithIndex) => dateWithIndex.slice(dateString.length))
    .sort()
    .at(-1);

  const migrationIndex =
    lastUsedMigrationIndex === undefined
      ? 0
      : parseInt(lastUsedMigrationIndex) + 1;

  return migrationIndex;
}

async function createKyselyMigration() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const migrationName = await rl.question(
    `Migration name (lowercase with _ separation): `
  );

  rl.close();

  const dateString = getDateString();

  const migrationIndex = getMigrationIndex(dateString);

  const migrationFileName = `${dateString}${migrationIndex}_${migrationName}.ts`;

  const migrationFilePath = path.join(
    import.meta.dirname,
    `../dal/kysely/migrations/${migrationFileName}`
  );

  fs.writeFileSync(migrationFilePath, codeTemplate);

  logger.info(
    createKyselyMigration.name,
    `Created migration file at: ${migrationFilePath}`
  );
}

createKyselyMigration();
