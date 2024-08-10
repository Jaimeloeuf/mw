import { runCodegenModules } from "./runCodegenModules.js";
// import { genCodegenBarrelFile } from "./genCodegenBarrelFile.js";

import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";

export async function codegenRunAllModules() {
  runCodegenModules(genHttpRoutesTable);
  // await genCodegenBarrelFile("pathOfGeneratedModule");
}
