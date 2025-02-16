import fs from "fs/promises";
import path from "path";

/**
 * Generate an array of Ent folder paths string sorted by their file path.
 */
async function generateEntFolders() {
  const folderPath = path.join(import.meta.dirname, `../../../ents`);

  const filesDirent = await fs.readdir(folderPath, {
    withFileTypes: true,
  });

  const entFolders = filesDirent
    // Only look for folders whose name starts with 'Ent'
    .filter((file) => file.isDirectory() && file.name.startsWith("Ent"))

    // Get the folder name only
    .map((folder): string => folder.name)

    // Sort the folders in a stable manner using their name
    .sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });

  return entFolders;
}

let cachedFiles: Readonly<Promise<ReadonlyArray<string>>> | null = null;

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
