import type { Dirent } from "fs";

import fs from "fs/promises";

import { codegenForTs, codegenForDoc } from "../../codegen-lib/index.js";

/**
 * Get all cogenie steps generated files.
 */
export async function getGeneratedFilesDirent() {
  const generatedCodeFilesDirent = await fs
    .readdir(codegenForTs.generatedSrcDirPath, {
      recursive: true,
      withFileTypes: true,
    })
    .then((dirent) =>
      // Filter for generated files
      dirent.filter(
        (file) =>
          file.isFile() &&
          (file.name.endsWith(codegenForTs.generatedCodeFileExtension) ||
            file.name.endsWith(
              codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
            )),
      ),
    );

  const generatedDocFilesDirent = await fs
    .readdir(codegenForDoc.generatedDocDirPath, {
      recursive: true,
      withFileTypes: true,
    })
    .then((dirent) =>
      // Filter for generated files
      dirent.filter(
        (file) =>
          file.isFile() &&
          file.name.endsWith(codegenForDoc.generatedDocFileExtension),
      ),
    );

  const generatedFilesDirent = [
    ...generatedCodeFilesDirent,
    ...generatedDocFilesDirent,
  ];

  return generatedFilesDirent;
}

let cachedValue: $Nullable<Readonly<Promise<ReadonlyArray<Dirent<string>>>>> =
  null;

/**
 * Cached version of `getGeneratedFilesDirent`.
 *
 * Always return the single cachedValue promise and let the callers resolve
 * themselves but only ever call `getGeneratedFilesDirent` once.
 *
 * This is usually cacheable because we do not expect generated files to change
 * during a single run of codegen tools.
 */
export async function getCachedGeneratedFilesDirent() {
  if (cachedValue === null) {
    cachedValue = getGeneratedFilesDirent();
  }
  return cachedValue;
}
