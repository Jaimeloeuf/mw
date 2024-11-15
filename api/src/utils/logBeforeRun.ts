import { logger } from "../logging/Logger.js";
import { prettyPrintJson } from "./prettyPrintJson.js";

/**
 * Utility function wrapper to log a function's name and arguments before it is
 * called.
 */
export function logBeforeRun<T extends (...args: any) => any>(fn: T) {
  return function (...args: Parameters<T>): ReturnType<T> {
    logger.verbose(
      `${logBeforeRun.name}:${fn.name}`,
      `Called with:`,
      prettyPrintJson(args),
    );
    return fn(...args);
  };
}
