import type { ZodType } from "zod";

import type { AsyncJob } from "./AsyncJob.js";
import type { AsyncJobType } from "./AsyncJobType.js";
import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

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
          asyncJobConfig.argumentValidator,
          runOptions?.jobArguments,
        );

      const data: AsyncJob = {
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

      data;
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
function validateJobArgumentsAndJsonSerialiseIt(
  argumentValidator?: ZodType<any> | void,
  jobArguments?: unknown,
) {
  if (argumentValidator === undefined) {
    return null;
  }

  const { success, data, error } = argumentValidator.safeParse(jobArguments);

  if (!success) {
    throw new Error(error.toString());
  }

  let jsonStringifyResult;

  try {
    jsonStringifyResult = JSON.stringify(data);
  } catch (error) {
    throw new Error("Failed to JSON.stringify Async Job arguments");
  }

  return jsonStringifyResult;
}
