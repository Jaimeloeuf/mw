import { HttpRequestGuardFunction } from "./HttpRequestGuardFunction.js";

/**
 * Defines the type of guard factory functions.
 */

export type HttpRequestGuardFunctionFF<Setup, GuardReturnType> = (
  ...args: any
) => HttpRequestGuardFunction<GuardReturnType>;
