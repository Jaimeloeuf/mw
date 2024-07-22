import type { Request } from "express";

/**
 * This is an abstract class for HTTP Request Guards to implement, where the
 * `check` method is used to guard controller access. It is given the request
 * object from Express to check if the request is allowed.
 *
 * If the request is allowed, it should just silently run till completion, if
 * the request is not allowed, this should throw an Exception/Error for
 * `expressWrapper` to handle/respond to the requestor.
 */
export abstract class HttpRequestGuard {
  /**
   * Check if a request is allowed.
   */
  abstract check(req: Request): void | Promise<void> | never;
}
