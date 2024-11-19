import { Query } from "./Query";
import type { QueryOptions } from "../core/QueryOptions.js";

/**
 * A `QueryClient` encapsulates its own cache, so multiple instances of
 * `QueryClient` can exists to provide cache namespaces.
 */
export class QueryClient {
  /**
   * Private cache of all queries owned by this QueryClient instance.
   */
  private queryCache = new Map<string, Query<any>>();

  /**
   * Get a Query if it already exists, else, create a new one.
   */
  getQuery<T>(queryOptions: QueryOptions<T>) {
    // Create a hash by simply JSON.stringifying the Array of strings
    const queryCacheHash = JSON.stringify(queryOptions.cacheKeys);

    // Create Query and set in cache if it isnt already cached
    if (!this.queryCache.has(queryCacheHash)) {
      const removeQueryFromCache = () => this.queryCache.delete(queryCacheHash);
      const query = new Query(queryOptions, removeQueryFromCache);
      this.queryCache.set(queryCacheHash, query);
    }

    // Using a non-null assertion operator since we just set it in the cache if
    // it didnt already exists.
    return this.queryCache.get(queryCacheHash)!;
  }
}
