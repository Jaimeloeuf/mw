import { genAndSaveGeneratedFile } from "../utils/index.js";
import { generatedDocDirPath } from "./generatedDocDirPath.js";
import { genGeneratedNotice } from "./genGeneratedNotice.js";

/**
 * Generate the full file (formatted + notice + hash) from the generator name
 * and generated doc, and save the file to the provided path.
 *
 * This function will
 * 1. Format the given doc with prettier
 * 1. Create a sha256 hash in hexcode for your generated doc
 * 1. Create the generated doc warning/notice
 * 1. Combine all of these into a single string
 * 1. Save the full generated doc to the provided file path
 * 1. Log file name once it is saved
 */
export async function genAndSaveGeneratedDoc(
  generator: Function,
  generatedDoc: string,
  generatedDocFileName: string,
) {
  await genAndSaveGeneratedFile({
    generator,
    genGeneratedNotice,
    generatedText: generatedDoc,
    generatedTextFileType: ".md",
    generatedFileRootDirPath: generatedDocDirPath,
    generatedTextFileName: generatedDocFileName,
    generatedTextFileNameExtension: ".generated.md",
  });
}
