import { logger } from "../../logging/index.js";
import { unknownCatchToError } from "../../utils/index.js";

/**
 * DAL function wrapper to wrap them and provide common utility features such as
 * error/exception logging, and to give DAL users (service functions) a choice
 * of either calling the DAL function and let errors/exceptions bubble through
 * or catch all errors/exceptions and return it for manual handling.
 */
export function dalWrapper<T extends (...args: any) => Promise<any>>(fn: T) {
  // Extra runtime check alongside compile time check with ESLint rule
  // 'mwEslintPlugin/require-function-name-for-dalWrapper'
  if (fn.name === "") {
    throw new Error(`Functions passed to ${dalWrapper.name} must be named`);
  }

  /**
   * Run DAL repo function and catches any error/exceptions encountered to
   * return it. This means the return type will always be a union of the
   * original DAL function's return type and Error.
   *
   * If you need to do some action like say, send user an email notification
   * about the failed service function call, use this to get the error
   * / exception back and handle it yourself manually alongside any action
   * you want to run.
   *
   * If you want service function to stop executing on DAL errors/exceptions,
   * and do not need to do any extra action in service function after the
   * error/exception, then instead of manually checking if result is `Error`
   * before re-throwing it, use the `getResultOrThrowOnError` method instead.
   */
  async function getResultOrError(
    ...args: Parameters<T>
  ): Promise<Error | Awaited<ReturnType<T>>> {
    try {
      return await fn(...args);
    } catch (e) {
      // Convert unknown `e` type to a definite `Error` type before returning it
      const error = unknownCatchToError(e);

      logger.error(
        dalWrapper.name,
        `Failed to execute DAL repo call: ${fn.name}`,
      );

      logger.error(
        `${dalWrapper.name}:${fn.name}`,
        error instanceof Error ? error.stack : error,
      );

      return error;
    }
  }

  /**
   * Run DAL repo function, and throws on any error/exceptions encountered.
   *
   * The primary purpose of this is so that service functions do not have to
   * deal with manually checking if result is `Error` before re-throwing it
   * themselves, and just let this method throw it for them instead.
   *
   * Only use this if you want service function to stop executing on DAL
   * errors/exceptions, and do not need to do any extra action in service
   * function.
   *
   * If you need to do some action like say, send user an email notification
   * about the failed service function call, use `getResultOrError` instead to
   * get the error/exception back and handle it yourself manually.
   */
  async function getResultOrThrowOnError(...args: Parameters<T>) {
    // Still call the wrapped function to ensure that unknown catch types are
    // converted to `Error` type and error logging is ran first.
    const result = await getResultOrError(...args);

    if (result instanceof Error) {
      throw result;
    }

    return result;
  }

  return {
    getResultOrError,
    getResultOrThrowOnError,
  };
}
