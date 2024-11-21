import { Query } from "./Query";
import { hashQueryCacheKeys } from "./hashQueryCacheKeys.js";
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
    const queryCacheHash = hashQueryCacheKeys(queryOptions.cacheKeys);

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

  /**
   * Invalidate an existing `Query` using the same `QueryOption['cacheKeys']`.
   * This will return a boolean to indicate if cached query has been deleted.
   */
  invalidateQuery(...cacheKeys: QueryOptions<any>["cacheKeys"]) {
    for (const cacheKey of cacheKeys) {
      const queryCacheHash = hashQueryCacheKeys(cacheKey);

      if (!this.queryCache.has(queryCacheHash)) {
        continue;
      }

      // Using a non-null assertion operator since we just set it in the cache if
      // it didnt already exists.
      const query = this.queryCache.get(queryCacheHash)!;

      query.run();
    }
  }

  /**
   * On window focus event, query client will re-run all `queryFn`s whose
   * `Query` has set `QueryOption['refetchOnWindowFocus']` to true.
   */
  onWindowFocus() {
    for (const query of this.queryCache.values()) {
      if (query.options.refetchOnWindowFocus) {
        query.run();
      }
    }
  }
}
