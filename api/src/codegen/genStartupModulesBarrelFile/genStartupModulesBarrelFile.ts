import path from "path";

import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport,
} from "../../codegen-lib/codegenForTs/index.js";
import { getStartupFiles } from "../utils/index.js";
import { startupModuleExportTemplate } from "./startupModuleExportTemplate.js";

/**
 * Generate a single barrel file to re-export all the startup functions in the
 * startup/ folder under the `st` namespace, so that other files that uses
 * startup functions outside of startup/ folder can easily access them without
 * having to import them manually/individually.
 *
 * This allows users to do something like `import { st } from "../__generated/index.js";`
 */
export async function genStartupModulesBarrelFile() {
  const folderPath = path.join(import.meta.dirname, `../../startup`);

  const files = await getStartupFiles();

  const generatedCode = files
    .map((file) => startupModuleExportTemplate(file, folderPath))
    .join("");

  const startupModulesExportFileName = "startupModulesExportFile";

  await genAndSaveGeneratedCode(
    genStartupModulesBarrelFile,
    generatedCode,
    startupModulesExportFileName,

    // Do not re-export this in the barrel file, as we want users to access all
    // the service functions via the `st` symbol as defined below.
    { doNotIncludeInGeneratedFolderBarrelFile: true },
  );

  await genAndSaveGeneratedCode(
    genStartupModulesBarrelFile,
    `export * as st from "./${startupModulesExportFileName}${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
    "startupModulesBarrelFile",
  );
}
