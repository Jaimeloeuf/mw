import type { AsyncJobResult } from "./AsyncJobResult.js";
import type { AsyncJobStatus } from "./AsyncJobStatus.js";
import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

/**
 * Async Job represents a single run/instance of the specified `AsyncJobType`.
 */
export type AsyncJob = Pick<AsyncJobTypeConfig, "machineType" | "priority"> & {
  /**
   * Unique ID for each Job (also known as a run or job instance).
   */
  id: string;

  /**
   * This AsyncJob's `AsyncJobType` ID.
   */
  jobTypeID: string;

  /**
   * Current status of the Job
   */
  status: AsyncJobStatus;

  /**
   * Who scheduled this async job? Arbitrary string mainly used for simple
   * identification / debugging, usually the name of the function that scheduled
   * this job.
   *
   * This can be a special string like `<manual>` if you manually scheduled a
   * job run through the CLI or dashboard.
   */
  caller: string;

  /**
   * Stack Trace of how this Job got scheduled and where is it scheduled from.
   */
  stackTrace: string;

  /**
   * A timeout in seconds for this Job. Once time is up we will try to kill the
   * job, and record that it finished in failure with exceeded timeout as
   * failure reason.
   *
   * If this is explicitly set to `null`, it means the job will never timeout,
   * use carefully as this could run into an infinite loop and hog the server.
   */
  timeout: number | null;

  /**
   * When is this Job scheduled in ISO time?
   */
  timeScheduled: string;

  /**
   * ISO time for when to start the job after. The job is guaranteed to start
   * after this time, but not immediately at this time since it will only run
   * when there is an available machine after this start time.
   *
   * This is null if the job function should start running as soon as possible.
   */
  timeStartAfter: null | string;

  /**
   * When did the Job start getting pre-processed in ISO time?
   *
   * This is null until the job starts pre-processing.
   */
  timePreprocess: null | string;

  /**
   * When did the Job's `run` method start running in ISO time?
   *
   * This is null until the job function starts running.
   */
  timeStart: null | string;

  /**
   * When did the Job's `run` method finish (regardless of whether it succeded
   * or failed) in ISO time?
   *
   * This is null until the job function finishes.
   */
  timeFinish: null | string;

  /**
   * If the Job is cancelled as per the job status, when did this cancellation
   * happen (in ISO time)?
   *
   * This is null unless the job is cancelled.
   */
  timeCancelled: null | string;

  /**
   * JSON serializable data stored in DB either as JSON string or object.
   *
   * This can be null if the job function has no arguments.
   */
  jobArguments: null | unknown;

  /**
   * JSON serializable data stored in DB either as JSON string or object.
   *
   * This is null until the job function finishes.
   */
  jobResult: null | AsyncJobResult;

  /**
   * JSON serializable data stored in DB either as JSON string or object.
   *
   * ##
   * I want to have the option to store information for debugging purposes when
   * an async job is cancelled.
   *
   * When storing info for debugging purposes when an async job is scheduled, we
   * can rely on just looking at the `jobType`, `caller`, `stackTrace` and
   * `jobArguments` because these should contain all information needed for us
   * to understand what is going on at the point when the job is scheduled.
   *
   * However, since we do not have things like `jobArguments` when cancelling
   * the job, it is hard to understand the whole picture of what actually
   * happened at the point of cancellation.
   *
   * So this `cancellationData` should hold all the information about what
   * happened at the point of cancellation for debugging purposes, while not
   * taking up multiple fields since this isnt always used. Which is also why
   * this is a single JSON stringifiable object instead of different fields
   * because this is only used for debugging.
   */
  cancellationData: null | {
    stackTrace: string;

    /**
     * Optionally, pass in anything that is JSON stringifiable for additional
     * context on why the job is cancelled, which can be helpful for debugging
     * purposes.
     */
    cancellationContext?:
      | string
      | Record<string, string | number | boolean>
      | Array<string | number | boolean>;
  };
};
