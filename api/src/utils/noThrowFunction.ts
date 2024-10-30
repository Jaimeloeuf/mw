import { unknownCatchToError } from "./index.js";

/**
 * Utility wrapper function to wrap a function to prevent it from throwing.
 *
 * **If you need to wrap a Promise instead, use `noThrowPromise`**
 *
 * This will always return a 2 element tuple, whose type is
 * `[err, null] | [null, result]`. Similar to Go error handling, where if there
 * is an error the first element will be set to it and the second element will
 * be null, and vice versa if no errors thrown.
 *
 * You can then use TS type narrowing to determine if the function threw an
 * error or not. For example
 * ```typescript
 * const [err, result] = await noThrowFunction(() => ...);
 * if (err !== null){
 *     console.error('Operation failed with', err);
 *     return;
 * }
 * result; // This will type narrow to ResultType
 * ```
 */
export async function noThrowFunction<
  T extends (...args: any) => Promise<any>,
  SuccessfulReturnType extends Awaited<ReturnType<T>> = Awaited<ReturnType<T>>,
>(fn: T): Promise<[null, SuccessfulReturnType] | [Error, null]> {
  try {
    return [null, await fn()];
  } catch (e) {
    // Convert unknown `e` type to a definite `Error` type before returning it
    return [unknownCatchToError(e), null];
  }
}
