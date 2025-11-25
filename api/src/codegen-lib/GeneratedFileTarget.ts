import type { generatedDocFileExtension } from "./codegenForDoc/index.js";
import type {
  generatedCodeFileExtension,
  generatedCodeFileExtensionWithNoBarrelFileInclusion,
} from "./codegenForTs/index.js";

/**
 * Details of the generated file
 */
export type GeneratedFileTarget = {
  name: string;
  extension:
    | typeof generatedCodeFileExtension
    | typeof generatedCodeFileExtensionWithNoBarrelFileInclusion
    | typeof generatedDocFileExtension;
};
