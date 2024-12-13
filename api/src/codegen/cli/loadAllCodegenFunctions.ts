import fs from "fs/promises";
import path from "path";

import { loadCodegenFunction } from "./loadCodegenFunction.js";

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
    .map((file) =>
      loadCodegenFunction(
        file.name,
        path.resolve(file.parentPath, file.name, file.name + ".ts"),
      ),
    );

  // Await for all the module load operations at the same time
  return Promise.all(codegenModulePaths);
}
