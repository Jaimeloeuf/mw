import { SimplePostProcessing } from "./SimplePostProcessing.js";

/**
 * Builder class to let callers use builder method to configure how to use
 * `SimplePostProcessing` before creating the actual instance.
 */
export class SimplePostProcessingBuilder {
  constructor(private callerName: string) {}

  /**
   * All jobs will be ran and awaited together instead of waiting for each job
   * to finish before running the next one.
   */
  runJobsInParallel() {
    return new SimplePostProcessing(this.callerName, "parallelly");
  }

  /**
   * Jobs will be ran in the order they are added and each job will only run
   * after the previous job finishes.
   */
  runJobsSequentially() {
    const callerName = this.callerName;

    // Return another object to implement a builder pattern to configure options
    // specific for sequential executions.
    return {
      /**
       * Continue to execute all other jobs if a job failed.
       */
      continueOnFailure() {
        return new SimplePostProcessing(callerName, "sequentially", true);
      },

      /**
       * Stop executing all queued jobs if any job failed.
       */
      stopIfOneFails() {
        return new SimplePostProcessing(callerName, "sequentially", false);
      },
    };
  }
}