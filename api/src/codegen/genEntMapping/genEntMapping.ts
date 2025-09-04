import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionForJsImport,
} from "../../codegen-lib/codegenForTs/index.js";
import { getEntFolders } from "../utils/index.js";

/**
 * Generate a mapping of `EntTypeID` to `Ent`
 */
export async function genEntMapping() {
  const ents = await getEntFolders();

  const generatedCode = `import type { BaseEnt } from "../ent/BaseEnt.js";

import { ents } from "./entsBarrelFile${generatedCodeFileExtensionForJsImport}"

/**
 * Mapping of \`EntTypeID\` to \`Ent\`.
 */
export const entMapping: Record<
  string,
  new (..._constructorArgs: any) => BaseEnt<any>
> = {
  ${ents.map((ent) => `"${ent.entTypeID}": ents.${ent.name}`).join()}
};
`;

  const entMappingExportFileName = "entMapping";

  await genAndSaveGeneratedCode(
    genEntMapping,
    generatedCode,
    entMappingExportFileName,
  );
}
