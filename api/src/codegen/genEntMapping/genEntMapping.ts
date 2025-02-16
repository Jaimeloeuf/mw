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

  const generatedCode = `import { ents } from "./entsBarrelFile${generatedCodeFileExtensionForJsImport}"

/**
 * Mapping of \`EntTypeID\` to \`Ent\`.
 */
export const entMapping = {
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
