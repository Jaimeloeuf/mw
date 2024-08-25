import { logger } from "../logging/Logger.js";
import { promisify } from "util";
import { exec } from "child_process";

const asyncExec = promisify(exec);

export async function showGitStatusOfGeneratedFolder() {
  // The pwd will always be /api/ because it is ran from the same location as
  // package.json that defines the npm run script.
  const { stdout } = await asyncExec("git status ./src/__generated");

  // Add some new lines before printing
  // eslint-disable-next-line no-console
  console.log();

  // Log it without any logger formatting
  // eslint-disable-next-line no-console
  console.log("These are the git changes in /api/src/__generated/");

  // Skip logger to print without any changes/formatting to the original message
  process.stdout.write(stdout);
}
