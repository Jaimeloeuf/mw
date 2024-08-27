import { logger } from "../logging/index.js";
import type { WrappedFunction } from "./WrappedFunction.js";

/**
 * Run SimplePostProcessing wrapped functions in parallel and awaiting for all
 * of it together.
 */
export async function runInParallel(
  logHeader: string,
  fns: Array<WrappedFunction>,
) {
  const executionResults = await Promise.all(fns.map((fn) => fn()));

  const successfulExecutions = executionResults.filter(
    (ranSuccessfully) => ranSuccessfully,
  ).length;

  const failedExecutions = executionResults.length - successfulExecutions;

  logger.info(
    logHeader,
    `Processed ${executionResults.length} jobs in parallel. ${successfulExecutions} succeeded and ${failedExecutions} failed.`,
  );
}
