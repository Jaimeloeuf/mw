import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getEntFolders } from "../../utils/index.js";

/**
 * Generate a single barrel file to re-export all the EntOperators in the ent/
 * folder under the `entOperator` namespace, so that other files that uses
 * EntOperators outside of ent/ can easily access them without having to import
 * them manually/individually.
 *
 * This allows users to do something like
 * `import { entOperator } from "../__generated/index.js";`
 */
export class GenEntOperatorBarrelFile implements CogenieStep {
  getFiles() {
    return {
      entOperatorsExportFile: {
        name: "entOperatorsExportFile",
        extension: ".ts",
      },
    } as const;
  }

  async generate() {
    const entFolders = await getEntFolders();

    const generatedCode = entFolders
      .map(
        (
          folder,
        ) => `export * from "../ents/${folder.name}/${folder.name}Operators.js";
`,
      )
      .join("");

    await codegenForTs.genAndSaveGeneratedCode(
      GenEntOperatorBarrelFile,
      generatedCode,
      this.getFiles().entOperatorsExportFile.name,

      // Do not re-export this in the barrel file, as we want users to access all
      // the Ents via the `ents` symbol as defined below.
      { doNotIncludeInGeneratedFolderBarrelFile: true },
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenEntOperatorBarrelFile,
      `export * as entOperators from "./${this.getFiles().entOperatorsExportFile.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
      "entOperatorsBarrelFile",
    );
  }
}
