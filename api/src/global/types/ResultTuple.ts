import type { Exception } from "../../exceptions/Exception.js";

declare global {
  /**
   * Result tuple type encapsulates a result that could either be successful or
   * not successful.
   *
   * Where it is successful, its type will be `TResult`, while if unsuccessful,
   * its types will be `TException`.
   *
   * Exception is always positioned first in the tuple so users are forced to
   * either handle it, or ignore it explicitly with something like `_`.
   *
   * `TException` extends `Exception` instead of `Error` to indicate that only
   * recoverable issues, i.e. exceptions not errors, should be allowed to wrap
   * in a `$ResultTuple`, while an Error (irrecoverable state) should always be
   * thrown instead.
   */
  type $ResultTuple<TResult, TException extends Exception = Exception> =
    | [null, TResult]
    | [TException | null];
}
