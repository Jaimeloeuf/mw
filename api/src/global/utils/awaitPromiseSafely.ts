declare global {
  /**
   * Utility wrapper function to wrap a promise to prevent it from throwing.
   *
   * **If you need to wrap function instead, use `runAsyncFnSafely` which supports
   * both sync and async functions**
   *
   * ## Important Note
   * Make sure you do not pass in a synchronous function call like
   * ```typescript
   * function test() {
   *     throw new Error('testing');
   * }
   * $awaitPromiseSafely(test());
   * ```
   * This will not work, as it will throw before control flow even passes to
   * `$awaitPromiseSafely`, effectively making this wrapping useless.
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
   * const [err, result] = await $awaitPromiseSafely(yourPromise);
   * if (err !== null){
   *     console.error('Operation failed with', err);
   *     return;
   * }
   * result; // This will type narrow to ResultType
   * ```
   *
   * ## Slightly less safe than `runAsyncFnSafely`
   * since this execution starts at caller site, then only when the first await is
   * found, then the whole thing becomes a Promise and get passed into this
   * `$awaitPromiseSafely` wrapper as its argument, and execution gets yielded here
   * to await instead. So potentially, during the time between calling
   * `$awaitPromiseSafely` and creating the promise, it might have already thrown
   * in a synchronous manner.
   */
  function $awaitPromiseSafely<
    T extends Promise<any>,
    SuccessfulReturnType extends Awaited<T> = Awaited<T>,
  >(promise: T): Promise<[null, SuccessfulReturnType] | [Error, null]>;
}

globalThis.$awaitPromiseSafely = async function $awaitPromiseSafely<
  T extends Promise<any>,
  SuccessfulReturnType extends Awaited<T> = Awaited<T>,
>(promise: T): Promise<[null, SuccessfulReturnType] | [Error, null]> {
  try {
    return [null, await promise];
  } catch (e) {
    return [$convertUnknownCatchToError(e), null];
  }
};
