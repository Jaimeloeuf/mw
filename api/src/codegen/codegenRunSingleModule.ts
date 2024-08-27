import fs from "fs";
import path from "path";
import { tsImport } from "tsx/esm/api";
import { logger } from "../logging/index.js";
import { runCodegenModules } from "./runCodegenModules.js";
import { genCodegenBarrelFile } from "./genCodegenBarrelFile.js";
import type { CodegenFunction } from "./CodegenFunction.js";

export async function codegenRunSingleModule(codegenModuleName: string) {
  // Codegen module should be in this codegen/ folder, and should be in a folder
  // with the same name as itself
  const codegenModulePath = path.resolve(
    import.meta.dirname,
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
      `Use 'npm run codegen list' to see all codegen modules`,
    );
    return;
  }

  // Cannot use `import` directly since it does not support loading .ts files
  const importedModule = await tsImport(codegenModulePath, import.meta.url);

  // Extract out the named export and make sure it is a function
  const importedCodegenFunction = importedModule[
    codegenModuleName
  ] as CodegenFunction;
  if (typeof importedCodegenFunction !== "function") {
    logger.error(
      codegenRunSingleModule.name,
      `Codegen module is malformed and does not export codegen function\nMake sure they are of the same name`,
    );
    logger.error(
      codegenRunSingleModule.name,
      `Module found: ${importedModule}`,
    );
    return;
  }

  // For single module codegen, since we are unable to know if the output file
  // path has changed, we must rely on users to manually delete it as we cannot
  // delete all generated files since we do not regenerate all files.
  logger.info(
    codegenRunSingleModule.name,
    "If your codegen module's output file has changed, please manually delete it first",
  );

  await runCodegenModules(importedCodegenFunction);

  await genCodegenBarrelFile();
}
