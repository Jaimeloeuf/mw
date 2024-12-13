import { tsImport } from "tsx/esm/api";

import type { CodegenFunction } from "./CodegenFunction.js";

import { logger } from "../../logging/index.js";

/**
 * Dynamically load and return the given codegen function.
 */
export async function loadCodegenFunction(
  codegenModuleName: string,
  codegenModulePath: string,
) {
  // Cannot use `import` directly since it does not support loading .ts files
  const importedModule = await tsImport(codegenModulePath, import.meta.url);

  // Extract out the named export and make sure it is a function
  const importedCodegenFunction: CodegenFunction =
    importedModule[codegenModuleName];

  if (typeof importedCodegenFunction !== "function") {
    logger.error(
      loadCodegenFunction.name,
      `Codegen module is malformed and does not export codegen function\nMake sure they are of the same name`,
    );
    logger.error(loadCodegenFunction.name, `Module found: ${importedModule}`);
    process.exit(1);
  }

  return importedCodegenFunction;
}
