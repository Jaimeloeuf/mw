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
export async function genEntBarrelFile() {
  const entFolders = await getEntFolders();

  const generatedCode = entFolders
    .map(
      (folder) => `export * from "../ents/${folder.name}/${folder.name}.js";
`,
    )
    .join("");

  const entsExportFileName = "entsExportFile";

  await codegenForTs.genAndSaveGeneratedCode(
    genEntBarrelFile,
    generatedCode,
    entsExportFileName,

    // Do not re-export this in the barrel file, as we want users to access all
    // the Ents via the `ents` symbol as defined below.
    { doNotIncludeInGeneratedFolderBarrelFile: true },
  );

  await codegenForTs.genAndSaveGeneratedCode(
    genEntBarrelFile,
    `export * as ents from "./${entsExportFileName}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
    "entsBarrelFile",
  );
}
