import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionForJsImport,
} from "../codegenForTs/index.js";
import { getEntFolders } from "../utils/index.js";

/**
 * Generate a mapping of `EntTypeID` to `Ent`
 */
export async function genEntMapping() {
  const ents = await getEntFolders();

  const generatedCode = `import type { BaseEnt } from "../ent/BaseEnt.js";
import type { EntCrudOperator } from "../ent/EntCrudOperator.js";

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

/**
 * Mapping of \`EntTypeID\` to \`EntOperators\`.
 */
export const entOperatorsMapping: Record<
  string,
  EntCrudOperator<BaseEnt>
> = {
  ${ents.map((ent) => `"${ent.entTypeID}": ents.${ent.name}Operators`).join()}
};
`;

  const entMappingExportFileName = "entMapping";

  await genAndSaveGeneratedCode(
    genEntMapping,
    generatedCode,
    entMappingExportFileName,
  );
}
