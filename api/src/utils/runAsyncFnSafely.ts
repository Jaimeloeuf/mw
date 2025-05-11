import { unknownCatchToError } from "./index.js";

/**
 * Utility wrapper function to wrap a function (both sync/async) to prevent it
 * from throwing.
 *
 * Even if a synchronous function is passed in, this will still await it, which
 * is equivalent to `Promise.resolve(value)` which means this supports dynamic
 * functions without knowing its return type ahead of time. However if you do
 * know that the function will be synchronous, prefer `runFnSafely` for a non
 * `Promise<T>` wrapped return type.
 *
 * **If you need to wrap a sync function, use `runFnSafely`**
 * **If you need to wrap a Promise, use `awaitPromiseSafely`**
 *
 * ## Return Type
 * This will always return a 2 element tuple, whose type is
 * `[err, null] | [null, result]`. Similar to Go error handling, where if there
 * is an error the first element will be set to it and the second element will
 * be null, and vice versa if no errors thrown.
 *
 * You can then use TS type narrowing to determine if the function threw an
 * error or not. For example
 * ```typescript
 * export const [err, result] = await runAsyncFnSafely(() => ...);
 * if (err !== null){
 *     console.error('Operation failed with', err);
 *     return;
 * }
 * result; // This will type narrow to ResultType
 * ```
 */
export async function runAsyncFnSafely<
  T extends (...args: any) => any,
  FnArgs extends Parameters<T>,
  SuccessfulReturnType extends Awaited<ReturnType<T>> = Awaited<ReturnType<T>>,
>(
  fn: T,
  ...args: FnArgs
): Promise<[null, SuccessfulReturnType] | [Error, null]> {
  try {
    return [null, await fn(...args)];
  } catch (e) {
    // Convert unknown `e` type to a definite `Error` type before returning it
    return [unknownCatchToError(e), null];
  }
}
