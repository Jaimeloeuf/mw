import { config } from "../../config/index.js";
import { logger } from "../../logging/index.js";
import { prettyPrintJson, noThrowPromise } from "../../utils/index.js";

/**
 * Data Function wrapper to wrap them and provide common utility features such
 * as error/exception logging, and to give DAL users (service functions) a
 * choice of either calling the data function and let errors/exceptions bubble
 * through or catch all errors/exceptions and return it for manual handling.
 */
export function dataFn<
  T extends (...args: any) => Promise<any>,
  Result extends Awaited<ReturnType<T>> = Awaited<ReturnType<T>>,
>(fn: T) {
  // Extra runtime check alongside compile time check with ESLint rule
  // 'mwEslintPlugin/dataFn'
  if (fn.name === "") {
    throw new Error(`Functions passed to ${dataFn.name} must be named`);
  }

  /**
   * Run data function and catches any error/exceptions encountered using
   * `noThrow`. Which means the return type will always be a tuple of an error
   * and the original data function's return type, which you can use to type
   * narrow down to either a failure or success case.
   *
   * If you need to do some action like say, send user an email notification
   * about the failed service function call, use this to get the error
   * / exception back and handle it yourself manually alongside any action
   * you want to run.
   *
   * If you want service function to stop executing on data errors/exceptions
   * and do not need to do any extra action in service function after the
   * error/exception (i.e. you just re-throw the error in the service layer),
   * then instead of manually checking if data method errored before re-throwing
   * it, use the `runAndThrowOnError` method instead.
   */
  async function run(
    ...args: Parameters<T>
  ): Promise<[null, Result] | [Error, null]> {
    if (config.df_verbose_log_calls) {
      logger.verbose(
        dataFn.name,
        `Running '${fn.name}' with:`,
        prettyPrintJson(args),
      );
    }

    const noThrowResult = await noThrowPromise(fn(...args));

    if (noThrowResult[0] !== null) {
      logDataFnError(fn.name, noThrowResult[0]);
    }

    return noThrowResult;
  }

  /**
   * Run data function, and throws on any error/exceptions encountered.
   *
   * The primary purpose of this is so that service functions do not have to
   * deal with manually checking if result is `Error` before re-throwing it
   * themselves, and just let this method throw it for them instead.
   *
   * Only use this if you want service function to stop executing on data
   * function errors/exceptions, and do not need to do any extra action in
   * service function.
   *
   * If you need to do some action like say, send user an email notification
   * about the failed data function call, use `run` instead to get the error /
   * exception back and handle it yourself manually.
   */
  async function runAndThrowOnError(...args: Parameters<T>): Promise<Result> {
    if (config.df_verbose_log_calls) {
      logger.verbose(
        dataFn.name,
        `Running '${fn.name}' with:`,
        prettyPrintJson(args),
      );
    }

    const noThrowResult = await noThrowPromise(fn(...args));

    if (noThrowResult[0] !== null) {
      logDataFnError(fn.name, noThrowResult[0]);
      throw noThrowResult[0];
    }

    return noThrowResult[1];
  }

  return {
    run,
    runAndThrowOnError,
  };
}

/**
 * Log data function errors in the same format regardless of whether caller
 * choose to use `run` or `runAndThrowOnError`.
 */
function logDataFnError(fnName: string, error: Error) {
  logger.error(dataFn.name, `Error thrown in data function: ${fnName}`);
  logger.error(`${dataFn.name}:${fnName}`, error?.stack ?? error);
}
