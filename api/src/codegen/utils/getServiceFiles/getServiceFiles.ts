import fs from "fs/promises";
import path from "path";
import { generateFullFileNameFromRelativePath } from "../generateFullFileNameFromRelativePath.js";
import type { ServiceFile } from "./ServiceFile.js";

/**
 * Generate an array of Service files sorted by their file path.
 */
async function generateServiceFiles() {
  const folderPath = path.join(import.meta.dirname, `../../../services`);

  const filesDirent = await fs.readdir(folderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const files = filesDirent
    // Only keep valid .sv.ts service files
    .filter((file) => file.name.endsWith(".sv.ts"))

    .map(
      (file): ServiceFile => ({
        path: path.resolve(file.parentPath, file.name),

        name: generateFullFileNameFromRelativePath(
          folderPath,
          path.resolve(file.parentPath, file.name),
          ".sv.ts",
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

let cachedFiles: Readonly<Promise<readonly ServiceFile[]>> | null = null;

/**
 * Always return the single cachedFiles promise and let the callers resolve
 * themselves but only ever call generateControllerFiles once.
 *
 * This is basically the cached version of generateControllerFiles.
 */
export async function getServiceFiles() {
  if (cachedFiles === null) {
    cachedFiles = generateServiceFiles();
  }

  return cachedFiles;
}
