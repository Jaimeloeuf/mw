import { Exception } from "../../exceptions/index.js";
import { unknownCatchToError } from "../../utils/index.js";
import { logger } from "../../logging/index.js";

/**
 * DAL function wrapper to catch and return any unknown Errors thrown by the
 * underlying data libraries like Kysely/Pg/etc... so for example if a DAL
 * function uses kysely to load a DB row and something went wrong that causes
 * kysely to throw an Error, this function wrapper will catch it and return it.
 *
 * This however does not catch and return Exceptions thrown by the DAL function
 * itself. For example, if a checkExistence DAL function reads a DB row to check
 * if the row exists, and threw a `NotFoundException`, this exception will be
 * re-thrown here to let it bubble up.
 *
 * The return type of the wrapped function is its original value unioned with
 * `Error`.
 */
export function dalWrapper<T extends (...args: any) => Promise<any>>(fn: T) {
  // Extra runtime check alongside compile time check with ESLint rule
  // 'mwEslintPlugin/require-function-name-for-dalWrapper'
  if (fn.name === "") {
    throw new Error(`Functions passed to ${dalWrapper.name} must be named`);
  }

  async function wrappedFunction(
    ...args: Parameters<T>
  ): Promise<Error | Awaited<ReturnType<T>>> {
    try {
      return await fn(...args);
    } catch (e) {
      // If it is an Exception, let it bubble up.
      // The assumption here is that only services use data repos, and services
      // are only called through controllers that have built in mechanisms for
      // error and exception handling. So instead of returning this exception
      // back to the service for them to throw and we assume they will always
      // throw it once they receive it, we just let it bubble up here.
      if (e instanceof Exception) {
        throw e;
      }

      // Convert unknown `e` type to a definite `Error` type before returning it
      const error = unknownCatchToError(e);

      logger.verbose(
        dalWrapper.name,
        `Failed to execute DAL repo call: ${fn.name}`
      );

      logger.error(
        `${dalWrapper.name}:${fn.name}`,
        error instanceof Error ? error.stack : error
      );

      return error;
    }
  }

  // Reuse fn.name so that logging uses the real name
  Object.defineProperty(wrappedFunction, "name", { value: fn.name });

  return wrappedFunction;
}
