import fs from "fs/promises";
import path from "path";

import type { AsyncJobTypeFile } from "./AsyncJobTypeFile.js";

import { dataOrThrow } from "../../../utils/dataOrThrow.js";
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

  const files = await Promise.all(
    filesDirent
      .filter((file) => file.name.endsWith(".job.ts"))

      // Create file objects with name, full path and extracted http route string.
      .map(async function (file): Promise<AsyncJobTypeFile> {
        const fullFilePath = path.resolve(file.parentPath, file.name);
        const fileContent = await fs.readFile(fullFilePath, {
          encoding: "utf8",
        });
        return {
          path: fullFilePath,
          name: generateFullFileNameFromRelativePath(
            folderPath,
            path.resolve(file.parentPath, file.name),
            ".job.ts",
          ),
          id: dataOrThrow(fileContent.match(/id: "(.*)",/)?.[1]),
        };
      }),
  );

  // Sort these files in a stable manner using their file path
  const sortedFiles = files.sort((a, b) => {
    if (a.path > b.path) {
      return 1;
    }
    if (b.path > a.path) {
      return -1;
    }
    return 0;
  });

  return sortedFiles;
}

let cachedFiles: Readonly<Promise<readonly AsyncJobTypeFile[]>> | null = null;

export async function getAsyncJobTypeFiles() {
  if (cachedFiles === null) {
    cachedFiles = generateAsyncJobTypeFiles();
  }

  return cachedFiles;
}
