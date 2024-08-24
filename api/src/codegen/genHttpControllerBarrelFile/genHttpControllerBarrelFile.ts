import fs from "fs/promises";
import path from "path";
import { logger } from "../../logging/index.js";
import { generatedSrcDirPath } from "../generatedSrcDirPath.js";
import { genAndSaveGeneratedCode } from "../genAndSaveGeneratedCode.js";
import { controllerExportTemplate } from "./controllerExportTemplate.js";
import type { ControllerFile } from "./ControllerFile.js";

/**
 * Generate a single barrel file to re-export all the HTTP controllers in the
 * controllers/ folder, so that other files that uses the controllers can easily
 * access it without having to import them manually.
 *
 * This allows users to do something like `import * as c from "./httpControllerBarrelFile.generated.js";`
 */
export async function genHttpControllerBarrelFile() {
  const controllerFolderPath = path.join(
    import.meta.dirname,
    `../../controllers`
  );

  // Read all files in /controller/**
  const controllerFilesDirent = await fs.readdir(controllerFolderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const controllerFiles = await Promise.all(
    controllerFilesDirent
      // Only keep valid .ts files
      .filter((file) => file.name.includes("ts") && file.name !== "index.ts")
      .map(async function (file) {
        const fullFilePath = path.resolve(file.parentPath, file.name);
        const fileContent = await fs.readFile(fullFilePath, {
          encoding: "utf8",
        });
        return {
          name: file.name,
          path: fullFilePath,
          httpRoute: fileContent.match(/path: "(.*)",/)?.[1],
        };
      })
  );

  const { controllerImportStatements } = controllerFiles
    // There may be certain files that are not actual controller files in
    // /controller/** like helper functions etc... filter these out.
    .filter((file): file is ControllerFile => file.httpRoute !== undefined)

    // Sort these files by the http route strings alphabetically
    .sort((a, b) =>
      // @todo if they are the same string but diff version, then should sort by version..?
      a.httpRoute > b.httpRoute ? 1 : b.httpRoute > a.httpRoute ? -1 : 0
    )

    // Generate the import and type definition statements, and combine them
    // into 2 different arrays.
    .reduce(
      (acc, file) => {
        acc.controllerImportStatements.push(
          controllerExportTemplate(file, controllerFolderPath)
        );
        return acc;
      },
      {
        controllerImportStatements: [] as Array<string>,
      }
    );

  const generatedCode = controllerImportStatements.join("");

  const generatedHttpDtoFilePath = path.join(
    generatedSrcDirPath,
    `httpControllerBarrelFile.generated.ts`
  );

  await genAndSaveGeneratedCode(
    genHttpControllerBarrelFile,
    generatedCode,
    generatedHttpDtoFilePath
  );

  logger.info(
    genHttpControllerBarrelFile.name,
    `Generated HTTP controller barrel file: ${generatedHttpDtoFilePath}`
  );
}
