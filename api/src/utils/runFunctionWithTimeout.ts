import { TimeoutException } from "../exceptions/index.js";

/**
 * Runs a given function with a timeout, and will stop the given function's
 * execution once the timeout has been hit, by having a `TimeoutException`
 * thrown.
 *
 * If function successfully completes execution before timeout, it will just
 * resolves naturally and have its results returned.
 *
 * If function throws an error on its own, the timeout will be cleared before
 * the original error gets re-thrown / bubbled up.
 */
export async function runFunctionWithTimeout<T extends (...args: any) => any>(
  fn: T,
  timeoutInMilliseconds: number,
  timeoutExceptionMessage: string,
) {
  return Promise.race([
    fn(),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new TimeoutException(timeoutExceptionMessage)),
        timeoutInMilliseconds,
      ),
    ),
  ]);
}
