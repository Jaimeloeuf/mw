import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";
import type { StartupFile } from "../../utils/index.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getStartupFiles } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the startup functions in the
 * startup/ folder under the `st` namespace, so that other files that uses
 * startup functions outside of startup/ folder can easily access them without
 * having to import them manually/individually.
 *
 * This allows users to do something like `import { st } from "../__generated/index.js";`
 */
export class GenStartupModulesBarrelFile implements CogenieStep {
  getFiles() {
    return {
      startupModulesExportFile: {
        name: "startupModulesExportFile",
        extension: ".ts",
      },
      startupModulesBarrelFile: {
        name: "startupModulesBarrelFile",
        extension: ".ts",
      },
    } as const;
  }

  async generate() {
    const folderPath = path.join(import.meta.dirname, `../../../../startup`);

    const files = await getStartupFiles();

    const generatedCode = files
      .map((file) => this.startupModuleExportTemplate(file, folderPath))
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenStartupModulesBarrelFile,
      generatedCode,
      this.getFiles().startupModulesExportFile.name,

      // Do not re-export this in the barrel file, as we want users to access all
      // the service functions via the `st` symbol as defined below.
      { doNotIncludeInGeneratedFolderBarrelFile: true },
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenStartupModulesBarrelFile,
      `export * as st from "./${this.getFiles().startupModulesExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
      this.getFiles().startupModulesBarrelFile.name,
    );
  }

  startupModuleExportTemplate = (
    file: StartupFile,
    folderPath: string,
  ): string =>
    `export { default as ${file.name} } from "../startup/${path.relative(folderPath, file.path.replace(".ts", ".js"))}";
`;
}
