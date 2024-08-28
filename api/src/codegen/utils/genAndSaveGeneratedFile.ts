import path from "path";
import fs from "fs/promises";
import * as prettier from "prettier";
import { createHash } from "crypto";
import { logger } from "../../logging/index.js";

/**
 * Generate the full text file (formatted + notice + hash) and save the file to
 * the provided path.
 *
 * This function will
 * 1. Format the given text with prettier
 * 1. Create a sha256 hash in hexcode for your generated text
 * 1. Create the generated text warning/notice
 * 1. Combine all of these into a single string
 * 1. Save the full generated text to the provided file path
 * 1. Log file name once it is saved
 */
export async function genAndSaveGeneratedFile({
  generator,
  genGeneratedNotice,
  generatedText,
  generatedTextFileType,
  generatedFileRootDirPath,
  generatedTextFileName,
  generatedTextFileNameExtension,
}: {
  generator: Function;
  genGeneratedNotice: (generator: Function, hash: string) => string;
  generatedText: string;
  generatedTextFileType: ".ts" | ".md";
  generatedFileRootDirPath: string;
  generatedTextFileName: string;
  generatedTextFileNameExtension: string;
}) {
  const generatedTextAfterFormatting = await prettier.format(generatedText, {
    // Use this to trick prettier to use an appropriate parser automatically
    filepath: generatedTextFileType,
  });

  // Wrap it so that it is easy to parse out with regex when needed
  const hash = `sha256<${createHash("sha256")
    .update(generatedTextAfterFormatting)
    .digest()
    .toString("hex")}>`;

  const notice = genGeneratedNotice(generator, hash);

  const fullyGeneratedText = notice + generatedTextAfterFormatting;

  const filePath = path.join(
    generatedFileRootDirPath,
    `${generatedTextFileName}${generatedTextFileNameExtension}`,
  );

  await fs.writeFile(filePath, fullyGeneratedText);

  logger.info(generator.name, `Generated file: ${filePath}`);
}
