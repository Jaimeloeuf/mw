import type { AsyncJob } from "./AsyncJob.js";
import type { AsyncJobType } from "./AsyncJobType.js";
import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

import { df } from "../__generated/index.js";
import { logger } from "../logging/index.js";
import { getStackTrace } from "../utils/index.js";
import { AsyncJobStatus } from "./AsyncJobStatus.js";
import { validateJobArgumentOnSave } from "./validateJobArgumentOnSave.js";

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
      const validatedJobArgument = validateJobArgumentOnSave(
        asyncJobConfig,
        runOptions?.jobArguments,
      );

      const asyncJob: AsyncJob = {
        id: crypto.randomUUID(),
        jobTypeID: asyncJobConfig.id,
        status: AsyncJobStatus.queued,
        timeScheduled: new Date().toISOString(),
        timePreprocess: null,
        timeStart: null,
        timeFinish: null,
        jobResult: null,
        jobArguments: validatedJobArgument,

        timeStartAfter: runOptions?.startAfter ?? null,
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
