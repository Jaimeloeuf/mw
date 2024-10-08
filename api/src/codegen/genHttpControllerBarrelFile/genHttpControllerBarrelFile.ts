import path from "path";
import { genAndSaveGeneratedCode } from "../codegenForTs/index.js";
import { getControllerFiles } from "../utils/getControllerFiles/getControllerFiles.js";
import { controllerExportTemplate } from "./controllerExportTemplate.js";

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
    `../../controllers`,
  );

  const controllerFiles = await getControllerFiles();

  const generatedCode = controllerFiles
    .map((file) => controllerExportTemplate(file, controllerFolderPath))
    .join("");

  await genAndSaveGeneratedCode(
    genHttpControllerBarrelFile,
    generatedCode,
    "httpControllerBarrelFile",
  );
}
