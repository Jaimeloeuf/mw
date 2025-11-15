import fs from "fs/promises";
import path from "path";

import { codegenForTs, codegenForDoc } from "../../codegen-lib/index.js";
import { logger } from "../../logging/index.js";
import { loadAllCogenieSteps } from "./loadAllCogenieSteps.js";

/**
 * Delete generated files in __generated/ that are out of date.
 *
 * Context is because if the output file of a cogenie step changed, during the
 * next run, the originally generated file will still be there and the new one
 * will also appear. But since the old file is no longer used and not deleted,
 * it is a stale file in our version control.
 */
export async function deleteAllGeneratedFiles() {
  const cogenieSteps = await loadAllCogenieSteps().then((CogenieSteps) =>
    CogenieSteps.map((CogenieStep) => new CogenieStep()),
  );

  const cogenieStepsGeneratedFileTargets = cogenieSteps
    .map((cogenieStep) => Object.values(cogenieStep.getFiles()))
    .flat()
    .map((fileTarget) => fileTarget.name + fileTarget.extension);

  const cogenieStepsGeneratedFileTargetsSet = new Set(
    cogenieStepsGeneratedFileTargets,
  );

  const generatedCodeFilesDirent = await fs.readdir(
    codegenForTs.generatedSrcDirPath,
    {
      recursive: true,
      withFileTypes: true,
    },
  );

  const generatedDocFilesDirent = await fs.readdir(
    codegenForDoc.generatedDocDirPath,
    {
      recursive: true,
      withFileTypes: true,
    },
  );

  const generatedFilesDirent = generatedCodeFilesDirent.concat(
    generatedDocFilesDirent,
  );

  // Wait for all files to be deleted
  const deletedFiles = await Promise.all(
    generatedFilesDirent

      // Only keep valid generated files
      .filter(
        (file) =>
          file.isFile() &&
          (file.name.endsWith(codegenForTs.generatedCodeFileExtension) ||
            file.name.endsWith(
              codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
            ) ||
            file.name.endsWith(codegenForDoc.generatedDocFileExtension)),
      )

      // Map generated files to include a "shortName" used as the key in the
      // generated file targets set
      .map((file) => {
        let fileShortName: string;

        if (file.name.endsWith(codegenForTs.generatedCodeFileExtension)) {
          fileShortName = file.name.replace(
            codegenForTs.generatedCodeFileExtension,
            ".ts",
          );
        } else if (
          file.name.endsWith(
            codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
          )
        ) {
          fileShortName = file.name.replace(
            codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
            ".ts",
          );
        } else if (
          file.name.endsWith(codegenForDoc.generatedDocFileExtension)
        ) {
          fileShortName = file.name.replace(
            codegenForDoc.generatedDocFileExtension,
            ".md",
          );
        } else {
          throw new Error("Not possible since files filtered above");
        }

        return {
          parentPath: file.parentPath,
          name: file.name,
          shortName: fileShortName,
        };
      })

      // Only keep the files (for deletion) that are generated, and is no longer
      // part of the generated file targets set
      .filter(
        (file) => !cogenieStepsGeneratedFileTargetsSet.has(file.shortName),
      )

      // Delete the file and map back the promise to await together
      .map(async (file) => {
        const fullFilePath = path.resolve(file.parentPath, file.name);
        await fs.rm(fullFilePath);
        return fullFilePath;
      }),
  );

  logger.info(
    deleteAllGeneratedFiles.name,
    `Deleted all ${deletedFiles.length} generated files`,
  );
}
