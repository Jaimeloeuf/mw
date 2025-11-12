import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getServiceFiles } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the service functions in the
 * services/ folder under the `sv` namespace, so that other files that uses
 * service functions outside of services/ folder can easily access them without
 * having to import them manually/individually.
 *
 * This allows users to do something like `import { sv } from "../__generated/index.js";`
 */
export class GenServiceBarrelFile implements CogenieStep {
  getFiles() {
    return {
      serviceExportFile: {
        name: "serviceExportFile",
        extension: ".ts",
      },
    } as const;
  }

  async generate() {
    const folderPath = path.join(import.meta.dirname, `../../../../services`);

    const files = await getServiceFiles();

    const generatedCode = files
      .map(
        (file) =>
          `export { default as ${file.name} } from "../services/${path.relative(folderPath, file.path.replace(".ts", ".js"))}";\n`,
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenServiceBarrelFile,
      generatedCode,
      this.getFiles().serviceExportFile.name,

      // Do not re-export this in the barrel file, as we want users to access all
      // the service functions via the `sv` symbol as defined below.
      { doNotIncludeInGeneratedFolderBarrelFile: true },
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenServiceBarrelFile,
      `export * as sv from "./${this.getFiles().serviceExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      "serviceBarrelFile",
    );
  }
}
