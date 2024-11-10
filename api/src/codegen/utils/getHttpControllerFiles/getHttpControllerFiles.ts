import fs from "fs/promises";
import path from "path";

import type { HttpControllerFile } from "./HttpControllerFile.js";

import { dataOrThrow } from "../../../utils/dataOrThrow.js";
import { generateFullFileNameFromRelativePath } from "../generateFullFileNameFromRelativePath.js";

/**
 * Generate an array of HTTP controller files with parsed data from within the
 * controllers and sorted by their HTTP route + API version.
 */
async function generateHttpControllerFiles() {
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
          path: fullFilePath,
          name: generateFullFileNameFromRelativePath(
            controllerFolderPath,
            fullFilePath,
            ".ct.ts",
          ),
          version: dataOrThrow(fileContent.match(/version: (.*),/)?.[1]),
          httpRoute: dataOrThrow(fileContent.match(/path: "(.*)",/)?.[1]),
          httpMethod: dataOrThrow(fileContent.match(/method: "(.*)",/)?.[1]),
        } as HttpControllerFile;
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

let cachedFiles: Readonly<Promise<readonly HttpControllerFile[]>> | null = null;

/**
 * Always return the single cachedFiles promise and let the callers resolve
 * themselves but only ever call generateControllerFiles once.
 *
 * This is basically the cached version of generateControllerFiles.
 */
export async function getHttpControllerFiles() {
  if (cachedFiles === null) {
    cachedFiles = generateHttpControllerFiles();
  }

  return cachedFiles;
}
