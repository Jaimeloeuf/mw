import fs from "fs/promises";
import path from "path";

import type { EntFile } from "./EntFile.js";

import { dataOrThrow } from "../../../utils/dataOrThrow.js";

/**
 * Generate an array of Ent folder paths string sorted by their file path.
 */
async function generateEntFolders() {
  const folderPath = path.join(import.meta.dirname, `../../../ents`);

  const filesDirent = await fs.readdir(folderPath, {
    withFileTypes: true,
  });

  const awaitableFiles = filesDirent
    // Only look for folders whose name starts with 'Ent'
    .filter((file) => file.isDirectory() && file.name.startsWith("Ent"))

    // Get the folder name only
    .map(async (file): Promise<EntFile> => {
      const entFullFilePath = path.resolve(
        file.parentPath,
        file.name,
        `${file.name}.ts`,
      );
      const fileContent = await fs.readFile(entFullFilePath, {
        encoding: "utf8",
      });

      return {
        name: file.name,
        entTypeID: dataOrThrow(
          fileContent.match(/static override EntTypeID = "(.*)";/)?.[1],
        ),
      };
    });

  const files = await Promise.all(awaitableFiles);

  // Sort the folders in a stable manner using their name
  const sortedFiles = files.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
    return 0;
  });

  return sortedFiles;
}

let cachedFiles: $Nullable<Readonly<Promise<ReadonlyArray<EntFile>>>> = null;

/**
 * Always return the single cachedFiles promise and let the callers resolve
 * themselves but only ever call generateEntFolders once.
 *
 * This is basically the cached version of generateEntFolders.
 */
export async function getEntFolders() {
  if (cachedFiles === null) {
    cachedFiles = generateEntFolders();
  }

  return cachedFiles;
}
