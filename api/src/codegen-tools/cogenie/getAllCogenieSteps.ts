import path from "path";

import { getCogenieStepFolders } from "./getCogenieStepFolders.js";
import { loadCogenieStep } from "./loadCogenieStep.js";

/**
 * Dynamically load and return all cogenie steps.
 */
export async function getAllCogenieSteps() {
  const cogenieStepFolders = await getCogenieStepFolders();

  const cogenieSteps = cogenieStepFolders.map((file) =>
    loadCogenieStep(
      file.name,
      path.resolve(file.parentPath, file.name, file.name + ".ts"),
    ),
  );

  // Await for all the module load operations at the same time
  return Promise.all(cogenieSteps);
}
