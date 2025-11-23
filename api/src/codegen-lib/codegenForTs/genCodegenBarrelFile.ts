import fs from "fs/promises";

import { genAndSaveGeneratedCode } from "./genAndSaveGeneratedCode.js";
import { generatedCodeFileExtension } from "./generatedCodeFileExtension.js";
import { generatedSrcDirPath } from "./generatedSrcDirPath.js";

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
      .filter(
        (dirent) =>
          dirent.name.endsWith(generatedCodeFileExtension) &&
          // Exclude itself from the barrel file
          dirent.name !== "index.generated.ts",
      )
      // Sort by name alphabetically to always have them in a stable position
      // eslint-disable-next-line no-nested-ternary
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map(
        (dirent) => `export * from "./${dirent.name.replace(".ts", ".js")}";`,
      )
      .join("\n") +
    "\n";

  await genAndSaveGeneratedCode(genCodegenBarrelFile, generatedCode, "index");
}
