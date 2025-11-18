import { codegenForDoc, codegenForTs } from "../../codegen-lib/index.js";
import { printGitStatus } from "../../utils/printGitStatus.js";

/**
 * Show git status of generated files in generated file folders.
 */
export async function showGitStatusOfGeneratedFiles() {
  await printGitStatus(codegenForTs.generatedSrcDirPathString);

  // Use glob pattern to specify only generated docs
  await printGitStatus(
    `${codegenForDoc.generatedDocDirPathString}/**.generated.md`,
  );
}
