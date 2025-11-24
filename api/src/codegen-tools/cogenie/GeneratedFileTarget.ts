import type { codegenForTs, codegenForDoc } from "../../codegen-lib/index.js";

/**
 * Details of the generated file
 */
export type GeneratedFileTarget = {
  name: string;
  // @todo Delete raw extensions
  extension:
    | ".ts"
    | ".md"
    | typeof codegenForTs.generatedCodeFileExtension
    | typeof codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion
    | typeof codegenForDoc.generatedDocFileExtension;
};
