/**
 * An object representing the current query's state.
 */
export interface QueryState<T> {
  /**
   * The current query status.
   */
  status: "loading" | "success" | "error";

  /**
   * Is the query being loaded right now, i.e. is the query function being ran
   * right now?
   */
  isLoading: boolean;

  /**
   * The data/result/return value of the provided query function on its latest
   * run, or `null` if no data is returned yet.
   */
  data: null | T;

  /**
   * The error thrown by the provided query function on its latest run, or
   * `null` if there was no error on its latest run or the latest run hasnt
   * completed yet.
   */
  error: null | Error;

  /**
   * The last time the query completed successfully in unix timestamp in
   * milliseconds. This is null until the first time the Query completes
   * successfully.
   */
  lastSuccessfulQueryTime: null | number;
}
