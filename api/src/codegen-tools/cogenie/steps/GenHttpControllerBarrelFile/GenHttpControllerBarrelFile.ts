import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getHttpControllerFiles } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the HTTP controllers in the
 * controllers/ folder, so that other files that uses the controllers can easily
 * access it without having to import them manually.
 *
 * This allows users to do something like `import * as c from "./httpControllerBarrelFile.generated.js";`
 */
export class GenHttpControllerBarrelFile implements CogenieStep {
  getFiles() {
    return {
      httpControllerBarrelFile: {
        name: "httpControllerBarrelFile",
        extension: ".ts",
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
      this.getFiles().httpControllerBarrelFile.name,

      // Do not re-export this in the barrel file, as this file will only be used
      // by other generated files.
      { doNotIncludeInGeneratedFolderBarrelFile: true },
    );
  }
}
