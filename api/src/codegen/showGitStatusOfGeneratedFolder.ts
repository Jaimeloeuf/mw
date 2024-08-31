import { promisify } from "util";
import { exec } from "child_process";
import { generatedSrcDirPathString } from "./codegenForTs/index.js";
import { generatedDocDirPathString } from "./codegenForDoc/index.js";

const asyncExec = promisify(exec);

async function showGitStatus(path: string) {
  // The pwd will always be /api/ because it is ran from the same location as
  // package.json that defines the npm run script.
  const { stdout } = await asyncExec(`git status ${path}`);

  // Add some new lines before printing
  // eslint-disable-next-line no-console
  console.log();

  // Log it without any logger formatting
  // eslint-disable-next-line no-console
  console.log(`git changes in: ${path}`);

  // Skip logger to print without any changes/formatting to the original message
  process.stdout.write(stdout);
}

export async function showGitStatusOfGeneratedFolder() {
  showGitStatus(generatedSrcDirPathString);

  // Use glob pattern to specify only generated docs
  showGitStatus(`${generatedDocDirPathString}/**.generated.md`);
}
