import { runCodegenModules } from "./runCodegenModules.js";

import { genHttpControllerBarrelFile } from "./genHttpControllerBarrelFile/genHttpControllerBarrelFile.js";
import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";
import { genHttpDtoTypeDefinition } from "./genHttpDtoTypeDefinition/genHttpDtoTypeDefinition.js";

export async function codegenRunAllModules() {
  runCodegenModules(
    genHttpControllerBarrelFile,
    genHttpRoutesTable,
    genHttpDtoTypeDefinition
  );
}
