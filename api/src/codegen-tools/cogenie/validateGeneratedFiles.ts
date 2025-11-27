import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";

import { logger } from "../../logging/Logger.js";
import { getCachedGeneratedFilesDirent } from "./getGeneratedFilesDirent.js";
import { getStaleGeneratedFiles } from "./getStaleGeneratedFiles.js";

type GeneratedFilesWithHash = {
  name: string;
  fileContent: string;
  extractedFileHash: string;
};
type GeneratedFilesWithoutHash = {
  name: string;
  fileContent: string;
  extractedFileHash: undefined;
};
type GeneratedFilesWithMaybeHash =
  | GeneratedFilesWithHash
  | GeneratedFilesWithoutHash;

/**
 * Look for all generated files and check if they are valid by checking if they
 * have been manually modified.
 */
export async function validateGeneratedFiles() {
  const generatedFilesDirent = await getCachedGeneratedFilesDirent();

  const generatedFiles: Array<GeneratedFilesWithMaybeHash> = await Promise.all(
    generatedFilesDirent.map(async function (file) {
      const filePath = path.resolve(file.parentPath, file.name);
      const fileContent = await fs.readFile(filePath, { encoding: "utf8" });
      const extractedFileHash = fileContent.match(/sha256\((.*)\)/)?.[1];
      return {
        name: file.name,
        fileContent,
        extractedFileHash,
      };
    }),
  );

  const generatedFilesWithHash: Array<GeneratedFilesWithHash> = [];
  const generatedFilesWithoutHash: Array<GeneratedFilesWithoutHash> = [];
  for (const file of generatedFiles) {
    if (file.extractedFileHash !== undefined) {
      generatedFilesWithHash.push(file);
    } else {
      generatedFilesWithoutHash.push(file);
    }
  }

  const generatedFilesHaveHash = validateGeneratedFilesHaveHash(
    generatedFiles,
    generatedFilesWithoutHash,
  );

  const generatedFilesHaveValidHash = validateGeneratedFilesHaveValidHash(
    generatedFiles,
    generatedFilesWithHash,
  );

  const generatedFilesAreNotStale =
    await validateGeneratedFilesAreNotStale(generatedFiles);

  if (
    generatedFilesHaveHash &&
    generatedFilesHaveValidHash &&
    generatedFilesAreNotStale
  ) {
    logger.info(
      validateGeneratedFiles.name,
      `All ${generatedFiles.length} Cogenie generated files are valid`,
    );
    return;
  }

  // non-zero exit code to chain with external systems
  process.exit(1);
}

function validateGeneratedFilesHaveHash(
  generatedFiles: Array<GeneratedFilesWithMaybeHash>,
  generatedFilesWithoutHash: Array<GeneratedFilesWithoutHash>,
) {
  if (generatedFilesWithoutHash.length === 0) {
    return true;
  }

  logger.error(
    validateGeneratedFiles.name,
    `${generatedFilesWithoutHash.length}/${generatedFiles.length} generated files are invalid as they are missing their hash:`,
  );

  for (let i = 0; i < generatedFilesWithoutHash.length; i++) {
    logger.error(
      validateGeneratedFiles.name,
      `Error ${i + 1}: ${generatedFilesWithoutHash[i]!.name}`,
    );
  }

  return false;
}

function validateGeneratedFilesHaveValidHash(
  generatedFiles: Array<GeneratedFilesWithMaybeHash>,
  generatedFilesWithHash: Array<GeneratedFilesWithHash>,
) {
  const modifiedFiles = generatedFilesWithHash.filter(function (file) {
    const fileWithoutHash = file.fileContent.replace(/sha256\([^)]*\)/, "");

    const hash = createHash("sha256")
      .update(fileWithoutHash)
      .digest()
      .toString("hex");

    return hash !== file.extractedFileHash;
  });

  if (modifiedFiles.length === 0) {
    return true;
  }

  logger.error(
    validateGeneratedFiles.name,
    `${modifiedFiles.length}/${generatedFiles.length} generated files are invalid as they are manually modified:`,
  );

  for (let i = 0; i < modifiedFiles.length; i++) {
    logger.error(
      validateGeneratedFiles.name,
      `Error ${i + 1}: ${modifiedFiles[i]!.name}`,
    );
  }

  return false;
}

async function validateGeneratedFilesAreNotStale(
  generatedFiles: Array<GeneratedFilesWithMaybeHash>,
) {
  const staleGeneratedFiles = await getStaleGeneratedFiles();

  if (staleGeneratedFiles.length === 0) {
    return true;
  }

  logger.error(
    validateGeneratedFiles.name,
    `${staleGeneratedFiles.length}/${generatedFiles.length} generated files are stale:`,
  );

  for (let i = 0; i < staleGeneratedFiles.length; i++) {
    logger.error(
      validateGeneratedFiles.name,
      `Stale file ${i + 1}: ${staleGeneratedFiles[i]!.name}`,
    );
  }

  return false;
}
