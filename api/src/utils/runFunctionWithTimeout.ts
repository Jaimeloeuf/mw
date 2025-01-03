import { TimeoutException } from "../exceptions/index.js";

async function delayAndThrow(
  timeoutInMilliseconds: number,
  timeoutExceptionMessage: string,
  controller: { skip: boolean },
) {
  await new Promise((res) => setTimeout(res, timeoutInMilliseconds));

  if (!controller.skip) {
    throw new TimeoutException(timeoutExceptionMessage);
  }
}

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
  const controller = { skip: false };

  try {
    delayAndThrow(timeoutInMilliseconds, timeoutExceptionMessage, controller);

    const result = await fn();

    controller.skip = true;

    return result;
  } catch (error) {
    // Always clear timeout before re-throwing error / bubbling error up.
    controller.skip = true;
    throw error;
  }
}
