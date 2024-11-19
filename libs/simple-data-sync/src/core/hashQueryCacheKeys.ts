import type { QueryOptions } from "./QueryOptions";

/**
 * Create a hash by simply JSON.stringifying the Array of strings.
 */
export function hashQueryCacheKeys(cacheKeys: QueryOptions<any>["cacheKeys"]) {
  return JSON.stringify(cacheKeys);
}
