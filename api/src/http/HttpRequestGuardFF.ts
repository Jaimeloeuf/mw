import { HttpRequestGuard } from "./HttpRequestGuard.js";

/**
 * Generic type definition of a Factory Function used to create
 * HttpRequestGuard(s) for convenience so users do not have to manually define
 * the type of their HttpRequestGuard(s).
 */
export type HttpRequestGuardFF<
  GuardFfParameterType extends Array<any> = Array<any>,
  GuardReturnType = any,
> = (...args: GuardFfParameterType) => HttpRequestGuard<GuardReturnType>;
