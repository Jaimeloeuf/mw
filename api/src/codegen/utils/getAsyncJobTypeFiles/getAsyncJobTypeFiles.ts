import fs from "fs/promises";
import path from "path";

import type { AsyncJobTypeFile } from "./AsyncJobTypeFile.js";

import { generateFullFileNameFromRelativePath } from "../generateFullFileNameFromRelativePath.js";

/**
 * Generate an array of AsyncJobType files sorted by their file path.
 */
async function generateAsyncJobTypeFiles() {
  const folderPath = path.join(import.meta.dirname, `../../../async/jobs`);

  const filesDirent = await fs.readdir(folderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const files = filesDirent
    .filter((file) => file.name.endsWith(".job.ts"))

    .map(
      (file): AsyncJobTypeFile => ({
        path: path.resolve(file.parentPath, file.name),

        name: generateFullFileNameFromRelativePath(
          folderPath,
          path.resolve(file.parentPath, file.name),
          ".job.ts",
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

let cachedFiles: Readonly<Promise<readonly AsyncJobTypeFile[]>> | null = null;

export async function getAsyncJobTypeFiles() {
  if (cachedFiles === null) {
    cachedFiles = generateAsyncJobTypeFiles();
  }

  return cachedFiles;
}
