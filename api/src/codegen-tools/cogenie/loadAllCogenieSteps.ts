import fs from "fs/promises";
import path from "path";

import { loadCogenieStep } from "./loadCogenieStep.js";

/**
 * Dynamically load and return all cogenie steps.
 *
 * Cogenie steps are located in folders under 'cogenie/steps' that start with
 * the `Gen` prefix. For example, `GenHttpRoutesTable` starts with `Gen` and is
 * therefore assumed to be a cogenie step folder.
 *
 * Cogenie steps need to have the same name as their folder name, and the
 * main cogenie step class itself must also be the same name. For example,
 * `GenHttpRoutesTable` is the name of the cogenie step folder, name of the
 * module itself, and name of the exported cogenie step class.
 */
export async function loadAllCogenieSteps() {
  // Cogenie steps should be in the cogenie/steps folder, and should be in a
  // folder with the same name as itself
  const cogenieStepsRootPath = path.resolve(import.meta.dirname, "./steps");

  const allFoldersInCogenieStepsRoot = await fs.readdir(cogenieStepsRootPath, {
    withFileTypes: true,
  });

  const cogenieStepModulePaths = allFoldersInCogenieStepsRoot
    .filter((folder) => folder.name.startsWith("Gen"))
    .map((file) =>
      loadCogenieStep(
        file.name,
        path.resolve(file.parentPath, file.name, file.name + ".ts"),
      ),
    );

  // Await for all the module load operations at the same time
  return Promise.all(cogenieStepModulePaths);
}
