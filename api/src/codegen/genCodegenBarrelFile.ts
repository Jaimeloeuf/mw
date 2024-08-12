import fs from "fs/promises";
import path from "path";
import { logger } from "../logging/index.js";
import { generatedSrcDirPath } from "./generatedSrcDirPath.js";
import { genAndSaveGeneratedCode } from "./genAndSaveGeneratedCode.js";

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
          dirent.name !== "index.ts" &&
          dirent.name !== "README.md" &&
          dirent.name.endsWith(".ts")
      )
      // Sort by name alphabetically to always have them in a stable position
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map((dirent) => `export * from './${dirent.name.replace(".ts", ".js")}'`)
      .join("\n\n");

  const generatedFilePath = path.resolve(generatedSrcDirPath, `index.ts`);

  await genAndSaveGeneratedCode(
    genCodegenBarrelFile,
    generatedCode,
    generatedFilePath
  );

  logger.info(
    genCodegenBarrelFile.name,
    `Generated barrel file: '${generatedFilePath}'`
  );
}
