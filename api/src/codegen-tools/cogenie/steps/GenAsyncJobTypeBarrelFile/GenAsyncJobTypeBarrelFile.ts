import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getAsyncJobTypeFiles } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the Async Job Type definitions
 * in async/jobs/ folder under the `asyncJob` namespace, so that other files
 * can easily access them without having to import them manually/individually.
 *
 * This allows users to do something like
 * `import { asyncJob } from "../__generated/index.js";`
 */
export class GenAsyncJobTypeBarrelFile implements CogenieStep {
  getFiles() {
    return {
      asyncJobTypeExportFile: {
        name: "asyncJobTypeExportFile",
        extension: ".ts",
      },
      asyncJobTypeBarrelFile: {
        name: "asyncJobTypeBarrelFile",
        extension: ".ts",
      },
    } as const;
  }

  async generate() {
    const folderPath = path.join(import.meta.dirname, `../../../../async/jobs`);

    const files = await getAsyncJobTypeFiles();

    const generatedCode = files
      .map(
        (file) =>
          `export { default as ${file.name} } from "../async/jobs/${path.relative(folderPath, file.path.replace(".ts", ".js"))}";\n`,
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenAsyncJobTypeBarrelFile,
      generatedCode,
      this.getFiles().asyncJobTypeExportFile.name,

      // Do not re-export this in the barrel file, as we want users to access all
      // the infra modules via the `infra` symbol as defined below.
      { doNotIncludeInGeneratedFolderBarrelFile: true },
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenAsyncJobTypeBarrelFile,
      `export * as asyncJob from "./${this.getFiles().asyncJobTypeExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      this.getFiles().asyncJobTypeBarrelFile.name,
    );
  }
}
