import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getInfraFiles } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the infra modules in the
 * infra/ folder under the `infra` namespace, so that other files that uses
 * infra modules outside of infra/ folder can easily access them without
 * having to import them manually/individually.
 *
 * This allows users to do something like
 * `import { infra } from "../__generated/index.js";`
 */
export class GenInfraBarrelFile implements CogenieStep {
  getFiles() {
    return {
      infraExportFile: {
        name: "infraExportFile",
        extension:
          codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
      },
      infraBarrelFile: {
        name: "infraBarrelFile",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const folderPath = path.join(import.meta.dirname, `../../../../infra`);

    const files = await getInfraFiles();

    const generatedCode = files
      .map(
        (file) =>
          `export { default as ${file.name} } from "../infra/${path.relative(folderPath, file.path.replace(".ts", ".js"))}";\n`,
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenInfraBarrelFile,
      generatedCode,
      this.getFiles().infraExportFile,
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenInfraBarrelFile,
      `export * as infra from "./${this.getFiles().infraExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      this.getFiles().infraBarrelFile,
    );
  }
}
