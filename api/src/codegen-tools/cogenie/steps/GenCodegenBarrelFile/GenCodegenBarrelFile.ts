import type { CogenieStep } from "../../CogenieStep.js";

/**
 * THIS IS NOT A NORMAL COGENIE STEP!!!
 *
 * This is a complimentary step to the `genCodegenBarrelFile` function that
 * doesnt actually do any generation, but specifies the output files of that
 * function so that we do not delete it as a stale file.
 *
 * The generate function is defined in `genCodegenBarrelFile` since it requires
 * all other steps to be done before running.
 */
export class GenCodegenBarrelFile implements CogenieStep {
  getFiles() {
    return {
      codegenBarrelFile: {
        name: "index",
        extension: ".ts",
      },
    } as const;
  }

  // Do nothing since it is implemented in `genCodegenBarrelFile`
  async generate() {}
}
