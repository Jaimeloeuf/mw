import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getHttpControllerFiles } from "../../utils/index.js";
import { routeDefinitionTemplate } from "./routeDefinitionTemplate.js";
import { routeTableTemplate } from "./routeTableTemplate.js";

/**
 * Generate the HTTP API ExpressJS routes table file, by looking at all the HTTP
 * controllers in the controllers/ folder.
 */
export class GenHttpRoutesTable implements CogenieStep {
  getFiles() {
    return {
      registerRoutesAndControllers: {
        name: "registerRoutesAndControllers",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const controllerFiles = await getHttpControllerFiles();

    // Generate route definition statements, and combine them into a single string
    const routeDefinitions = controllerFiles
      .map((file) => routeDefinitionTemplate(file))
      .join("");

    const generatedCode = routeTableTemplate(routeDefinitions);

    await codegenForTs.genAndSaveGeneratedCode(
      GenHttpRoutesTable,
      generatedCode,
      this.getFiles().registerRoutesAndControllers.name,
    );
  }
}
