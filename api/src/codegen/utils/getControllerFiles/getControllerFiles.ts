import fs from "fs/promises";
import path from "path";
import type { ControllerFile } from "./ControllerFile.js";

/**
 * Generate an array of controller files with parsed data from within the
 * controllers and sorted by their HTTP route + API version.
 */
async function generateControllerFiles() {
  const controllerFolderPath = path.join(
    import.meta.dirname,
    `../../../controllers`
  );

  // Read all files in /controller/**
  const controllerFilesDirent = await fs.readdir(controllerFolderPath, {
    recursive: true,
    withFileTypes: true,
  });

  return Promise.all(
    controllerFilesDirent
      // Only keep valid .ts files
      .filter((file) => file.name.endsWith(".ts") && file.name !== "index.ts")

      // Create file objects with name, full path and extracted http route string.
      .map(async function (file) {
        const fullFilePath = path.resolve(file.parentPath, file.name);
        const fileContent = await fs.readFile(fullFilePath, {
          encoding: "utf8",
        });
        return {
          name: file.name,
          path: fullFilePath,
          version: fileContent.match(/version: (.*),/)?.[1],
          httpRoute: fileContent.match(/path: "(.*)",/)?.[1],
          httpMethod: fileContent.match(/method: "(.*)",/)?.[1],
          controllerName: fileContent.match(/export const (.*) =/)?.[1],
        };
      })
  ).then((possibleControllerFiles) =>
    possibleControllerFiles
      // There may be certain files that are not actual controller files in
      // /controller/** like helper functions etc... filter these out.
      .filter(
        (file): file is ControllerFile =>
          file.version !== undefined &&
          file.httpRoute !== undefined &&
          file.httpMethod !== undefined &&
          file.controllerName !== undefined
      )

      // Sort these files by the http route strings alphabetically
      .sort((a, b) =>
        // @todo if they are the same string but diff version, then should sort by version..?
        a.httpRoute > b.httpRoute ? 1 : b.httpRoute > a.httpRoute ? -1 : 0
      )
  );
}

let controllerFiles: Readonly<Promise<readonly ControllerFile[]>> | null = null;

/**
 * Always return the single controllerFiles promise and let the callers resolve
 * themselves but only ever call generateControllerFiles once.
 *
 * This is basically the cached version of generateControllerFiles.
 */
export async function getControllerFiles() {
  if (controllerFiles === null) {
    controllerFiles = generateControllerFiles();
  }

  return controllerFiles;
}
