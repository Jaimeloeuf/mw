import type { Request } from "express";

/**
 * This is an abstract class for HTTP Request Guards to implement, where the
 * `check` method is used to guard controller access. It is given the request
 * object from Express to check if the request is allowed.
 *
 * If the request is allowed, it should just silently run till completion, if
 * the request is not allowed, this should throw an Exception/Error for
 * `httpController` to handle/respond to the requestor.
 */
export abstract class HttpRequestGuard<
  T extends void | Record<any, any> = any,
> {
  /**
   * Check if a request is allowed.
   *
   * Return type is unioned with `never` since check is allowed/expected to
   * throw on guard validation/authentication/authorization errors.
   */
  abstract check(req: Request): T | Promise<T> | never;
}
