/**
 * `QueryOptions` is used to define all the parameters of a Query, from the
 * `queryFn` itself to `cacheKeys` to determine how to cache the given Query.
 */
export type QueryOptions<T> = {
  queryFn: () => Promise<T>;
  cacheKeys: Array<string>;
};
