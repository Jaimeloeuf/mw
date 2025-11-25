import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import { format as prettierFormatter } from "prettier";

import type { GeneratedFileTarget } from "./GeneratedFileTarget.js";

import { logger } from "../logging/index.js";

/**
 * Generate the full text file (formatted + notice + hash) and save the file to
 * the provided path.
 *
 * This function will
 * 1. Format the given text with prettier
 * 1. Create the generated text warning/notice without hash
 * 1. Combine given text and notice into a single string
 * 1. Create a sha256 hash in hexcode for the combined string.
 * 1. Create the generated text warning/notice with the new hash
 * 1. Combine given text and notice with hash into a single string
 * 1. Save the full generated text to the provided file path
 * 1. Log file name once it is saved
 *
 * Return details of the generated file.
 */
export async function genAndSaveGeneratedFile({
  generator,
  genGeneratedNotice,
  generatedText,
  generatedFileTarget,
  generatedFileRootDirPath,
}: {
  generator: Function;
  genGeneratedNotice: (generator: Function, hash: string) => string;
  generatedText: string;
  generatedFileTarget: GeneratedFileTarget;
  generatedFileRootDirPath: string;
}) {
  const generatedTextAfterFormatting = await prettierFormatter(generatedText, {
    // Use this to make prettier automatically use the right parser/formatter
    filepath: generatedFileTarget.extension,
  });

  const noticeWithoutHash = genGeneratedNotice(generator, "");

  const fullyGeneratedTextWithoutHash =
    noticeWithoutHash + generatedTextAfterFormatting;

  // Wrap it so that it is easy to parse out with regex when needed
  const hash = `sha256(${createHash("sha256")
    .update(fullyGeneratedTextWithoutHash)
    .digest()
    .toString("hex")})`;

  const notice = genGeneratedNotice(generator, hash);

  const fullyGeneratedText = notice + generatedTextAfterFormatting;

  const fileNameWithExtension = `${generatedFileTarget.name}${generatedFileTarget.extension}`;

  const filePath = path.join(generatedFileRootDirPath, fileNameWithExtension);

  await fs.writeFile(filePath, fullyGeneratedText);

  logger.info(generator.name, `Generated file: ${filePath}`);

  return {
    filePath,
  };
}
