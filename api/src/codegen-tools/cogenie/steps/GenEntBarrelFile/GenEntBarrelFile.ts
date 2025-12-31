import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getEntFolders } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the Ents in the ent/ folder
 * under the `ent` namespace, so that other files that uses Ents outside of ent/
 * can easily access them without having to import them manually/individually.
 *
 * This allows users to do something like
 * `import { ent } from "../__generated/index.js";`
 */
export class GenEntBarrelFile implements CogenieStep {
  getFiles() {
    return {
      entsExportFile: {
        name: "entsExportFile",
        extension:
          codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
      },
      entsBarrelFile: {
        name: "entsBarrelFile",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const entFolders = await getEntFolders();

    const generatedCode = entFolders
      .map(
        (folder) =>
          `export * from "../../ents/${folder.name}/${folder.name}.js";\n`,
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenEntBarrelFile,
      generatedCode,
      this.getFiles().entsExportFile,
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenEntBarrelFile,
      `export * as ents from "./${this.getFiles().entsExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      this.getFiles().entsBarrelFile,
    );
  }
}
