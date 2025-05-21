import type { AsyncJob } from "./AsyncJob.js";
import type { AsyncJobMachineType } from "./AsyncJobMachine.js";
import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

/**
 * An object type to describe an Async Job Type, alongside a `scheduleJob`
 * method for users to schedule a Job of that Job Type.
 */
export type AsyncJobType<AsyncJobArgumentType = void> =
  AsyncJobTypeConfig<AsyncJobArgumentType> & {
    /**
     * Schedule a new Job of this Job Type.
     */
    scheduleJob: (runOptions?: {
      /**
       * A simple string name to identify the caller that scheduled this job. If
       * not set, it will default to the `<unspecified>` caller.
       */
      caller?: AsyncJob["caller"];

      /**
       * Arguments for this Job.
       */
      jobArguments: AsyncJobArgumentType extends void
        ? void
        : AsyncJobArgumentType;

      /**
       * Async job will only run AFTER this and never before it.
       */
      startAfter?: AsyncJob["timeStartAfter"];

      /**
       * Override the Async Job Type's default priority level.
       */
      priorityOverride?: AsyncJobTypeConfig["priority"];

      /**
       * Override the Async Job Type's default timeout.
       */
      timeoutOverride?: AsyncJobTypeConfig["timeout"];

      /**
       * Override the Async Job Type's default machine type.
       */
      machineTypeOverride?: AsyncJobMachineType;
    }) => Promise<string>;

    /**
     * Try to cancel a Job of this Job Type using the `asyncJobID` returned from
     * `scheduleJob` method. A job can only be cancelled if its status is still
     * `AsyncJobStatus.queued`, once the job has began pre-processing, it can
     * not be cancelled anymore.
     *
     * The `cancellationContext` is only stored as `AsyncJob['cancellationData']`
     * if the job is cancelled, else this is discarded.
     */
    cancelJob: (
      jobID: string,

      /**
       * Optionally, pass in anything that is JSON stringifiable for additional
       * context on why the job is cancelled, which can be helpful for debugging
       * purposes.
       */
      cancellationContext?: NonNullable<
        AsyncJob["cancellationData"]
      >["cancellationContext"],
    ) => Promise<{
      cancelled: boolean;
      job: AsyncJob;
    }>;
  };
