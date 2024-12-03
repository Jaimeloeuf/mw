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
   * Optional `Zod` Validator to validate job arguments.
   */
  argumentValidator?: AsyncJobArgumentType extends void
    ? void
    : ZodType<Exclude<AsyncJobArgumentType, void>>;

  /**
   * The actual job function definition.
   */
  run(argument: AsyncJobArgumentType): AsyncJobResult | Promise<AsyncJobResult>;
};
