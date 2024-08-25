import path from "path";
import { logger } from "../../logging/index.js";
import { generatedSrcDirPath } from "../generatedSrcDirPath.js";
import { genAndSaveGeneratedCode } from "../genAndSaveGeneratedCode.js";
import { getControllerFiles } from "../utils/getControllerFiles/getControllerFiles.js";
import { routeTableTemplate } from "./routeTableTemplate.js";
import { routeDefinitionTemplate } from "./routeDefinitionTemplate.js";

/**
 * Generate the HTTP API ExpressJS routes table file, by looking at all the HTTP
 * controllers in the controllers/ folder.
 */
export async function genHttpRoutesTable() {
  const controllerFiles = await getControllerFiles();

  // Generate route definition statements, and combine them into a single string
  const routeDefinitions = controllerFiles
    .map((file) => routeDefinitionTemplate(file))
    .join("");

  const generatedCode = routeTableTemplate(routeDefinitions);

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
