import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";

import { generatedDocDirPath } from "../../../codegen-lib/codegenForDoc/index.js";
import { generatedSrcDirPath } from "../../../codegen-lib/codegenForTs/index.js";
import { logger } from "../../../logging/Logger.js";

/**
 * Look for all generated files and check if they are valid by checking if they
 * have been manually modified.
 */
export async function validateGeneratedFiles() {
  const generatedSrcDirFilesDirent = await fs
    .readdir(generatedSrcDirPath, {
      recursive: true,
      withFileTypes: true,
    })
    .then((files) => files.filter((file) => file.name.endsWith(".ts")));

  const generatedDocDirFilesDirent = await fs
    .readdir(generatedDocDirPath, {
      recursive: true,
      withFileTypes: true,
    })
    .then((files) => files.filter((file) => file.name.endsWith(".md")));

  const generatedFilesDirent = [
    ...generatedSrcDirFilesDirent,
    ...generatedDocDirFilesDirent,
  ];

  const generatedFiles = await Promise.all(
    generatedFilesDirent.map(async function (file) {
      const filePath = path.resolve(file.parentPath, file.name);
      const fileContent = await fs.readFile(filePath, { encoding: "utf8" });

      const extractedFileHash = fileContent.match(/sha256\((.*)\)/)?.[1];

      // Assume that no file hash means that this is not a generated file
      if (extractedFileHash === undefined) {
        return null;
      }

      const fileWithoutHash = fileContent.replace(/sha256\([^)]*\)/, "");

      const hash = createHash("sha256")
        .update(fileWithoutHash)
        .digest()
        .toString("hex");

      return {
        name: file.name,
        hash: extractedFileHash,
        fileModified: hash !== extractedFileHash,
      };
    }),
  ).then((files) => files.filter((file) => file !== null));

  const modifiedFiles = generatedFiles.filter((file) => file.fileModified);

  if (modifiedFiles.length === 0) {
    logger.info(validateGeneratedFiles.name, `Generated files are all valid`);
    return;
  }

  logger.error(
    validateGeneratedFiles.name,
    `${modifiedFiles.length}/${generatedFiles.length} generated files is invalid as it is manually modified:`,
  );

  for (let i = 0; i < modifiedFiles.length; i++) {
    logger.error(
      validateGeneratedFiles.name,
      `${i + 1}: ${modifiedFiles[i]!.name}`,
    );
  }

  // non-zero exit code to chain with external systems
  process.exit(1);
}
