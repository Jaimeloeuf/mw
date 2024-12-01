/**
 * Return type of the Async Job Type run function.
 */
export type JobResult<Detail = unknown> = {
  success: boolean;

  /**
   * Optional simple human readable string description of the result.
   */
  description?: string;

  /**
   * Optional result details data of any type.
   */
  details?: Detail;
};
