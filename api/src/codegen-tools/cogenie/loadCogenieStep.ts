import type { ConcreteCogenieStep } from "./CogenieStep.js";

import { logger } from "../../logging/index.js";

// Register a namespaced tsx API, so that imports have module caching, which is
// needed so that when different cogenie steps load the same files/folders, the
// result is cached instead of being re-ran for every single step that uses it.
import { register } from "tsx/esm/api";
const tsxApi = register({
  namespace: "cogenie",
});

/**
 * Dynamically load and return the given cogenie step.
 */
export async function loadCogenieStep(
  cogenieStepModuleName: string,
  cogenieStepModulePath: string,
): Promise<ConcreteCogenieStep> {
  // @todo Migrate to using node import directly with strip types flag in future
  // Cannot use `import` directly since it does not support loading .ts files
  // See tsxApi comment above on when this is needed instead of using tsImport
  // directly from the tsx lib.
  const importedModule = await tsxApi.import(
    cogenieStepModulePath,
    import.meta.url,
  );

  // Extract out the named export
  const importedCogenieClass: ConcreteCogenieStep =
    importedModule[cogenieStepModuleName];

  // Check if it is a class by checking for the constructor function
  if (typeof importedCogenieClass !== "function") {
    logger.error(
      loadCogenieStep.name,
      `Cogenie step module is malformed and does not export a valid cogenie step class\nMake sure they are of the same name`,
    );
    logger.error(loadCogenieStep.name, `Module found: ${importedModule}`);
    process.exit(1);
  }

  return importedCogenieClass;
}
