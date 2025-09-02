import { printGitStatus } from "../../utils/printGitStatus.js";
import { generatedDocDirPathString } from "../codegenForDoc/index.js";
import { generatedSrcDirPathString } from "../codegenForTs/index.js";

export async function showGitStatusOfGeneratedFolder() {
  printGitStatus(generatedSrcDirPathString);

  // Use glob pattern to specify only generated docs
  printGitStatus(`${generatedDocDirPathString}/**.generated.md`);
}
