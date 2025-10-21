import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getEntFolders } from "../../utils/index.js";

/**
 * Generate a mapping of `EntTypeID` to `EntOperator`
 */
export async function genEntOperatorMapping() {
  const ents = await getEntFolders();

  const generatedCode = `import type { BaseEnt } from "../ent/BaseEnt.js";
import type { EntCrudOperator } from "../ent/EntCrudOperator.js";

import { entOperators } from "./entOperatorsBarrelFile${codegenForTs.generatedCodeFileExtensionForJsImport}"

/**
 * Mapping of \`EntTypeID\` to \`EntOperators\`.
 */
export const entOperatorsMapping: Record<
  string,
  EntCrudOperator<BaseEnt>
> = {
  ${ents.map((ent) => `"${ent.entTypeID}": entOperators.${ent.name}Operators`).join()}
};
`;

  const entOperatorMappingExportFileName = "entOperatorMapping";

  await codegenForTs.genAndSaveGeneratedCode(
    genEntOperatorMapping,
    generatedCode,
    entOperatorMappingExportFileName,
  );
}
