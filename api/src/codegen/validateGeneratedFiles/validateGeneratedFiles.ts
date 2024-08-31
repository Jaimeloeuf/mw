import fs from "fs/promises";
import path from "path";
import { createHash } from "crypto";
import {
  generatedSrcDirPath,
  genGeneratedNotice as genGeneratedNoticeForCode,
} from "../codegenForTs/index.js";
import {
  generatedDocDirPath,
  genGeneratedNotice as genGeneratedNoticeForDoc,
} from "../codegenForDoc/index.js";
import { logger } from "../../logging/Logger.js";

const getNoticeLinesOfCode = (notice: string) => notice.split(/\n/).length - 1;

const generatedCodeNoticeLinesOfCode = getNoticeLinesOfCode(
  genGeneratedNoticeForCode({ name: "" } as Function, ""),
);
const generatedCodeNoticeLinesOfDoc = getNoticeLinesOfCode(
  genGeneratedNoticeForDoc({ name: "" } as Function, ""),
);

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

      const fileType = ".".concat(file.name.split(".").at(-1)!);
      const generatedNoticeLinesOfCode =
        fileType === ".ts"
          ? generatedCodeNoticeLinesOfCode
          : fileType === ".md"
            ? generatedCodeNoticeLinesOfDoc
            : 0;

      // Always assume that all files uses LF as EOL
      const fileContentWithoutGeneratedNotice = fileContent
        .split(/\n/)
        .slice(generatedNoticeLinesOfCode)
        .join("\n");

      const computedFileHash = createHash("sha256")
        .update(fileContentWithoutGeneratedNotice)
        .digest()
        .toString("hex");

      return {
        name: file.name,
        path: filePath,
        hash: extractedFileHash,
        fileModified: computedFileHash !== extractedFileHash,
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
      `${i + 1}: ${modifiedFiles[i]!.path}`,
    );
  }
}
