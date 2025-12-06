import fs from "fs";
import path from "path";

import { entMapping } from "../../../../__generated/index.js";
import { logger } from "../../../../logging/index.js";
import { pseudoRandomAlphanumericString } from "../../../../utils/index.js";
import {
  cogenieRunAllSteps,
  showGitStatusOfGeneratedFiles,
} from "../../../cogenie/index.js";
import { Scaffoldr } from "../../Scaffoldr.js";

export default Scaffoldr({
  inputs: [
    {
      name: "entName",
      question: "Ent name in PascalCase (e.g. BlogSubscriber)",
      validateAndTransformInput(input: string) {
        if (!new RegExp(/^[A-Z][A-Za-z0-9]*$/g).test(input)) {
          throw new Error("Ent name must be PascalCase.");
        }
        return `Ent${input}`;
      },
    },
  ],

  async generate(inputs) {
    const entFolderPath = path.join(
      import.meta.dirname,
      `../../../../ents/${inputs.entName}`,
    );

    // Will throw if folder already exists
    fs.mkdirSync(entFolderPath);

    /**
     * Generate unique EntTypeID by generating a unique ID and checking against all
     * EntTypeIDs to see if it already exists, and using the first unique ID
     * generated that doesnt already exists.
     */
    let uniqueEntTypeID: $Nullable<string>;
    do {
      uniqueEntTypeID = pseudoRandomAlphanumericString(4);
    } while (entMapping[uniqueEntTypeID] !== undefined);

    const entFileTemplate = fs.readFileSync(
      path.join(entFolderPath, `../_EntTemplate_/EntTemplate.ts`),
      { encoding: "utf8" },
    );
    const entFile = entFileTemplate
      .replaceAll("EntTemplate", inputs.entName)
      .replace("__generated_ent_type_id__", uniqueEntTypeID);
    fs.writeFileSync(path.join(entFolderPath, `${inputs.entName}.ts`), entFile);

    const entOperatorsFileTemplate = fs.readFileSync(
      path.join(entFolderPath, `../_EntTemplate_/EntTemplateOperators.ts`),
      { encoding: "utf8" },
    );
    const entOperatorsFile = entOperatorsFileTemplate
      .replaceAll("EntTemplate", inputs.entName)
      .replace("// @ts-nocheck", "");
    fs.writeFileSync(
      path.join(entFolderPath, `${inputs.entName}Operators.ts`),
      entOperatorsFile,
    );

    const entBarrelFileTemplate = fs
      .readFileSync(path.join(entFolderPath, `../_EntTemplate_/index.ts`), {
        encoding: "utf8",
      })
      .replaceAll("EntTemplate", inputs.entName);
    fs.writeFileSync(
      path.join(entFolderPath, `index.ts`),
      entBarrelFileTemplate,
    );

    logger.info(Scaffoldr.name, `Created Ent Folder: ${entFolderPath}`);
    logger.info(Scaffoldr.name, `Please update the Ent file details.`);

    // Trigger codegen for the new Ent
    // @todo Should only run 1 step
    await cogenieRunAllSteps();
    await showGitStatusOfGeneratedFiles();
  },
});
