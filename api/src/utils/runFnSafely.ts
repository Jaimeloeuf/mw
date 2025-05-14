/**
 * Utility wrapper function to wrap a function sync to prevent it from throwing.
 *
 * **If you need to wrap an async function, use `runAsyncFnSafely`**
 * **If you need to wrap a Promise, use `$awaitPromiseSafely`**
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
 * export const [err, result] = runFnSafely(() => ...);
 * if (err !== null){
 *     console.error('Operation failed with', err);
 *     return;
 * }
 * result; // This will type narrow to ResultType
 * ```
 */
export async function runFnSafely<
  T extends (...args: any) => any,
  FnArgs extends Parameters<T>,
  SuccessfulReturnType extends ReturnType<T> = ReturnType<T>,
>(
  fn: T,
  ...args: FnArgs
): Promise<[null, SuccessfulReturnType] | [Error, null]> {
  try {
    return [null, fn(...args)];
  } catch (e) {
    return [$convertUnknownCatchToError(e), null];
  }
}
