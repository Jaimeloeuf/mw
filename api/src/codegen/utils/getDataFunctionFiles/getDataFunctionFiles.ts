import fs from "fs/promises";
import path from "path";
import { generateFullFileNameFromRelativePath } from "../generateFullFileNameFromRelativePath.js";
import type { DataFunctionFile } from "./DataFunctionFile.js";

/**
 * Generate an array of data function files sorted by their file path.
 */
async function generateDataFunctionFiles() {
  const dataFunctionsFolderPath = path.join(
    import.meta.dirname,
    `../../../dal/df`,
  );

  const filesDirent = await fs.readdir(dataFunctionsFolderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const files = filesDirent
    // Only keep valid .df.ts Data Function files
    .filter((file) => file.name.endsWith(".df.ts"))

    .map(
      (file): DataFunctionFile => ({
        path: path.resolve(file.parentPath, file.name),

        name: generateFullFileNameFromRelativePath(
          dataFunctionsFolderPath,
          path.resolve(file.parentPath, file.name),
          ".df.ts",
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

let cachedFiles: Readonly<Promise<readonly DataFunctionFile[]>> | null = null;

/**
 * Always return the single cachedFiles promise and let the callers resolve
 * themselves but only ever call generateDataFunctionFiles once.
 *
 * This is basically the cached version of generateDataFunctionFiles.
 */
export async function getDataFunctionFiles() {
  if (cachedFiles === null) {
    cachedFiles = generateDataFunctionFiles();
  }

  return cachedFiles;
}
