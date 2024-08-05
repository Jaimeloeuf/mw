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

  // Get all the `${migrationDate}_${migrationIndex}` strings
  const migrationDates = migrationFileNames
    .map((name) => name.split("_").slice(0, 2).join(""))
    .filter((name) => name !== undefined);

  // Find all the migrations that happened on the same as today's date string
  const migrationDatesWithTheSameDate = migrationDates.filter((migrationDate) =>
    migrationDate.includes(dateString)
  );

  // Get the last migration index of today if any
  const lastUsedMigrationIndex = migrationDatesWithTheSameDate
    .map((dateWithIndex) => parseInt(dateWithIndex.slice(8))) // 8 bcs YYYYMMDD
    .sort((a, b) => a - b)
    .at(-1);

  const migrationIndex = (lastUsedMigrationIndex ?? 0) + 1;

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

  if (migrationName !== migrationName.toLowerCase()) {
    logger.error(
      createKyselyMigration.name,
      `Migration name must be all lowercase`
    );
    return;
  }

  const dateString = getDateString();

  const migrationIndex = getMigrationIndex(dateString);

  const migrationFileName = `${dateString}_${migrationIndex}_${migrationName}.ts`;

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
