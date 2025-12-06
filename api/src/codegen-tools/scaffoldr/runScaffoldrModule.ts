import fs from "fs";
import path from "path";

import type { Scaffoldr } from "./Scaffoldr.js";

import { logger } from "../../logging/index.js";
import { printScaffoldrCliHelp } from "./printScaffoldrCliHelp.js";
import { scaffoldrModulesRootDirPath } from "./scaffoldrModulesRootDirPath.js";

// Register a namespaced tsx API, so that imports have module caching, which is
// needed so that when different scaffoldr load the same files/folders, the
// result is cached instead of being re-ran for every single step that uses it.
import { register } from "tsx/esm/api";
const tsxApi = register({
  namespace: "scaffoldr",
});

/**
 * Dynamically load and run the given Scaffoldr Module.
 */
export async function runScaffoldrModule(scaffoldrModuleName: string) {
  const scaffoldrModulePath = path.resolve(
    scaffoldrModulesRootDirPath,
    scaffoldrModuleName,
    "index.ts",
  );

  const moduleExists = fs.existsSync(scaffoldrModulePath);
  if (!moduleExists) {
    logger.error(
      runScaffoldrModule.name,
      `Scaffoldr Module does not exist: ${scaffoldrModuleName}\n`,
    );
    printScaffoldrCliHelp();
    return;
  }

  // @todo Migrate to using node import directly with strip types flag in future
  // Cannot use `import` directly since it does not support loading .ts files
  // See tsxApi comment above on when this is needed instead of using tsImport
  // directly from the tsx lib.
  const importedModule = await tsxApi.import(
    scaffoldrModulePath,
    import.meta.url,
  );

  // Extract out the named export
  const importedScaffoldrModule: ReturnType<typeof Scaffoldr> =
    importedModule.default;

  if (
    typeof importedScaffoldrModule !== "object" ||
    typeof importedScaffoldrModule.run !== "function"
  ) {
    logger.error(
      runScaffoldrModule.name,
      `Scaffoldr Module is malformed as it does not have a valid export`,
    );
    logger.error(runScaffoldrModule.name, `Module found: ${importedModule}`);
    process.exit(1);
  }

  await importedScaffoldrModule.run();
}
