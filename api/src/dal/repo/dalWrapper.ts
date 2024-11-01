import { logger } from "../../logging/index.js";
import { noThrowPromise } from "../../utils/index.js";

/**
 * DAL function wrapper to wrap them and provide common utility features such as
 * error/exception logging, and to give DAL users (service functions) a choice
 * of either calling the DAL function and let errors/exceptions bubble through
 * or catch all errors/exceptions and return it for manual handling.
 */
export function dalWrapper<
  T extends (...args: any) => Promise<any>,
  Result extends Awaited<ReturnType<T>> = Awaited<ReturnType<T>>,
>(
  fn: T,

  /**
   * Data Function name
   */
  name?: string,
) {
  // @todo Delete the eslint check once dfName is fully used
  // Extra runtime check alongside compile time check with ESLint rule
  // 'mwEslintPlugin/require-function-name-for-dalWrapper'
  // if (fn.name === "") {
  //   throw new Error(`Functions passed to ${dalWrapper.name} must be named`);
  // }

  const dfName = name ?? fn.name;

  /**
   * Run DAL repo function and catches any error/exceptions encountered using
   * `noThrow`. Which means the return type will always be a tuple of an error
   * and the original DAL function's return type, which you can use to type
   * narrow down to either a failure or success case.
   *
   * If you need to do some action like say, send user an email notification
   * about the failed service function call, use this to get the error
   * / exception back and handle it yourself manually alongside any action
   * you want to run.
   *
   * If you want service function to stop executing on DAL errors/exceptions
   * and do not need to do any extra action in service function after the
   * error/exception (i.e. you just re-throw the error in the service layer),
   * then instead of manually checking if dal method errored before re-throwing
   * it, use the `getResultOrThrowOnError` method instead.
   */
  async function getResultOrError(
    ...args: Parameters<T>
  ): Promise<[null, Result] | [Error, null]> {
    const noThrowResult = await noThrowPromise(fn(...args));

    if (noThrowResult[0] !== null) {
      logDalError(dfName, noThrowResult[0]);
    }

    return noThrowResult;
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
   * about the failed dal method call, use `getResultOrError` instead to get the
   * error/exception back and handle it yourself manually.
   */
  async function getResultOrThrowOnError(
    ...args: Parameters<T>
  ): Promise<Result> {
    const noThrowResult = await noThrowPromise(fn(...args));

    if (noThrowResult[0] !== null) {
      logDalError(dfName, noThrowResult[0]);
      throw noThrowResult[0];
    }

    return noThrowResult[1];
  }

  return {
    getResultOrError,
    getResultOrThrowOnError,
  };
}

/**
 * Log DAL errors in the same format regardless of whether caller choose to use
 * `getResultOrError` or `getResultOrThrowOnError`.
 */
function logDalError(fnName: string, error: Error) {
  logger.error(dalWrapper.name, `Failed to execute DAL repo call: ${fnName}`);
  logger.error(`${dalWrapper.name}:${fnName}`, error?.stack ?? error);
}
