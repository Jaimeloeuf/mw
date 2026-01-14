import { simpleLogger } from "../logging/SimpleLogger.js";
import { json } from "./json.js";

/**
 * Utility function wrapper to log a function's name and arguments before it is
 * called.
 */
export function logBeforeRun<T extends (...args: any) => any>(fn: T) {
  return function (...args: Parameters<T>): ReturnType<T> {
    simpleLogger.verbose(
      `${logBeforeRun.name}:${fn.name}`,
      `Called with:`,
      json.stringifyPretty(args),
    );
    return fn(...args);
  };
}
