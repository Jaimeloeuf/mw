import type { AsyncJob } from "./AsyncJob.js";
import type { AsyncJobMachineType } from "./AsyncJobMachineType.js";
import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

/**
 * An object type to describe an Async Job Type, alongside a `scheduleJob`
 * method for users to schedule a Job of that Job Type.
 */
export type AsyncJobType<T = any> = AsyncJobTypeConfig<T> & {
  scheduleJob: (runOptions?: {
    /**
     * A simple string name to identify the caller that scheduled this job. If
     * not set, it will default to the `<unspecified>` caller.
     */
    caller?: AsyncJob["caller"];

    /**
     * Arguments for this Job.
     */
    jobArguments: T;

    /**
     * Set a ISO DateTime string, so that the async job will only run AFTER this
     * date and never before it.
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
  }) => Promise<void>;
};
