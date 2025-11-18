import path from "path";

/**
 * Cogenie steps should be in the cogenie/steps folder, and should be defined in
 * a folder with the same name as itself.
 *
 * ### Example
 * A cogenie step called `GenSomething` should be defined in
 * `cogenie/steps/GenSomething/GenSomething.ts`.
 */
export const cogenieStepsRootDirPath = path.resolve(
  import.meta.dirname,
  "./steps",
);
