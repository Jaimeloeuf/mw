import type { Exception } from "../../exceptions/Exception.js";

declare global {
  /**
   * Result tuple type encapsulates a result that could either be successful or
   * not successful.
   *
   * This is a 2 element tuple style that is inspired by Go's error handling
   * mechanism, where if there is an exception the tuple's first element will be
   * set and the second element will be null, and vice versa if no exception.
   *
   * This is a generic such that when it is successful, its type will be
   * the generic `TResult`, and if unsuccessful its types will be the generic
   * `TException`.
   *
   * You can then use TS type narrowing
   * ```typescript
   * const [exp, result] = myResultTuple
   * if (exp !== null){
   *     console.error('Operation failed with', exp);
   *     return;
   * }
   * result; // Type narrowed to `TResult`
   * ```
   *
   * Exception is always positioned first in the tuple so users are forced to
   * either handle it, or ignore it explicitly with something like `_`.
   *
   * `TException` extends `Exception` instead of `Error` to indicate that only
   * recoverable issues, i.e. exceptions not errors.
   *
   * This is the preferred way of handling Exceptions/Errors:
   * 1. Exceptions should be returned in `$ResultTuple`
   * 1. Errors (irrecoverable state) should be thrown
   *
   * However in reality, both Exceptions/Errors can be either returned in
   * `$ResultTuple` or thrown, just whichever is better for the specific
   * situation. But it is encouraged to stick to the preferred way which is why
   * the default TException type is `Exception`.
   */
  type $ResultTuple<TResult, TException extends Exception = Exception> =
    | [null, TResult]
    | [TException, null];
}
