import { genCodegenBarrelFile } from "../codegenForTs/index.js";
import { deleteAllGeneratedFiles } from "./deleteAllGeneratedFiles.js";
import { loadAllCodegenFunctions } from "./loadAllCodegenFunctions.js";
import { runCodegenModules } from "./runCodegenModules.js";

export async function codegenRunAllModules() {
  await deleteAllGeneratedFiles();

  const allCodegenFunctions = await loadAllCodegenFunctions();

  await runCodegenModules(...allCodegenFunctions);

  await genCodegenBarrelFile();
}
