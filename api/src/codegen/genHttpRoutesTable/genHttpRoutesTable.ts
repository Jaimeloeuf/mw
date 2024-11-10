import { genAndSaveGeneratedCode } from "../codegenForTs/index.js";
import { getHttpControllerFiles } from "../utils/getHttpControllerFiles/getHttpControllerFiles.js";
import { routeDefinitionTemplate } from "./routeDefinitionTemplate.js";
import { routeTableTemplate } from "./routeTableTemplate.js";

/**
 * Generate the HTTP API ExpressJS routes table file, by looking at all the HTTP
 * controllers in the controllers/ folder.
 */
export async function genHttpRoutesTable() {
  const controllerFiles = await getHttpControllerFiles();

  // Generate route definition statements, and combine them into a single string
  const routeDefinitions = controllerFiles
    .map((file) => routeDefinitionTemplate(file))
    .join("");

  const generatedCode = routeTableTemplate(routeDefinitions);

  await genAndSaveGeneratedCode(
    genHttpRoutesTable,
    generatedCode,
    "registerRoutesAndControllers",
  );
}
