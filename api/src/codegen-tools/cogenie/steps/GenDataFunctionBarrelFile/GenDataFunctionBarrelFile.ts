import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getDataFunctionFiles } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the DAL data functions in the
 * dal/ folder under the `df` namespace, so that other files that uses data
 * functions outside of dal/ folder can easily access them without having to
 * import them manually/individually.
 *
 * This allows users to do something like `import { df } from "../__generated/index.js";`
 */
export class GenDataFunctionBarrelFile implements CogenieStep {
  getFiles() {
    return {
      dataFunctionsExportFile: {
        name: "dataFunctionsExportFile",
        extension:
          codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
      },
      dataFunctionsBarrelFile: {
        name: "dataFunctionsBarrelFile",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const dataFunctionsFolderPath = path.join(
      import.meta.dirname,
      `../../../../dal/df`,
    );

    const files = await getDataFunctionFiles();

    const generatedCode = files
      .map(
        (file) =>
          `export { default as ${file.name} } from "../dal/df/${path.relative(dataFunctionsFolderPath, file.path.replace(".ts", ".js"))}";\n`,
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenDataFunctionBarrelFile,
      generatedCode,
      this.getFiles().dataFunctionsExportFile,
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenDataFunctionBarrelFile,
      `export * as df from "./${this.getFiles().dataFunctionsExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      this.getFiles().dataFunctionsBarrelFile,
    );
  }
}
