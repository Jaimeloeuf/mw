/**
 * Status an Async Job.
 */
export enum AsyncJobStatus {
  /**
   * The Job has been queued/scheduled in the system, but nothing happened yet.
   */
  queued = "queued",

  /**
   * The Job has been cancelled when it was still waiting in queue. A job that
   * is already preProcessing, started or finished, cannot be cancelled.
   */
  cancelled = "cancelled",

  /**
   * The Job has been loaded from the DB for pre-processing and then processing.
   *
   * This should act as a "lock" so other instances of Async Job runners should
   * not load this job for processing anymore.
   */
  preProcessing = "pre-processing",

  /**
   * The Async Job's `run` function is running.
   */
  started = "started",

  /**
   * The Async Job's `run` function completed execution successfully without
   * throwing.
   */
  finishSuccess = "finish-success",

  /**
   * The Async Job's `run` function failed execution and threw an error.
   */
  finishFail = "finish-fail",
}
