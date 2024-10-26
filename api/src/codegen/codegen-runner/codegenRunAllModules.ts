import { runCodegenModules } from "./runCodegenModules.js";
import { genCodegenBarrelFile } from "../codegenForTs/index.js";
import { loadAllCodegenFunctions } from "./loadAllCodegenFunctions.js";
import { deleteAllGeneratedFiles } from "./deleteAllGeneratedFiles.js";

export async function codegenRunAllModules() {
  await deleteAllGeneratedFiles();

  const allCodegenFunctions = await loadAllCodegenFunctions();

  await runCodegenModules(...allCodegenFunctions);

  await genCodegenBarrelFile();
}
