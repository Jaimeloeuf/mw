import fs from "fs/promises";
import path from "path";

import {
  generatedSrcDirPath,
  generatedCodeFileExtension,
  generatedCodeFileExtensionWithNoBarrelFileInclusion,
} from "../../../codegen-lib/codegenForTs/index.js";
import { logger } from "../../../logging/index.js";

/**
 * Delete all generated files in __generated/ so that codegen can start afresh.
 *
 * Reason is because if the output file of a codegen step changed, during the
 * next run, the originally generated file will still be there and the new will
 * also appear. But since the old file is no longer used and not deleted, it is
 * a stale file in our version control.
 *
 * Since we are not able to determine which files have changed and which hasnt,
 * the only safe way to do this is to delete all generated files and generate
 * all of them again.
 */
export async function deleteAllGeneratedFiles() {
  // @todo Delete generated docs too!
  const generatedFilesDirent = await fs.readdir(generatedSrcDirPath, {
    recursive: true,
    withFileTypes: true,
  });

  // Wait for all files to be deleted
  const { length: numberOfFilesDeleted } = await Promise.all(
    generatedFilesDirent

      // Only keep valid generated files
      .filter(
        (file) =>
          file.isFile() &&
          (file.name.endsWith(generatedCodeFileExtension) ||
            file.name.endsWith(
              generatedCodeFileExtensionWithNoBarrelFileInclusion,
            )),
      )

      // Delete the file and map back the promise to await together
      .map((file) => fs.rm(path.resolve(file.parentPath, file.name))),
  );

  logger.info(
    deleteAllGeneratedFiles.name,
    `Deleted all ${numberOfFilesDeleted} generated files`,
  );
}
