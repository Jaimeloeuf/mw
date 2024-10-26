import fs from "fs/promises";
import path from "path";
import { tsImport } from "tsx/esm/api";
import { logger } from "../../logging/index.js";
import type { CodegenFunction } from "./CodegenFunction.js";

/**
 * Dynamically load and return all the codegen functions.
 *
 * Codegen modules are located in folders under 'codegen/' that start with the
 * `gen` prefix. For example, `genHttpRoutesTable` starts with `gen` and is
 * therefore assumed to be a codegen module folder.
 *
 * Codegen modules need to have the same name as their folder name, and the
 * main codegen function itself must also be the same name. For example,
 * `genHttpRoutesTable` is the name of the codegen module folder, name of the
 * module itself, and name of the exported codegen function.
 */
export async function loadAllCodegenFunctions() {
  // Codegen module should be in this codegen/ folder, and should be in a folder
  // with the same name as itself
  const codegenModulePath = path.resolve(import.meta.dirname, "../");

  const allFoldersInCodegenFolder = await fs.readdir(codegenModulePath, {
    withFileTypes: true,
  });

  const codegenModulePaths = allFoldersInCodegenFolder
    .filter((folder) => folder.name.startsWith("gen"))
    .map(async (file) => {
      // Cannot use `import` directly since it does not support loading .ts files
      const importedModule = await tsImport(
        path.resolve(file.parentPath, file.name, file.name + ".ts"),
        import.meta.url,
      );

      // Extract out the named export and make sure it is a function
      const importedCodegenFunction: CodegenFunction =
        importedModule[file.name];

      if (typeof importedCodegenFunction !== "function") {
        logger.error(
          loadAllCodegenFunctions.name,
          `Codegen module is malformed and does not export codegen function\nMake sure they are of the same name`,
        );
        logger.error(
          loadAllCodegenFunctions.name,
          `Module found: ${importedModule}`,
        );
        process.exit(1);
      }

      return importedCodegenFunction;
    });

  // Await for all the module load operations at the same time
  return Promise.all(codegenModulePaths);
}
