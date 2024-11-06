import fs from "fs/promises";
import path from "path";
import type { ControllerFile } from "./ControllerFile.js";

/**
 * Utility to get the data back if it is not null/undefined, else if it is null/
 * undefined, this will throw an Error.
 */
function dataOrThrow<T>(data: T | null | undefined): T {
  if (data === null || data === undefined) {
    throw new Error(`${dataOrThrow.name} found ${data}`);
  }
  return data;
}

/**
 * Generate an array of controller files with parsed data from within the
 * controllers and sorted by their HTTP route + API version.
 */
async function generateControllerFiles() {
  const controllerFolderPath = path.join(
    import.meta.dirname,
    `../../../controllers-http`,
  );

  const filesDirent = await fs.readdir(controllerFolderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const files = await Promise.all(
    filesDirent
      // Only keep valid .ct.ts controller files
      .filter((file) => file.name.endsWith(".ct.ts"))

      // Create file objects with name, full path and extracted http route string.
      .map(async function (file) {
        const fullFilePath = path.resolve(file.parentPath, file.name);
        const fileContent = await fs.readFile(fullFilePath, {
          encoding: "utf8",
        });
        return {
          name: file.name,
          path: fullFilePath,
          version: dataOrThrow(fileContent.match(/version: (.*),/)?.[1]),
          httpRoute: dataOrThrow(fileContent.match(/path: "(.*)",/)?.[1]),
          httpMethod: dataOrThrow(fileContent.match(/method: "(.*)",/)?.[1]),
          controllerName: file.name.replace(".ct.ts", "") + "Controller",
        } as ControllerFile;
      }),
  );

  // Sort these files by the http route strings alphabetically and version
  const sortedFiles = files.sort((a, b) => {
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
  });

  return sortedFiles;
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
