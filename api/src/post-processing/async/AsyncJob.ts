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
};
