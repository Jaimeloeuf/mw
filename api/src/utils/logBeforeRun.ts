import { logger } from "../logging/Logger.js";

/**
 * Utility function wrapper to log a function's name and arguments before it is
 * called.
 */
export function logBeforeRun<T extends (...args: any) => Promise<any> | any>(
  fn: T,
) {
  return function (...args: Parameters<T>): ReturnType<T> {
    return fn(...args);
  };
}
