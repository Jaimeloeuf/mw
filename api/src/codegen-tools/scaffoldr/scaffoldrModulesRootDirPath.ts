import path from "path";

/**
 * Scaffoldr Modules should be in the scaffoldr/modules folder, and should be
 * defined in a folder with the same name as itself.
 *
 * ### Example
 * A module called `HttpController` should be defined in
 * `scaffoldr/modules/HttpController/HttpController.ts`.
 */
export const scaffoldrModulesRootDirPath = path.resolve(
  import.meta.dirname,
  "./modules",
);
