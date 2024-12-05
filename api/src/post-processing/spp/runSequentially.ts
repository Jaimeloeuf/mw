import type { WrappedFunction } from "./WrappedFunction.js";

import { logger } from "../../logging/index.js";

/**
 * Run SimplePostProcessing wrapped functions sequentially by awaiting for each
 * to complete before running the next function.
 */
export async function runSequentially(
  logHeader: string,
  fns: Array<WrappedFunction>,
  continueOnFailure: boolean,
) {
  let successfulExecutions = 0;
  let failedExecutions = 0;

  for (const fn of fns) {
    const ranSuccessfully = await fn();

    ranSuccessfully ? successfulExecutions++ : failedExecutions++;

    if (!ranSuccessfully) {
      if (continueOnFailure) {
        logger.info(
          logHeader,
          `Sequential execution continuing because it is configured to continue on failure`,
        );

        continue;
      } else {
        logger.info(
          logHeader,
          `Sequential execution stopped because it is configured to stop on failure`,
        );

        break;
      }
    }
  }

  logger.info(
    logHeader,
    `Processed ${fns.length} jobs sequentially. ${successfulExecutions} succeeded and ${failedExecutions} failed.`,
  );
}
