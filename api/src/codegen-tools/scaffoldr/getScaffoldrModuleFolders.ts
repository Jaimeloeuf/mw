import fs from "fs/promises";

import { scaffoldrModulesRootDirPath } from "./scaffoldrModulesRootDirPath.js";

/**
 * Load all scaffoldr modules and return them as a list of `Dirent` objects.
 *
 * Scaffoldr modules are located in folders under 'scaffoldr/modules'.
 */
export async function getScaffoldrModuleFolders() {
  const dirents = await fs.readdir(scaffoldrModulesRootDirPath, {
    withFileTypes: true,
  });

  const scaffoldrModuleFolders = dirents.filter((dirent) =>
    dirent.isDirectory(),
  );

  return scaffoldrModuleFolders;
}
