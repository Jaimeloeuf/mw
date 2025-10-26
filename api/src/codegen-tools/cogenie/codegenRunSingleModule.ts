import fs from "fs";
import path from "path";

import { codegenForTs } from "../../codegen-lib/index.js";
import { logger } from "../../logging/index.js";
import { loadCodegenFunction } from "./loadCodegenFunction.js";
import { loadCogenieStep } from "./loadCogenieStep.js";
import { runCodegenModules } from "./runCodegenModules.js";
import { runCogenieSteps } from "./runCogenieSteps.js";

export async function codegenRunSingleModule(codegenModuleName: string) {
  // Codegen module should be in this codegen/steps folder, and should be in a
  // folder with the same name as itself
  const codegenModulePath = path.resolve(
    import.meta.dirname,
    "./steps",
    codegenModuleName,
    `${codegenModuleName}.ts`,
  );

  const moduleExists = fs.existsSync(codegenModulePath);
  if (!moduleExists) {
    logger.error(
      codegenRunSingleModule.name,
      `Codegen module does not exist: ${codegenModuleName}`,
    );
    logger.error(
      codegenRunSingleModule.name,
      `Use 'npm run codegen:cogenie list' to see all codegen modules`,
    );
    return;
  }

  // @todo Remove conditional to keep only 1
  if (codegenModuleName.startsWith("gen")) {
    const importedCodegenFunction = await loadCodegenFunction(
      codegenModuleName,
      codegenModulePath,
    );

    // For single module codegen, since we are unable to know if the output file
    // path has changed, we must rely on users to manually delete it as we cannot
    // delete all generated files since we do not regenerate all files.
    logger.info(
      codegenRunSingleModule.name,
      "If your codegen module's output file has changed, please manually delete it first",
    );

    await runCodegenModules(importedCodegenFunction);
  }

  if (codegenModuleName.startsWith("Gen")) {
    const importedCogenieStep = await loadCogenieStep(
      codegenModuleName,
      codegenModulePath,
    );

    // For single module codegen, since we are unable to know if the output file
    // path has changed, we must rely on users to manually delete it as we cannot
    // delete all generated files since we do not regenerate all files.
    logger.info(
      codegenRunSingleModule.name,
      "If your codegen module's output file has changed, please manually delete it first",
    );

    await runCogenieSteps(importedCogenieStep);
  }

  await codegenForTs.genCodegenBarrelFile();
}
