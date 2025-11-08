import fs from "fs";
import path from "path";

import { codegenForTs } from "../../codegen-lib/index.js";
import { logger } from "../../logging/index.js";
import { loadCogenieStep } from "./loadCogenieStep.js";
import { runCogenieSteps } from "./runCogenieSteps.js";

export async function cogenieRunOneStep(cogenieStepName: string) {
  // Cogenie step should be in this cogenie/steps folder, and should be in a
  // folder with the same name as itself
  const cogenieStepModulePath = path.resolve(
    import.meta.dirname,
    "./steps",
    cogenieStepName,
    `${cogenieStepName}.ts`,
  );

  const moduleExists = fs.existsSync(cogenieStepModulePath);
  if (!moduleExists) {
    logger.error(
      cogenieRunOneStep.name,
      `Cogenie step does not exist: ${cogenieStepName}`,
    );
    logger.error(
      cogenieRunOneStep.name,
      `Use 'npm run codegen:cogenie list' to see all cogenie steps`,
    );
    return;
  }

  const importedCogenieStep = await loadCogenieStep(
    cogenieStepName,
    cogenieStepModulePath,
  );

  // @todo Remove this
  // For single module codegen, since we are unable to know if the output file
  // path has changed, we must rely on users to manually delete it as we cannot
  // delete all generated files since we do not regenerate all files.
  logger.info(
    cogenieRunOneStep.name,
    "If your codegen module's output file has changed, please manually delete it first",
  );

  await runCogenieSteps(importedCogenieStep);

  await codegenForTs.genCodegenBarrelFile();
}
