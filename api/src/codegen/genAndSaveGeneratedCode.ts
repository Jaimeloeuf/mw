import fs from "fs/promises";
import * as prettier from "prettier";
import { createHash } from "crypto";
import { genGeneratedNotice } from "./genGeneratedNotice.js";

/**
 * Generate the full code file (formatted + notice + hash) from the generator
 * name and generated code, and save the file to the provided path.
 *
 * This function will
 * 1. Format the given code with prettier
 * 1. Create a sha256 hash in hexcode for your generated code
 * 1. Create the generated code warning/notice
 * 1. Combine all of these into a single string
 * 1. Save the full generated code to the provided file path
 */
export async function genAndSaveGeneratedCode(
  generator: Function,
  generatedCode: string,
  generatedCodeFilePath: string
) {
  const generatedCodeAfterFormatting = await prettier.format(generatedCode, {
    // Use this to trick prettier to use a TS parser automatically
    filepath: ".ts",
  });

  const codeHash = createHash("sha256")
    .update(generatedCodeAfterFormatting)
    .digest()
    .toString("hex");

  // Wrap it so that it is easy to parse out with regex when needed
  const wrappedCodeHash = `sha256<${codeHash}>`;

  const notice = genGeneratedNotice(generator, wrappedCodeHash);

  const fullGeneratedCode = notice + generatedCodeAfterFormatting;

  await fs.writeFile(generatedCodeFilePath, fullGeneratedCode);
}
