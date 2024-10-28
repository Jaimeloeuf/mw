import { unknownCatchToError } from "./unknownCatchToError.js";

/**
 * Utility wrapper function to wrap a promise to prevent it from throwing.
 *
 * This will always return a 2 element tuple, whose type is
 * `[err, null] | [null, result]`. Similar to Go error handling, where if there
 * is an error the first element will be set to it and the second element will
 * be null, and vice versa if no errors thrown.
 *
 * You can then use TS type narrowing to determine if the function threw an
 * error or not. For example
 * ```typescript
 * const [err, result] = await noThrow(yourPromise);
 * if (err !== null){
 *     console.error('Operation failed with', err);
 *     return;
 * }
 * result; // This will type narrow to ResultType
 * ```
 */
export async function noThrowPromise<
  T extends Promise<any>,
  SuccessfulReturnType extends Awaited<T> = Awaited<T>,
>(promise: T): Promise<[null, SuccessfulReturnType] | [Error, null]> {
  try {
    return [null, await promise];
  } catch (e) {
    // Convert unknown `e` type to a definite `Error` type before returning it
    return [unknownCatchToError(e), null];
  }
}
