import type { AsyncJob } from "./AsyncJob.js";
import type { AsyncJobType } from "./AsyncJobType.js";
import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

import { df } from "../../__generated/index.js";
import { InvalidInternalStateException } from "../../exceptions/index.js";
import { logger } from "../../logging/index.js";
import { getStackTrace } from "../../utils/index.js";
import { AsyncJobStatus } from "./AsyncJobStatus.js";

/**
 * Function to define an `AsyncJobType` object and creating the `scheduleJob`
 * method.
 */
export function defineAsyncJobType<T>(
  asyncJobConfig: AsyncJobTypeConfig<T>,
): AsyncJobType<T> {
  return {
    ...asyncJobConfig,

    /**
     * ## DO NOT OVERRIDE!
     * Use this to schedule a new Job of this Job Type.
     */
    async scheduleJob(runOptions) {
      const serialisedJobArgumentsOrNull =
        validateJobArgumentsAndJsonSerialiseIt(
          asyncJobConfig,
          runOptions?.jobArguments,
        );

      const asyncJob: AsyncJob = {
        id: crypto.randomUUID(),
        jobTypeID: asyncJobConfig.id,
        status: AsyncJobStatus.queued,
        timeScheduled: new Date().toISOString(),
        timeStart: null,
        timeFinish: null,
        jobResult: null,
        jobArguments: serialisedJobArgumentsOrNull,
        priority: runOptions?.priorityOverride ?? asyncJobConfig.priority,
        machineType:
          runOptions?.machineTypeOverride ?? asyncJobConfig.machineType,

        // Defaults to 1 hour timeout if it is not set
        timeout: runOptions?.timeoutOverride ?? asyncJobConfig.timeout ?? 3600,

        // Defaults to <unspecified>, and users have to look at stackTrace
        caller: runOptions?.caller ?? "<unspecified>",

        // Drop 2 stack frames, 1 for the getStackTrace function and 1 for the
        // current scheduleJob function.
        stackTrace: getStackTrace(2),
      };

      await df.asyncCreateJob.runAndThrowOnError(asyncJob);

      logger.verbose(
        `${asyncJob.caller}:${this.scheduleJob.name}`,
        `Successfully scheduled async job '${asyncJobConfig.name}'`,
      );
    },
  };
}

/**
 * Validate Job arguments using the zod validator if any, if valid, return the
 * JSON serialised job arguments as a string.
 *
 * If arguments is invalid, or fails to be serialised with JSON.stringify, an
 * error will be thrown.
 *
 * If there is no argumentValidator given, assume that the job does not take any
 * arguments and returns null instead.
 */
function validateJobArgumentsAndJsonSerialiseIt<T>(
  asyncJobConfig: AsyncJobTypeConfig<T>,
  jobArguments?: unknown,
) {
  if (asyncJobConfig.argumentValidator === undefined) {
    return null;
  }

  const { success, data, error } =
    asyncJobConfig.argumentValidator.safeParse(jobArguments);

  if (!success) {
    throw new InvalidInternalStateException(
      `Invalid Async Job arguments for '${asyncJobConfig.name}' ` +
        error.toString(),
    );
  }

  return data;
}
