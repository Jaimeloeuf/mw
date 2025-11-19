import { codegenForTs } from "../../codegen-lib/index.js";
import { deleteStaleGeneratedFiles } from "./deleteStaleGeneratedFiles.js";
import { getAllCogenieSteps } from "./getAllCogenieSteps.js";
import { runCogenieSteps } from "./runCogenieSteps.js";

export async function cogenieRunAllSteps() {
  await deleteStaleGeneratedFiles();

  const allCogenieSteps = await getAllCogenieSteps();

  await runCogenieSteps(...allCogenieSteps);

  await codegenForTs.genCodegenBarrelFile();
}
