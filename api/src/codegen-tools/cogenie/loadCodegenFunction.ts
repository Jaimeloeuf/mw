import type { CodegenFunction } from "./CodegenFunction.js";

import { logger } from "../../logging/index.js";

// Register a namespaced tsx API, so that imports have module caching, which is
// needed so that when different cogenie steps load the same files/folders, the
// result is cached instead of being re-ran for every single step that uses it.
import { register } from "tsx/esm/api";
const tsxApi = register({
  namespace: "cogenie",
});

/**
 * Dynamically load and return the given codegen function.
 */
export async function loadCodegenFunction(
  codegenModuleName: string,
  codegenModulePath: string,
) {
  // @todo Migrate to using node import directly with strip types flag in future
  // Cannot use `import` directly since it does not support loading .ts files
  // See tsxApi comment above on when this is needed instead of using tsImport
  // directly from the tsx lib.
  const importedModule = await tsxApi.import(
    codegenModulePath,
    import.meta.url,
  );

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
