import { codegenForTs } from "../../codegen-lib/index.js";
import { deleteAllGeneratedFiles } from "./deleteAllGeneratedFiles.js";
import { loadAllCogenieSteps } from "./loadAllCogenieSteps.js";
import { runCogenieSteps } from "./runCogenieSteps.js";

export async function codegenRunAllModules() {
  await deleteAllGeneratedFiles();

  const allCogenieSteps = await loadAllCogenieSteps();

  await runCogenieSteps(...allCogenieSteps);

  await codegenForTs.genCodegenBarrelFile();
}
