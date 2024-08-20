import type { Request } from "express";

/**
 * A guard function to check if a request is allowed.
 *
 * Return type is unioned with `never` since check is allowed/expected to
 * throw on guard validation/authentication/authorization errors.
 */
export type HttpRequestGuardFunction<GuardReturnType> = (
  req: Request
) => GuardReturnType | Promise<GuardReturnType> | never;
