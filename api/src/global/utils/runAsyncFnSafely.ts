declare global {
  /**
   * Utility function run an async function safely to prevent it from
   * throwing and returns a `$ResultTuple`.
   *
   * ### Alternatively
   * 1. Run a synchronous function with global util `$runFnSafely`.
   * 1. Await a Promise with global util `$awaitPromiseSafely`.
   *
   * ### Unknown original function return type
   * Sometimes you want to deal with functions that can be synchronous or async,
   * i.e. the function return type is not known at compile time. In such cases
   * choose `$runAsyncFnSafely` instead of `$runFnSafely` for compatibility.
   * Because even if a synchronous function is passed in, this will still await
   * it, which is equivalent to `Promise.resolve(value)`.
   * However if you do know that the function will be synchronous, prefer
   * `$runFnSafely` for a non `Promise<T>` wrapped return type.
   */
  function $runAsyncFnSafely<
    T extends (...args: any) => any,
    FnArgs extends Parameters<T>,
    SuccessfulReturnType extends Awaited<ReturnType<T>> = Awaited<
      ReturnType<T>
    >,
  >(fn: T, ...args: FnArgs): Promise<$ResultTuple<SuccessfulReturnType, Error>>;
}

globalThis.$runAsyncFnSafely = async function $runAsyncFnSafely<
  T extends (...args: any) => any,
  FnArgs extends Parameters<T>,
  SuccessfulReturnType extends Awaited<ReturnType<T>> = Awaited<ReturnType<T>>,
>(fn: T, ...args: FnArgs): Promise<$ResultTuple<SuccessfulReturnType, Error>> {
  try {
    return [null, await fn(...args)];
  } catch (e) {
    return [$convertUnknownCatchToError(e), null];
  }
};
