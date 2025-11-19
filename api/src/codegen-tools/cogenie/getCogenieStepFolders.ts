import fs from "fs/promises";

import { cogenieStepsRootDirPath } from "./cogenieStepsRootDirPath.js";

/**
 * Load all cogenie step folders and return them as a list of `Dirent` objects.
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
