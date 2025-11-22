import fs from "fs/promises";

import { genAndSaveGeneratedFile } from "../genAndSaveGeneratedFile.js";
import { genAndSaveGeneratedCode } from "./genAndSaveGeneratedCode.js";
import { generatedSrcDirPath } from "./generatedSrcDirPath.js";
import { genGeneratedNotice } from "./genGeneratedNotice.js";

/**
 * Generate barrel file for all generated files
 */
export async function genCodegenBarrelFile() {
  const filesInGeneratedFolder = await fs.readdir(generatedSrcDirPath, {
    withFileTypes: true,
  });

  const generatedCode =
    `// Barrel file\n` +
    filesInGeneratedFolder
      .filter((dirent) => dirent.name.endsWith(".generated.ts"))
      // Sort by name alphabetically to always have them in a stable position
      // eslint-disable-next-line no-nested-ternary
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map(
        (dirent) => `export * from "./${dirent.name.replace(".ts", ".js")}";`,
      )
      .join("\n") +
    "\n";

  await genAndSaveGeneratedCode(genCodegenBarrelFile, generatedCode, "index");
  await genAndSaveGeneratedFile({
    generator: genCodegenBarrelFile,
    genGeneratedNotice,
    generatedText: `// This index.ts should NEVER CHANGE
// Because this index.ts is a special case file without the ".generated" file
// extension it does not work with cogenie handling well so this is only
// generated once and left alone, and the actual barrel file is in the
// ".generated" version of this index.ts file.
export * from "./index.generated.js";`,
    generatedFileRootDirPath: generatedSrcDirPath,
    generatedTextFileName: "index",
    generatedTextFileType: ".ts",
    generatedTextFileNameExtension: ".ts",
  });
}
