import path from "path";

import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport,
} from "../../../codegen-lib/codegenForTs/index.js";
import { getServiceFiles } from "../utils/index.js";
import { serviceExportTemplate } from "./serviceExportTemplate.js";

/**
 * Generate a single barrel file to re-export all the service functions in the
 * services/ folder under the `sv` namespace, so that other files that uses
 * service functions outside of services/ folder can easily access them without
 * having to import them manually/individually.
 *
 * This allows users to do something like `import { sv } from "../__generated/index.js";`
 */
export async function genServiceBarrelFile() {
  const folderPath = path.join(import.meta.dirname, `../../../services`);

  const files = await getServiceFiles();

  const generatedCode = files
    .map((file) => serviceExportTemplate(file, folderPath))
    .join("");

  const serviceExportFileName = "serviceExportFile";

  await genAndSaveGeneratedCode(
    genServiceBarrelFile,
    generatedCode,
    serviceExportFileName,

    // Do not re-export this in the barrel file, as we want users to access all
    // the service functions via the `sv` symbol as defined below.
    { doNotIncludeInGeneratedFolderBarrelFile: true },
  );

  await genAndSaveGeneratedCode(
    genServiceBarrelFile,
    `export * as sv from "./${serviceExportFileName}${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
    "serviceBarrelFile",
  );
}
