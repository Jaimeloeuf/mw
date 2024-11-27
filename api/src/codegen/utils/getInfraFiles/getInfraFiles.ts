import fs from "fs/promises";
import path from "path";

import type { InfraFile } from "./InfraFile.js";

import { generateFullFileNameFromRelativePath } from "../generateFullFileNameFromRelativePath.js";

/**
 * Generate an array of Infra files sorted by their file path.
 */
async function generateInfraFiles() {
  const folderPath = path.join(import.meta.dirname, `../../../infra`);

  const filesDirent = await fs.readdir(folderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const files = filesDirent
    // Only keep valid .in.ts infra files
    .filter((file) => file.name.endsWith(".in.ts"))

    .map(
      (file): InfraFile => ({
        path: path.resolve(file.parentPath, file.name),

        name: generateFullFileNameFromRelativePath(
          folderPath,
          path.resolve(file.parentPath, file.name),
          ".in.ts",
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

let cachedFiles: Readonly<Promise<readonly InfraFile[]>> | null = null;

/**
 * Always return the single cachedFiles promise and let the callers resolve
 * themselves but only ever call generateControllerFiles once.
 *
 * This is basically the cached version of generateControllerFiles.
 */
export async function getInfraFiles() {
  if (cachedFiles === null) {
    cachedFiles = generateInfraFiles();
  }

  return cachedFiles;
}
