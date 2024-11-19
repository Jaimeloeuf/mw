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
   * How long should the cached query be kept for, before it is evicted from
   * `QueryClient`'s cache? If this is not specified, query will be cached
   * infinitely until the application/QueryClient resets.
   */
  cacheForMilliseconds?: number;
};
