import { getCogenieStepFolders } from "./getCogenieStepFolders.js";

export async function printAllCogenieSteps() {
  const cogenieStepFolders = await getCogenieStepFolders();

  const cogenieStepFolderNames = cogenieStepFolders.map(
    (dirent) => dirent.name,
  );

  /* eslint-disable no-console */
  console.log("These are the available cogenie steps:");
  cogenieStepFolderNames.forEach((cogenieStep, i) =>
    console.log(`${i + 1}) ${cogenieStep}`),
  );
  console.log();
  /* eslint-enable no-console */
}
