import type { QueryOptions } from "./QueryOptions";

/**
 * Create a hash by simply JSON.stringifying the Array of strings.
 */
export function hashQueryCacheKey(cacheKey: QueryOptions<any>["cacheKey"]) {
  return JSON.stringify(cacheKey);
}
