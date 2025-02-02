/**
 * Utility function to check if a given value is a `Promise`.
 *
 * Uses heuristics such as:
 * - If value is an instanceof `Promise` constructor, then it is probably a
 * native promise type.
 * - If the value has a `.then` method on it, it is probably a promise type,
 * native or not.
 * - If all above conditions are met, it is definitely a promise.
 */
export const isPromise = (value: unknown): boolean =>
  value instanceof Promise && typeof (value as any)?.then === "function";
