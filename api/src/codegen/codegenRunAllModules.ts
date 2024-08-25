import { runCodegenModules } from "./runCodegenModules.js";
import { genCodegenBarrelFile } from "./genCodegenBarrelFile.js";

import { genHttpControllerBarrelFile } from "./genHttpControllerBarrelFile/genHttpControllerBarrelFile.js";
import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";
import { genHttpDtoTypeDefinition } from "./genHttpDtoTypeDefinition/genHttpDtoTypeDefinition.js";

export async function codegenRunAllModules() {
  await runCodegenModules(
    genHttpControllerBarrelFile,
    genHttpRoutesTable,
    genHttpDtoTypeDefinition
  );

  await genCodegenBarrelFile();
}
