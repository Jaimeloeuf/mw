import { printGitStatus } from "../../utils/printGitStatus.js";
import { generatedSrcDirPathString } from "./generatedSrcDirPath.js";

export async function printGitStatusOfGeneratedFolder() {
  await printGitStatus(generatedSrcDirPathString);
}
