/**
 * Function wrapper to wrap functions to give function callers a choice to
 * either call the function and let errors / exceptions bubble through or catch
 * all errors / exceptions and return it for manual handling.
 *
 * ## Generic function types `T`
 * All input functions are expected to either be `async`, or return a `Promise`.
 * This is because the safety mechanism used by both methods below is
 * `$awaitPromiseSafely`, which requires a Promise as input. If a synchronous
 * function is used, it will not yield control flow back to `$awaitPromiseSafely`
 * until it runs to completion, and if it throws, it cannot be caught, which
 * defeats the whole point of using `$awaitPromiseSafely`. An alternative to this
 * would be to use `runAsyncFnSafely` safety wrapper instead with an anonymous
 * function like `const result = await runAsyncFnSafely(() => fn(...args))`.
 * But since most if not all input functions are expected to be asynchronous,
 * it is not worth it to add a layer of function call / indirection just to
 * support synchronous input functions. Therefore input functions must be either
 * `async` or returns a `Promise`.
 */
export const wrapFunctionToProvideRunModes = <
  T extends (...args: any) => Promise<any>,
>(
  fn: T,
) => ({
  /**
   * Run wrapped function and catches any error / exceptions encountered using
   * `$awaitPromiseSafely`. Which means the return type will always be a tuple of
   * an error and the original function's return type, which you can use to type
   * narrow down to either a failure or success case.
   *
   * If you want your caller to stop executing on errors / exceptions and do not
   * need to do any extra action in your caller function after the error /
   * exception (i.e. you just re-throw the error in your caller function), then
   * instead of manually checking if data method errored before re-throwing
   * it, use the `runAndThrowOnError` method instead.
   */
  run: (
    ...args: Parameters<T>
  ): Promise<[null, Awaited<ReturnType<T>>] | [Error, null]> =>
    $awaitPromiseSafely(fn(args)),

  /**
   * Run input function directly and throws on any error / exceptions
   * encountered.
   *
   * The primary purpose of this is so that your caller functions do not have to
   * deal with manually checking if result is `Error` before re-throwing it
   * themselves, and just let this method throw it for them instead.
   *
   * Only use this if you want your caller function to stop executing on
   * errors / exceptions, and do not need to do any extra action in after.
   *
   * If you need to do some action like say, do some recovering/rollback work
   * when the wrapped function fails, use `run` instead to get the error /
   * exception back and handle it yourself manually.
   *
   * ## Does this actually throws an Error?
   * Not necessarily, since this is literally just the original function passed
   * in to `wrapFunctionToProvideRunModes` wrapper, this will throw only if the
   * original function throws.
   */
  runAndThrowOnError: fn,
});

/**
 * An alternative is to allow a fluent syntax added on top of the existing
 * function call, without modifying the original function call.
 *
 * ### Returning run/runAndThrowOnError directly
 * ```typescript
 * await infra
 *   .TelegramBotsWhatchBot()
 *   .sendMessage
 *   .runAndThrowOnError("some-chat-id", "message");
 * ```
 *
 * The advantage of this first approach is that it has less indirection which
 * helps with efficiency and is abit easier to understand.
 *
 * ### Returning a function to hold args first
 * ```typescript
 * await infra
 *   .TelegramBotsWhatchBot()
 *   .sendMessage("some-chat-id", "message")
 *   .runAndThrowOnError();
 * ```
 *
 * The advantage of this second approach is that 1) the function API doesnt
 * change, it is just an extra fluent method chaining right after it, and 2)
 * this allows you to wrap the `sendMessage` method and still have the benefit
 * of different run modes.
 *
 * ### How the second approach allows wrapping
 * The second approach allows you to define a new function / method like this
 * ```typescript
 * notifyAdmin(message: string) {
 *     return this.sendMessage(adminChatID, message);
 * }
 * ```
 *
 * And you can call the new function / method like this, where both the
 * `sendMessage` method call and the `notifyAdmin` method call has the same
 * exact type signature!
 * ```typescript
 * await infra
 *   .TelegramBotsWhatchBot()
 *   .sendMessage("some-chat-id", "message")
 *   .runAndThrowOnError();
 * await infra
 *   .TelegramBotsWhatchBot()
 *   .notifyAdmin("message for the admin")
 *   .runAndThrowOnError();
 * ```
 *
 * This allows you to defer the choice of run mode to the actual caller,
 * instead of forcing `notifyAdmin` method to choose a run mode for all its
 * callers.
 */
// return function forArgs(...args: Parameters<T>) {
//   return {
//     run: () => run(...args),
//     runAndThrowOnError: () => fn(...args),
//   };
// };
