import type { Request } from "express";

/**
 * A HTTP Request Guard is a function used to guard controller access. It is
 * given the request object from Express to check if the request is allowed.
 *
 * If the request is allowed, it will just silently run till completion, if the
 * request is not allowed, this should throw an Exception/Error for
 * `expressWrapper` to handle/respond to the requestor.
 */
export type HttpRequestGuard = (req: Request) => void | Promise<void> | never;
