import { runCodegenModules } from "./runCodegenModules.js";
import { genCodegenBarrelFile } from "./codegenForTs/index.js";

import { genHttpControllerBarrelFile } from "./genHttpControllerBarrelFile/genHttpControllerBarrelFile.js";
import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";
import { genHttpDtoTypeDefinition } from "./genHttpDtoTypeDefinition/genHttpDtoTypeDefinition.js";

import { deleteAllGeneratedFiles } from "./deleteAllGeneratedFiles.js";

export async function codegenRunAllModules() {
  await deleteAllGeneratedFiles();

  await runCodegenModules(
    genHttpControllerBarrelFile,
    genHttpRoutesTable,
    genHttpDtoTypeDefinition,
  );

  await genCodegenBarrelFile();
}
