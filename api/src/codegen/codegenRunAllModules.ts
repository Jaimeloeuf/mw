import { runCodegenModules } from "./runCodegenModules.js";
import { genCodegenBarrelFile } from "./codegenForTs/index.js";

import { genHttpControllerBarrelFile } from "./genHttpControllerBarrelFile/genHttpControllerBarrelFile.js";
import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";
import { genHttpDtoTypeDefinition } from "./genHttpDtoTypeDefinition/genHttpDtoTypeDefinition.js";
import { genServerConfigDoc } from "./genServerConfigDoc/genServerConfigDoc.js";
import { genScriptsDoc } from "./genScriptsDoc/genScriptsDoc.js";

import { deleteAllGeneratedFiles } from "./deleteAllGeneratedFiles.js";

export async function codegenRunAllModules() {
  await deleteAllGeneratedFiles();

  await runCodegenModules(
    genHttpControllerBarrelFile,
    genHttpRoutesTable,
    genHttpDtoTypeDefinition,
    genServerConfigDoc,
    genScriptsDoc,
  );

  await genCodegenBarrelFile();
}
