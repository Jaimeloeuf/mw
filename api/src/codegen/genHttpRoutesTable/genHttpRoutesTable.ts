import { genAndSaveGeneratedCode } from "../codegenForTs/index.js";
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

  await genAndSaveGeneratedCode(
    genHttpRoutesTable,
    generatedCode,
    "registerRoutesAndControllers",
  );
}
