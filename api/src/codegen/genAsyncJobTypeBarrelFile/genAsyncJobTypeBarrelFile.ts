import path from "path";

import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport,
} from "../../codegen-lib/codegenForTs/index.js";
import { getAsyncJobTypeFiles } from "../utils/index.js";
import { asyncJobTypeExportTemplate } from "./asyncJobTypeExportTemplate.js";

/**
 * Generate a single barrel file to re-export all the Async Job Type definitions
 * in async/jobs/ folder under the `asyncJob` namespace, so that other files
 * can easily access them without having to import them manually/individually.
 *
 * This allows users to do something like
 * `import { asyncJob } from "../__generated/index.js";`
 */
export async function genAsyncJobTypeBarrelFile() {
  const folderPath = path.join(import.meta.dirname, `../../async/jobs`);

  const files = await getAsyncJobTypeFiles();

  const generatedCode = files
    .map((file) => asyncJobTypeExportTemplate(file, folderPath))
    .join("");

  const asyncJobTypeExportFileName = "asyncJobTypeExportFile";

  await genAndSaveGeneratedCode(
    genAsyncJobTypeBarrelFile,
    generatedCode,
    asyncJobTypeExportFileName,

    // Do not re-export this in the barrel file, as we want users to access all
    // the infra modules via the `infra` symbol as defined below.
    { doNotIncludeInGeneratedFolderBarrelFile: true },
  );

  await genAndSaveGeneratedCode(
    genAsyncJobTypeBarrelFile,
    `export * as asyncJob from "./${asyncJobTypeExportFileName}${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
    "asyncJobTypeBarrelFile",
  );
}
