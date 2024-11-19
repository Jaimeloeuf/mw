/**
 * `QueryOptions` is used to define all the parameters of a Query, from the
 * `queryFn` itself to `cacheKeys` to determine how to cache the given Query.
 */
export type QueryOptions<T> = {
  queryFn: () => Promise<T>;
  cacheKeys: Array<string>;

  /**
   * How long before cached query is marked as stale, and queryFn is re-ran.
   * If this is not specified, cached query will always be marked as stale.
   */
  staleAfterMilliseconds?: number;

  /**
   * Once the `Query` has no more `QuerySubscriber`s, how long should we wait
   * before running garbage collection to delete the locally cached data?
   *
   * With `React` as example, it means once there is no more mounted components
   * that uses this `Query` the cached query will be scheduled for garbage
   * collection / deletion from the `QueryClient`'s cache after the specified
   * time.
   *
   * If a new component subscribes to the same `Query` before the specified time
   * is up, the scheduled garbage collection event will be removed, until all
   * the components that uses this `Query` gets unmounted again, which will then
   * cause another garbage collection event to be scheduled to run after the
   * specified time.
   *
   * If this is not specified, the cached query will be cached infinitely until
   * the application/QueryClient resets.
   */
  runGarbageCollectionAfterMilliseconds?: number;

  /**
   * Should the query be refetched when the window comes back into focus? E.g.
   * if user switches away to another window/tab and comes back, should the
   * `queryFn` be ran again to refresh the data?
   */
  refetchOnWindowFocus?: boolean;
};
