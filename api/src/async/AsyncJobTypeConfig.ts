import type { ZodType } from "zod";

import type { AsyncJobMachineType } from "./AsyncJobMachineType.js";
import type { AsyncJobPriority } from "./AsyncJobPriority.js";
import type { AsyncJobResult } from "./AsyncJobResult.js";

/**
 * Config object for an Async Job Type.
 */
export type AsyncJobTypeConfig<
  /**
   * Generic type for the Job function's argument.
   */
  AsyncJobArgumentType = void,
> = {
  /**
   * Unique ID for this Job Type.
   *
   * ## Why do we need an ID?
   * Because a Job Type name can change over time but all previous async Jobs
   * should still point back to the same Job Type.
   */
  id: string;

  /**
   * Job Type name used to display to users as a human readable string.
   */
  name: string;

  /**
   * Default Machine Type for Jobs of this Job Type.
   */
  machineType: AsyncJobMachineType;

  /**
   * Default Priority level for Jobs of this Job Type.
   */
  priority: AsyncJobPriority;

  /**
   * An optional timeout in seconds for every Job of this Job Type. Once time is
   * up we will try to kill the job, and record that it finished in failure with
   * exceeded timeout as failure reason.
   *
   * This timeout applies for all Jobs of this Job Type, so make sure it can
   * accomodate up to the longest run of a job. You can also override this for
   * a single Job when scheduling it.
   *
   * If none is set, a default timeout of 1 hour will be used.
   *
   * Set this to `null` if you explicitly do not want it to ever timeout, use
   * carefully as this could run into an infinite loop and hog the server.
   */
  timeout?: $Nullable<number>;

  /**
   * Optional `Zod` Validator to validate job arguments.
   */
  argumentValidator?: AsyncJobArgumentType extends void
    ? void
    : ZodType<Exclude<AsyncJobArgumentType, void>>;

  /**
   * The actual job function definition.
   *
   * Prefer to return an `AsyncJobResult` regardless of success or failure.
   * However even if your `run` method throws, it will be caught and the
   * `AsyncJobResult` will be set for you where the description will be the
   * error message.
   */
  run(
    argument: AsyncJobArgumentType extends void ? null : AsyncJobArgumentType,
  ): AsyncJobResult | Promise<AsyncJobResult>;
};
