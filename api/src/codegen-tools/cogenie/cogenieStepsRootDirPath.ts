import path from "path";

// Cogenie steps should be in the cogenie/steps folder, and should be in a
// folder with the same name as itself
export const cogenieStepsRootDirPath = path.resolve(
  import.meta.dirname,
  "./steps",
);
