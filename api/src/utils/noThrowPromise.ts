import { unknownCatchToError } from "./unknownCatchToError.js";

/**
 * Utility wrapper function to wrap a promise to prevent it from throwing.
 *
 * **If you need to wrap function instead, use `noThrowFunction` which supports
 * both sync and async functions**
 *
 * ## Important Note
 * Make sure you do not pass in a synchronous function call like
 * ```typescript
 * function test() {
 *     throw new Error('testing');
 * }
 * noThrowPromise(test());
 * ```
 * This will not work, as it will throw before control flow even passes to
 * `noThrowPromise`, effectively making this wrapping useless.
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
 * const [err, result] = await noThrowPromise(yourPromise);
 * if (err !== null){
 *     console.error('Operation failed with', err);
 *     return;
 * }
 * result; // This will type narrow to ResultType
 * ```
 *
 * ## Slightly less safe than `noThrowFunction`
 * since this execution starts at caller site, then only when the first await is
 * found, then the whole thing becomes a Promise and get passed into this
 * `noThrowPromise` wrapper as its argument, and execution gets yielded here to
 * await instead. So potentially, during the time between calling
 * `noThrowPromise` and creating the promise, it might have already thrown in a
 * synchronous manner.
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
