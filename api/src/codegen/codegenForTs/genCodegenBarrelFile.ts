import fs from "fs/promises";
import { generatedSrcDirPath } from "./generatedSrcDirPath.js";
import { filesToSkipForBarrelFileCodegen } from "./filesToSkipForBarrelFileCodegen.js";
import { genAndSaveGeneratedFile } from "../utils/genAndSaveGeneratedFile.js";
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
      .filter(
        (dirent) =>
          dirent.name.endsWith(".generated.ts") &&
          !filesToSkipForBarrelFileCodegen.has(dirent.name),
      )
      // Sort by name alphabetically to always have them in a stable position
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map((dirent) => `export * from './${dirent.name.replace(".ts", ".js")}'`)
      .join("\n");

  await genAndSaveGeneratedFile({
    generator: genCodegenBarrelFile,
    genGeneratedNotice,
    generatedText: generatedCode,
    generatedFileRootDirPath: generatedSrcDirPath,
    generatedTextFileName: "index",
    generatedTextFileType: ".ts",
    generatedTextFileNameExtension: ".ts",
  });
}
