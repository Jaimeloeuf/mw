import { genAndSaveGeneratedCode } from "../../../codegen-lib/codegenForTs/index.js";
import { getStartupFiles } from "../utils/index.js";
import { startupModuleRunnerTemplate } from "./startupModuleRunnerTemplate.js";

/**
 * Generate a runner function to run all the startup modules concurrently.
 */
export async function genStartupModuleRunner() {
  const files = await getStartupFiles();

  const generatedCode = startupModuleRunnerTemplate(files);

  await genAndSaveGeneratedCode(
    genStartupModuleRunner,
    generatedCode,
    "startupModulesRunner",
  );
}
