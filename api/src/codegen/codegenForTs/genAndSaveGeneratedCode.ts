import { genAndSaveGeneratedFile } from "../utils/index.js";
import { generatedSrcDirPath } from "./generatedSrcDirPath.js";
import { genGeneratedNotice } from "./genGeneratedNotice.js";
import { getAllEslintRulesToDisable } from "./getAllEslintRulesToDisable.js";

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
 * 1. Log file name once it is saved
 */
export async function genAndSaveGeneratedCode(
  generator: Function,
  generatedCode: string,
  generatedCodeFileName: string,
  options?: {
    eslintRulesToDisable?: Array<string>;
    doNotIncludeInGeneratedFolderBarrelFile?: true;
  },
) {
  const eslintRuleDisableString = getAllEslintRulesToDisable(
    options?.eslintRulesToDisable,
  );

  const generatedCodeWithEslintRuleDisableStringPrefix =
    eslintRuleDisableString + generatedCode;

  const generatedTextFileNameExtension =
    options?.doNotIncludeInGeneratedFolderBarrelFile
      ? generatedCodeFileExtensionWithNoBarrelFileInclusion
      : generatedCodeFileExtension;

  await genAndSaveGeneratedFile({
    generator,
    genGeneratedNotice,
    generatedText: generatedCodeWithEslintRuleDisableStringPrefix,
    generatedTextFileType: ".ts",
    generatedFileRootDirPath: generatedSrcDirPath,
    generatedTextFileName: generatedCodeFileName,
    generatedTextFileNameExtension,
  });
}

export const generatedCodeFileExtensionWithNoBarrelFileInclusion =
  ".generated.do_not_include_in_barrel_file.ts";

export const generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport =
  generatedCodeFileExtensionWithNoBarrelFileInclusion.replace(".ts", ".js");

export const generatedCodeFileExtension = ".generated.ts";

export const generatedCodeFileExtensionForJsImport =
  generatedCodeFileExtension.replace(".ts", ".js");
