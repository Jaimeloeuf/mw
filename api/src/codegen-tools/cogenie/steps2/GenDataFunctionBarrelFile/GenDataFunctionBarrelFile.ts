import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";
import type { DataFunctionFile } from "../../utils/index.js";

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
        extension: ".ts",
      },
      dataFunctionsBarrelFile: {
        name: "dataFunctionsBarrelFile",
        extension: ".ts",
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
      .map((file) =>
        this.dataFunctionExportTemplate(file, dataFunctionsFolderPath),
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenDataFunctionBarrelFile,
      generatedCode,
      this.getFiles().dataFunctionsExportFile.name,

      // Do not re-export this in the barrel file, as we want users to access all
      // the data functions via the `df` symbol as defined below.
      { doNotIncludeInGeneratedFolderBarrelFile: true },
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenDataFunctionBarrelFile,
      `export * as df from "./${this.getFiles().dataFunctionsExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
      this.getFiles().dataFunctionsBarrelFile.name,
    );
  }

  dataFunctionExportTemplate = (
    file: DataFunctionFile,
    dalFolderPath: string,
  ): string =>
    `export { default as ${file.name} } from "../dal/df/${path.relative(dalFolderPath, file.path.replace(".ts", ".js"))}";
`;
}
