import { codegenForTs } from "../../codegen-lib/index.js";
import { deleteStaleGeneratedFiles } from "./deleteStaleGeneratedFiles.js";
import { loadAllCogenieSteps } from "./loadAllCogenieSteps.js";
import { runCogenieSteps } from "./runCogenieSteps.js";

export async function cogenieRunAllSteps() {
  await deleteStaleGeneratedFiles();

  const allCogenieSteps = await loadAllCogenieSteps();

  await runCogenieSteps(...allCogenieSteps);

  await codegenForTs.genCodegenBarrelFile();
}
