import fs from "fs/promises";

import { cogenieStepsRootDirPath } from "./cogenieStepsRootDirPath.js";

/**
 * Load all cogenie step folders and return them as a list of `Dirent` objects.
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
export async function getCogenieStepFolders() {
  const dirents = await fs.readdir(cogenieStepsRootDirPath, {
    withFileTypes: true,
  });

  const cogenieStepFolders = dirents.filter(
    (dirent) => dirent.isDirectory() && dirent.name.startsWith("Gen"),
  );

  return cogenieStepFolders;
}
