import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getEntFolders } from "../../utils/index.js";
import { GenEntBarrelFile } from "../GenEntBarrelFile/GenEntBarrelFile.js";

/**
 * Generate a mapping of `EntTypeID` to `Ent`
 */
export class GenEntMapping implements CogenieStep {
  getFiles() {
    return {
      entMappingExportFile: {
        name: "entMapping",
        extension: ".ts",
      },
    } as const;
  }

  async generate() {
    const ents = await getEntFolders();

    const generatedCode = `import type { BaseEnt } from "../ent/BaseEnt.js";

import { ents } from "./${new GenEntBarrelFile().getFiles().entsBarrelFile.name}${codegenForTs.generatedCodeFileExtensionForJsImport}";

/**
 * Mapping of \`EntTypeID\` to \`Ent\`.
 */
export const entMapping: Record<
  string,
  new (..._constructorArgs: any) => BaseEnt<any>
> = {
  ${ents.map((ent) => `"${ent.entTypeID}": ents.${ent.name}`).join(",\n  ")}
};
`;

    await codegenForTs.genAndSaveGeneratedCode(
      GenEntMapping,
      generatedCode,
      this.getFiles().entMappingExportFile.name,
    );
  }
}
