import path from "path";

import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport,
} from "../../../../codegen-lib/codegenForTs/index.js";
import { getInfraFiles } from "../../utils/index.js";
import { infraExportTemplate } from "./infraExportTemplate.js";

/**
 * Generate a single barrel file to re-export all the infra modules in the
 * infra/ folder under the `infra` namespace, so that other files that uses
 * infra modules outside of infra/ folder can easily access them without
 * having to import them manually/individually.
 *
 * This allows users to do something like
 * `import { infra } from "../__generated/index.js";`
 */
export async function genInfraBarrelFile() {
  const folderPath = path.join(import.meta.dirname, `../../../../infra`);

  const files = await getInfraFiles();

  const generatedCode = files
    .map((file) => infraExportTemplate(file, folderPath))
    .join("");

  const infraExportFileName = "infraExportFile";

  await genAndSaveGeneratedCode(
    genInfraBarrelFile,
    generatedCode,
    infraExportFileName,

    // Do not re-export this in the barrel file, as we want users to access all
    // the infra modules via the `infra` symbol as defined below.
    { doNotIncludeInGeneratedFolderBarrelFile: true },
  );

  await genAndSaveGeneratedCode(
    genInfraBarrelFile,
    `export * as infra from "./${infraExportFileName}${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
    "infraBarrelFile",
  );
}
