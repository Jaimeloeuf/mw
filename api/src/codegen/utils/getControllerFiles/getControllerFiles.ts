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
    `../../../controllers-http`,
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
          controllerName: file.name.replace(".ts", "") + "Controller",
        };
      }),
  ).then((possibleControllerFiles) =>
    possibleControllerFiles
      // There may be certain files that are not actual controller files in
      // /controller/** like helper functions etc... filter these out.
      .filter(
        (file): file is ControllerFile =>
          file.version !== undefined &&
          file.httpRoute !== undefined &&
          file.httpMethod !== undefined,
      )

      // Sort these files by the http route strings alphabetically and version
      .sort((a, b) => {
        /* If the routes are different, sort them alphabetically */
        if (a.httpRoute > b.httpRoute) {
          return 1;
        }
        if (b.httpRoute > a.httpRoute) {
          return -1;
        }

        /* If they are the same route but different versions, sort by version */
        if (a.httpRoute === b.httpRoute) {
          // neutral versions will always come first
          if (a.version === '"neutral"') {
            return -1;
          }
          if (b.version === '"neutral"') {
            return 1;
          }
          return Number(a.version) - Number(b.version);
        }

        return 0;
      }),
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
