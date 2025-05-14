declare global {
  /**
   * Utility function await a Promise safely to prevent it from throwing and
   * returns a `$ResultTuple`.
   *
   * ### Alternatively
   * 1. Run a synchronous function with global util `$runFnSafely`.
   * 1. Run an async function with global util `$runAsyncFnSafely`.
   *
   * ### Important Note
   * Make sure you do not pass in a synchronous function call like
   * ```typescript
   * function test() {
   *     throw new Error('testing');
   * }
   * $awaitPromiseSafely(test());
   * ```
   * This will not work, as it will throw before control flow even passes to
   * `$awaitPromiseSafely`, effectively making this function call useless.
   *
   * ## Prefer `$runAsyncFnSafely`
   * The execution starts at the promise creator function's call site, and only
   * when the first await is found, then the whole thing becomes a Promise and
   * get passed into this `$awaitPromiseSafely` wrapper as its argument, and
   * execution gets yielded to the await in this function. So potentially,
   * during the time between calling `$awaitPromiseSafely` and creating the
   * promise, it might have already thrown in a synchronous manner, see the
   * important note above on how it could happen. Which is why
   * `$runAsyncFnSafely` is a safer alternative since the initial call is
   * already protected by a try/catch inside `$runAsyncFnSafely`, but the
   * downside being an additional function call stack.
   */
  function $awaitPromiseSafely<
    T extends Promise<any>,
    SuccessfulReturnType extends Awaited<T> = Awaited<T>,
  >(promise: T): Promise<$ResultTuple<SuccessfulReturnType, Error>>;
}

globalThis.$awaitPromiseSafely = async function $awaitPromiseSafely<
  T extends Promise<any>,
  SuccessfulReturnType extends Awaited<T> = Awaited<T>,
>(promise: T): Promise<$ResultTuple<SuccessfulReturnType, Error>> {
  try {
    return [null, await promise];
  } catch (e) {
    return [$convertUnknownCatchToError(e), null];
  }
};
