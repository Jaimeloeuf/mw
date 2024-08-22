import type { Request } from "express";

/**
 * A HTTP request guard function to check if a request is allowed.
 *
 * Return type is unioned with `never` since check is allowed/expected to
 * throw on guard validation/authentication/authorization errors.
 */
export type HttpRequestGuard<GuardReturnType = any> = (
  req: Request
) => GuardReturnType | Promise<GuardReturnType> | never;
