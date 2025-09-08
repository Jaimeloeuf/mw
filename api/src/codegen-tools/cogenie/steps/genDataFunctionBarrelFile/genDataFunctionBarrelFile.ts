import path from "path";

import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport,
} from "../../../../codegen-lib/codegenForTs/index.js";
import { getDataFunctionFiles } from "../../utils/index.js";
import { dataFunctionExportTemplate } from "./dataFunctionExportTemplate.js";

/**
 * Generate a single barrel file to re-export all the DAL data functions in the
 * dal/ folder under the `df` namespace, so that other files that uses data
 * functions outside of dal/ folder can easily access them without having to
 * import them manually/individually.
 *
 * This allows users to do something like `import { df } from "../__generated/index.js";`
 */
export async function genDataFunctionBarrelFile() {
  const dataFunctionsFolderPath = path.join(
    import.meta.dirname,
    `../../../../dal/df`,
  );

  const files = await getDataFunctionFiles();

  const generatedCode = files
    .map((file) => dataFunctionExportTemplate(file, dataFunctionsFolderPath))
    .join("");

  const dataFunctionsExportFileName = "dataFunctionsExportFile";

  await genAndSaveGeneratedCode(
    genDataFunctionBarrelFile,
    generatedCode,
    dataFunctionsExportFileName,

    // Do not re-export this in the barrel file, as we want users to access all
    // the data functions via the `df` symbol as defined below.
    { doNotIncludeInGeneratedFolderBarrelFile: true },
  );

  await genAndSaveGeneratedCode(
    genDataFunctionBarrelFile,
    `export * as df from "./${dataFunctionsExportFileName}${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
    "dataFunctionsBarrelFile",
  );
}
