import { generatedDocDirPathString } from "../../../codegen-lib/codegenForDoc/index.js";
import { generatedSrcDirPathString } from "../../../codegen-lib/codegenForTs/index.js";
import { printGitStatus } from "../../../utils/printGitStatus.js";

export async function showGitStatusOfGeneratedFolder() {
  await printGitStatus(generatedSrcDirPathString);

  // Use glob pattern to specify only generated docs
  await printGitStatus(`${generatedDocDirPathString}/**.generated.md`);
}
