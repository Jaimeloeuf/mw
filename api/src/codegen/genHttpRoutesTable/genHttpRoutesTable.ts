import fs from "fs/promises";
import path from "path";
import { logger } from "../../logging/index.js";
import { generatedSrcDirPath } from "../generatedSrcDirPath.js";
import { genAndSaveGeneratedCode } from "../genAndSaveGeneratedCode.js";
import { routeTableTemplate } from "./routeTableTemplate.js";
import { controllerImportTemplate } from "./controllerImportTemplate.js";
import { routeDefinitionTemplate } from "./routeDefinitionTemplate.js";
import type { ControllerFile } from "./ControllerFile.js";

/**
 * Generate the HTTP API ExpressJS routes table file, by looking at all the HTTP
 * controllers in the controllers/ folder.
 */
export async function genHttpRoutesTable() {
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

      // Create file objects with name, full path and extracted http route string.
      .map(async function (file) {
        const fullFilePath = path.resolve(file.parentPath, file.name);
        const fileContent = await fs.readFile(fullFilePath, {
          encoding: "utf8",
        });
        return {
          name: file.name,
          path: fullFilePath,
          version: fileContent.match(/version: (.*),/)?.[1],
          httpRoute: fileContent.match(/path: "(.*)",/)?.[1],
          httpMethod: fileContent.match(/method: "(.*)",/)?.[1],
          controllerName: fileContent.match(/export const (.*) =/)?.[1],
        };
      })
  );

  const { controllerImportStatements, routeDefinitions } = controllerFiles
    // There may be certain files that are not actual controller files in
    // /controller/** like helper functions etc... filter these out.
    .filter(
      (file): file is ControllerFile =>
        file.version !== undefined &&
        file.httpRoute !== undefined &&
        file.httpMethod !== undefined &&
        file.controllerName !== undefined
    )

    // Sort these files by the http route strings alphabetically
    .sort((a, b) =>
      a.httpRoute > b.httpRoute ? 1 : b.httpRoute > a.httpRoute ? -1 : 0
    )

    // Generate the import and route definition statements, and combine them
    // into 2 different arrays.
    .reduce(
      (acc, file) => {
        acc.controllerImportStatements.push(
          controllerImportTemplate(file, controllerFolderPath)
        );
        acc.routeDefinitions.push(routeDefinitionTemplate(file));
        return acc;
      },
      {
        controllerImportStatements: [] as Array<string>,
        routeDefinitions: [] as Array<string>,
      }
    );

  const generatedCode = routeTableTemplate(
    controllerImportStatements.join(""),
    routeDefinitions.join("")
  );

  const routeTableFilePath = path.join(
    generatedSrcDirPath,
    `registerRoutesAndControllers.generated.ts`
  );

  await genAndSaveGeneratedCode(
    genHttpRoutesTable,
    generatedCode,
    routeTableFilePath
  );

  logger.info(
    genHttpRoutesTable.name,
    `Generated HTTP routes table file: ${routeTableFilePath}`
  );
}
