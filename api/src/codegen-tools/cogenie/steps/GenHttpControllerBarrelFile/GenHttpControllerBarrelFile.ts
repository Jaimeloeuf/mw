import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getHttpControllerFiles } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the HTTP controllers in the
 * controllers/ folder, so that other files that uses the controllers can easily
 * access it without having to import them manually.
 *
 * This allows users to do something like
 * `import { httpControllers } from "../__generated/index.js";`
 */
export class GenHttpControllerBarrelFile implements CogenieStep {
  getFiles() {
    return {
      httpControllerExportFile: {
        name: "httpControllerExportFile",
        extension:
          codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
      },
      httpControllerBarrelFile: {
        name: "httpControllerBarrelFile",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const controllerFolderPath = path.join(
      import.meta.dirname,
      `../../../../controllers-http`,
    );

    const controllerFiles = await getHttpControllerFiles();

    const generatedCode = controllerFiles
      .map(
        (file) =>
          `export { default as ${file.name} } from "../controllers-http/${path.relative(controllerFolderPath, file.path.replace(".ts", ".js"))}";\n`,
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenHttpControllerBarrelFile,
      generatedCode,
      this.getFiles().httpControllerExportFile,
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenHttpControllerBarrelFile,
      `export * as httpControllers from "./${this.getFiles().httpControllerExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      this.getFiles().httpControllerBarrelFile,
    );
  }
}
