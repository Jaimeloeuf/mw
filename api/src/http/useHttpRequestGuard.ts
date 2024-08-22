import type { HttpRequestGuard } from "./HttpRequestGuard.js";

/**
 * Bind HTTP guard function and its return data to a particular namespace for
 * use with `httpController` function.
 */
export const useHttpRequestGuard = <
  const GuardDataNamespace extends string,
  const GuardFunction extends HttpRequestGuard,
>(
  guardDataNamespace: GuardDataNamespace,
  guard: GuardFunction
) =>
  <const>{
    guardDataNamespace,
    guard,
  };
