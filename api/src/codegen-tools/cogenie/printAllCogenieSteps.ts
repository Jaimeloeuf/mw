import fs from "fs";

import { cogenieStepsRootDirPath } from "./cogenieStepsRootDirPath.js";

export function printAllCogenieSteps() {
  const dirents = fs.readdirSync(cogenieStepsRootDirPath, {
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
