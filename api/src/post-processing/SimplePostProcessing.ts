import { SimplePostProcessingRunner } from "./SimplePostProcessingRunner.js";

/**
 * Simple Post Processing allows you to run your job functions in web tier
 * without blocking service function execution.
 *
 * Uses a fluent API to configure the jobs.
 */
export const SimplePostProcessing = (serviceFunctionName: string) => ({
  /**
   * All jobs will be ran and awaited together instead of waiting for each job
   * to finish before running the next one.
   */
  runJobsInParallel() {
    return new SimplePostProcessingRunner(serviceFunctionName, "parallelly");
  },

  /**
   * Jobs will be ran in the order they are added and each job will only run
   * after the previous job finishes.
   */
  runJobsSequentially() {
    // Return another object to implement a builder pattern to configure options
    // specific for sequential executions.
    return {
      /**
       * Continue to execute all other jobs if a job failed.
       */
      continueOnFailure() {
        return new SimplePostProcessingRunner(
          serviceFunctionName,
          "sequentially",
          true,
        );
      },

      /**
       * Stop executing all queued jobs if any job failed.
       */
      stopIfOneFails() {
        return new SimplePostProcessingRunner(
          serviceFunctionName,
          "sequentially",
          false,
        );
      },
    };
  },
});
