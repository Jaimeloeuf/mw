declare global {
  /**
   * Utility function run a synchronous function safely to prevent it from
   * throwing and returns a `$ResultTuple`.
   *
   * ### Alternatively
   * 1. Run an async function with global util `$runAsyncFnSafely`.
   * 1. Await a Promise with global util `$awaitPromiseSafely`.
   */
  function $runFnSafely<
    T extends (...args: any) => any,
    FnArgs extends Parameters<T>,
    SuccessfulReturnType extends ReturnType<T>,
  >(fn: T, ...args: FnArgs): $ResultTuple<SuccessfulReturnType, Error>;
}

globalThis.$runFnSafely = function $runFnSafely<
  T extends (...args: any) => any,
  FnArgs extends Parameters<T>,
  SuccessfulReturnType extends ReturnType<T>,
>(fn: T, ...args: FnArgs): $ResultTuple<SuccessfulReturnType, Error> {
  try {
    return [null, fn(...args)];
  } catch (e) {
    return [$convertUnknownCatchToError(e), null];
  }
};
