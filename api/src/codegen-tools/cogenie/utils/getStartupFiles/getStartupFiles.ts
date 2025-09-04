import fs from "fs/promises";
import path from "path";

import type { StartupFile } from "./StartupFile.js";

import { generateFullFileNameFromRelativePath } from "../generateFullFileNameFromRelativePath.js";

/**
 * Generate an array of Startup files sorted by their file path.
 */
async function generateStartupFiles() {
  const folderPath = path.join(import.meta.dirname, `../../../../startup`);

  const filesDirent = await fs.readdir(folderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const files = filesDirent
    .filter((file) => file.name.endsWith(".st.ts"))

    .map(
      (file): StartupFile => ({
        path: path.resolve(file.parentPath, file.name),
        name: generateFullFileNameFromRelativePath(
          folderPath,
          path.resolve(file.parentPath, file.name),
          ".st.ts",
        ),
      }),
    )

    // Sort these files in a stable manner using their file path
    .sort((a, b) => {
      if (a.path > b.path) {
        return 1;
      }
      if (b.path > a.path) {
        return -1;
      }
      return 0;
    });

  return files;
}

let cachedFiles: $Nullable<Readonly<Promise<readonly StartupFile[]>>> = null;

/**
 * Always return the single cachedFiles promise and let the callers resolve
 * themselves but only ever call generateControllerFiles once.
 *
 * This is basically the cached version of generateControllerFiles.
 */
export async function getStartupFiles() {
  if (cachedFiles === null) {
    cachedFiles = generateStartupFiles();
  }

  return cachedFiles;
}
