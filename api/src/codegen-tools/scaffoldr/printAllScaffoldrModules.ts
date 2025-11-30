import { getScaffoldrModuleFolders } from "./getScaffoldrModuleFolders.js";

export async function printAllScaffoldrModules() {
  const scaffoldrModuleFolders = await getScaffoldrModuleFolders();

  const scaffoldrModuleFolderNames = scaffoldrModuleFolders.map(
    (dirent) => dirent.name,
  );

  /* eslint-disable no-console */
  console.log("These are the available scaffoldr modules:");
  scaffoldrModuleFolderNames.forEach((scaffoldrModule, i) =>
    console.log(`${i + 1}) ${scaffoldrModule}`),
  );
  console.log();
  /* eslint-enable no-console */
}
