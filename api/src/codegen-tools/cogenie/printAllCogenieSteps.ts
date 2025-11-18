import fs from "fs/promises";

import { cogenieStepsRootDirPath } from "./cogenieStepsRootDirPath.js";

export async function printAllCogenieSteps() {
  const dirents = await fs.readdir(cogenieStepsRootDirPath, {
    withFileTypes: true,
  });

  const cogenieStepFolders = dirents
    .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith("Gen"))
    .map((dirent) => dirent.name);

  /* eslint-disable no-console */
  console.log("These are the available cogenie steps:");
  cogenieStepFolders.forEach((cogenieStep, i) =>
    console.log(`${i + 1}) ${cogenieStep}`),
  );
  console.log();
  /* eslint-enable no-console */
}
