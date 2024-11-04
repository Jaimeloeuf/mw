import fs from "fs/promises";
import path from "path";
import type { DataFunctionFile } from "./DataFunctionFile.js";

/**
 * Generate an array of data function files sorted by their file path.
 */
async function generateDataFunctionFiles() {
  const dataFunctionsFolderPath = path.join(
    import.meta.dirname,
    `../../../dal/repo`,
  );

  const filesDirent = await fs.readdir(dataFunctionsFolderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const files = filesDirent
    // Only keep valid .df.ts Data Function files
    .filter((file) => file.name.endsWith(".df.ts"))

    .map((file): DataFunctionFile => {
      return {
        path: path.resolve(file.parentPath, file.name),

        name: path

          // Compute the relative path of data function folder to this df, so
          // that we can use the path to generate the full df name. Doing this
          // so that df names are essentially "namespaced" like they are in
          // their folders, instead of creating globally unique names.
          .relative(
            dataFunctionsFolderPath,
            path.resolve(file.parentPath, file.name),
          )

          // Remove file extension to only keep the name itself
          .replace(".df.ts", "")

          // Use regex to convert path splitters '/' into camelCase delimiters.
          // E.g. leetcode/getQuestion.df.ts to leetcodeGetQuestion.df.ts
          .replace(/\/([a-z])/g, (_, letter) => letter.toUpperCase())

          // Use regex to convert strings with '-' into camelCase delimiters.
          // E.g. blog-subscriber to blogSubscriber
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
      };
    })

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
