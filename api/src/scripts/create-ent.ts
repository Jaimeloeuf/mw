import fs from "fs/promises";
import path from "path";
import readline from "readline/promises";

import { entMapping } from "../__generated/index.js";
import { logger } from "../logging/index.js";
import { pseudoRandomAlphanumericString } from "../utils/index.js";

async function createEnt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const entName = await rl.question(
    `Ent name in PascalCase (e.g. BlogSubscriber): `,
  );
  if (!new RegExp(/^[A-Z][A-Za-z0-9]*$/g).test(entName)) {
    logger.error(createEnt.name, `Ent name must be PascalCase.`);
    rl.close();
    return;
  }

  rl.close();

  const fullEntName = `Ent${entName}`;

  const entFolderPath = path.join(
    import.meta.dirname,
    `../ents/${fullEntName}`,
  );

  // Will throw if folder already exists
  await fs.mkdir(entFolderPath);

  /**
   * Generate unique EntTypeID by generating a unique ID and checking against all
   * EntTypeIDs to see if it already exists, and using the first unique ID
   * generated that doesnt already exists.
   */
  let uniqueEntTypeID: $Nullable<string>;
  do {
    uniqueEntTypeID = pseudoRandomAlphanumericString(4);
  } while (entMapping[uniqueEntTypeID] !== undefined);

  const entFileTemplate = await fs.readFile(
    path.join(entFolderPath, `../_EntTemplate_/EntTemplate.ts`),
    { encoding: "utf8" },
  );
  const entFile = entFileTemplate
    .replaceAll("EntTemplate", fullEntName)
    .replace("__generated_ent_type_id__", uniqueEntTypeID);
  await fs.writeFile(path.join(entFolderPath, `${fullEntName}.ts`), entFile);

  const entOperatorsFileTemplate = await fs.readFile(
    path.join(entFolderPath, `../_EntTemplate_/EntTemplateOperators.ts`),
    { encoding: "utf8" },
  );
  const entOperatorsFile = entOperatorsFileTemplate
    .replaceAll("EntTemplate", fullEntName)
    .replace("// @ts-nocheck", "");
  await fs.writeFile(
    path.join(entFolderPath, `${fullEntName}Operators.ts`),
    entOperatorsFile,
  );

  await fs
    .readFile(path.join(entFolderPath, `../_EntTemplate_/index.ts`), {
      encoding: "utf8",
    })
    .then((file) => file.replaceAll("EntTemplate", fullEntName))
    .then((file) => fs.writeFile(path.join(entFolderPath, `index.ts`), file));

  logger.info(createEnt.name, `Created Ent Folder: ${entFolderPath}`);
  logger.info(createEnt.name, `Please update the Ent file details.`);
}

createEnt();
