import type { codegenForTs, codegenForDoc } from "../../codegen-lib/index.js";

/**
 * Details of the generated file
 */
export type GeneratedFileTarget = {
  name: string;
  extension:
    | typeof codegenForTs.generatedCodeFileExtension
    | typeof codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion
    | typeof codegenForDoc.generatedDocFileExtension;
};
